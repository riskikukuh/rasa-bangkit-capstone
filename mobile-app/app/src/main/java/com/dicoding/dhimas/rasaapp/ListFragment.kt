package com.dicoding.dhimas.rasaapp

import DataItemMakanan
import MakananResponse
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.GridLayoutManager
import com.dicoding.dhimas.rasaapp.network.ApiConfig
import com.dicoding.dhimas.rasaapp.databinding.FragmentListBinding
import com.dicoding.dhimas.rasaapp.adapter.ListMakananAdapter
import retrofit2.*

class ListFragment : Fragment() {
    private lateinit var binding: FragmentListBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentListBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.rvListMakanan.setHasFixedSize(true)
        showMakananAll()
    }

    private fun showMakananAll() {
        showLoading(true)
        val client = ApiConfig.getApiService().getAllMakanan()
        client.enqueue(object : Callback<MakananResponse> {
            override fun onResponse(
                call: Call<MakananResponse>,
                response: Response<MakananResponse>
            ) {
                showLoading(false)
                if (response.isSuccessful) {
                    val responseBody = response.body()
                    if (responseBody != null) {
                        binding.rvListMakanan.layoutManager = GridLayoutManager(getActivity(), 2)
                        val listMakananAdapter = ListMakananAdapter(responseBody.data as ArrayList<DataItemMakanan>)
                        binding.rvListMakanan.adapter = listMakananAdapter
                    }
                } else {
                    Log.e(TAG, "onFailure: ${response.message()}")
                }
            }
            override fun onFailure(call: Call<MakananResponse>, t: Throwable) {
                showLoading(false)
                Log.e(TAG, "onFailure: ${t.message}")
            }
        })
    }

    private fun showLoading(isLoading: Boolean) {
        if (isLoading) {
            binding.progressBar.visibility = View.VISIBLE
        } else {
            binding.progressBar.visibility = View.GONE
        }
    }

    companion object{
        private const val TAG = "ListFragment"
    }
}