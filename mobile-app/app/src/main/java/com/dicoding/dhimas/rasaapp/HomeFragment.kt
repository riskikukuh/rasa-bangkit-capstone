package com.dicoding.dhimas.rasaapp

import android.app.Activity
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.net.toFile
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import com.dicoding.dhimas.rasaapp.databinding.FragmentHomeBinding
import com.dicoding.dhimas.rasaapp.network.ApiConfig
import com.github.dhaval2404.imagepicker.ImagePicker
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment : Fragment() {

    private lateinit var binding: FragmentHomeBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val viewPager = activity?.findViewById<ViewPager2>(R.id.view_pager)
        binding.btnNavList.setOnClickListener {
            viewPager?.currentItem = 0
        }

        binding.btnNavHistory.setOnClickListener {
            viewPager?.currentItem = 2
        }

        binding.btnScan.setOnClickListener {
            try {
                ImagePicker.with(this)
                    .cameraOnly()
                    .compress(456)
                    .saveDir(requireActivity().getExternalFilesDir(Environment.DIRECTORY_PICTURES)!!)
                    .createIntent { intent ->
                        startForProfileImageResult.launch(intent)
                    }
            } catch (e: Exception) {
                Toast.makeText(
                    requireContext(),
                    "Cannot find Directory for save photo",
                    Toast.LENGTH_SHORT
                ).show()
            }
        }
    }

    private val startForProfileImageResult =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result: ActivityResult ->
            val resultCode = result.resultCode
            val data = result.data

            when (resultCode) {
                Activity.RESULT_OK -> {
                    val fileUri = data?.data!!
                    Log.d("BtnScan", "Result : $fileUri")

                    val image = fileUri.toFile()
                    val imageName = MultipartBody.Part.createFormData("data", image.name, image.asRequestBody("image/jpg".toMediaTypeOrNull()))
                    val client = ApiConfig.getApiService().analyze(
                        mapOf(Pair("Authorization", "Bearer {PUT YOUR TOKEN HERE}")),
                        imageName)
                    client.enqueue(object : Callback<AnalyzeBaseResponse> {
                        override fun onResponse(
                            call: Call<AnalyzeBaseResponse>,
                            response: Response<AnalyzeBaseResponse>
                        ) {
                            val base = response.body()
                            Log.d("SendAnalyze", "Success: ${response.body()}")
                            Toast.makeText(requireContext(), "Success : ${base?.data}", Toast.LENGTH_LONG).show()
                        }

                        override fun onFailure(call: Call<AnalyzeBaseResponse>, t: Throwable) {
                            Log.e("SendAnalyze", "Error: ${t.message}")
                            Toast.makeText(requireContext(), "Error : ${t.message}", Toast.LENGTH_LONG).show()
                        }
                    })
                }
                ImagePicker.RESULT_ERROR -> {
                    Toast.makeText(requireContext(), ImagePicker.getError(data), Toast.LENGTH_SHORT)
                        .show()
                }
                else -> {
                    Toast.makeText(requireContext(), "Task Cancelled", Toast.LENGTH_SHORT).show()
                }
            }
        }
}