package com.dicoding.dhimas.rasaapp.ui.home

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.os.Environment
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.activity.result.ActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.net.toFile
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.viewpager2.widget.ViewPager2
import com.dicoding.dhimas.rasaapp.R
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import com.dicoding.dhimas.rasaapp.databinding.FragmentHomeBinding
import com.dicoding.dhimas.rasaapp.network.ApiConfig
import com.dicoding.dhimas.rasaapp.ui.detail.DetailActivity
import com.dicoding.dhimas.rasaapp.ui.error.ErrorActivity
import com.dicoding.dhimas.rasaapp.utils.ViewModelFactory
import com.github.dhaval2404.imagepicker.ImagePicker
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.MultipartBody
import okhttp3.RequestBody.Companion.asRequestBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeFragment(onSuccessAnalyze: () -> Unit) : Fragment() {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: HomeViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = obtainViewModel(requireActivity() as AppCompatActivity)

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
//                    .compress(2000)
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

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun obtainViewModel(activity: AppCompatActivity): HomeViewModel {
        val factory = ViewModelFactory.getInstance(activity.application)
        return ViewModelProvider(activity, factory)[HomeViewModel::class.java]
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
                    val imageName = MultipartBody.Part.createFormData(
                        "data",
                        image.name,
                        image.asRequestBody("image/jpg".toMediaTypeOrNull())
                    )
                    val client = ApiConfig.getApiService().analyze(
                        mapOf(),
                        imageName
                    )
                    client.enqueue(object : Callback<AnalyzeBaseResponse> {
                        override fun onResponse(
                            call: Call<AnalyzeBaseResponse>,
                            response: Response<AnalyzeBaseResponse>
                        ) {
                            if (response.code() == 201 && response.body() != null) {
                                val base = response.body()
                                Log.d("SendAnalyze", "Success: ${response.body()}")
                                if (base?.data?.status == "obtained") {
                                    Toast.makeText(
                                        requireContext(),
                                        "Berhasil mendapatkan data makanan",
                                        Toast.LENGTH_LONG
                                    ).show()
                                    base.data.foodId?.let {
                                        viewModel.getDetailMakanan(it)
                                            .observe(requireActivity()) { detail ->
                                                val intent = Intent(
                                                    requireActivity(),
                                                    DetailActivity::class.java
                                                )
                                                intent.putExtra(
                                                    DetailActivity.EXTRA_ID,
                                                    base.data.foodId
                                                )
                                                intent.putExtra(
                                                    DetailActivity.EXTRA_NAME,
                                                    detail.data.name
                                                )
                                                activity?.startActivity(intent)
                                            }
                                    }
                                } else {
                                    Toast.makeText(
                                        requireContext(),
                                        "Makanan tidak diketahui, silahkan coba kembali",
                                        Toast.LENGTH_LONG
                                    ).show()
                                    val intent =
                                        Intent(requireActivity(), ErrorActivity::class.java)
                                    activity?.startActivity(intent)
                                }
                                onSuccessAnalyze()
                                return
                            }

                            if (response.code() == 413) {
                                Toast.makeText(
                                    requireContext(),
                                    "Ukuran gambar terlalu besar, silahkan coba lagi",
                                    Toast.LENGTH_LONG
                                ).show()
                                return
                            }
                            if ((response.code() == 400 || response.code() == 412)) {
                                val check = response.errorBody() != null
                                if (check) {
                                    val jsonError = JSONObject(response.errorBody()!!.string())
                                    val message = jsonError.getString("message")
                                        ?: "Gagal menjangkau server, silahkan coba kembali"
                                    Toast.makeText(requireContext(), message, Toast.LENGTH_LONG)
                                        .show()
                                }
                            } else {
                                Log.d("AnalyzeLog", "response error body: ${response.errorBody()}")
                                Toast.makeText(
                                    requireContext(),
                                    "Terjadi kesalahan, silahkan coba kembali",
                                    Toast.LENGTH_LONG
                                ).show()
                            }

                            val intent = Intent(requireActivity(), ErrorActivity::class.java)
                            activity?.startActivity(intent)
                        }

                        override fun onFailure(call: Call<AnalyzeBaseResponse>, t: Throwable) {
                            Log.e("SendAnalyze", "Error: ${t.message}")
                            Toast.makeText(
                                requireContext(),
                                "Terjadi kesalahan : ${t.message}",
                                Toast.LENGTH_LONG
                            ).show()
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