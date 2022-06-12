package com.dicoding.dhimas.rasaapp.data.repository

import DetailMakananResponse
import MakananResponse
import android.app.Application
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import com.dicoding.dhimas.rasaapp.network.ApiConfig
import com.dicoding.dhimas.rasaapp.network.ApiService
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class FoodRepository(application: Application) {
    private val api: ApiService = ApiConfig.getApiService()

    fun detailMakanan(id: String): LiveData<DetailMakananResponse> {
        val detail = MutableLiveData<DetailMakananResponse>()

        api.getDetailMakanan(id).enqueue(object : Callback<DetailMakananResponse> {
            override fun onResponse(
                call: Call<DetailMakananResponse>,
                response: Response<DetailMakananResponse>
            ) {
                if (response.isSuccessful) {
                    detail.postValue(response.body())
                }

                val message = when (response.code()) {
                    401 -> "${response.code()} : Forbidden"
                    403 -> "${response.code()} : Bad Request"
                    404 -> "${response.code()} : Not Found"
                    else -> "${response.code()} : ${response.body()}"
                }
                Log.d("onResponseDetail", message)
            }

            override fun onFailure(call: Call<DetailMakananResponse>, t: Throwable) {
                Log.d("onFailureDetail", t.message!!)
            }
        })

        return detail
    }

    fun listMakanan(): LiveData<MakananResponse> {
        val list = MutableLiveData<MakananResponse>()

        api.getAllMakanan().enqueue(object : Callback<MakananResponse> {
            override fun onResponse(
                call: Call<MakananResponse>,
                response: Response<MakananResponse>
            ) {
                if (response.isSuccessful) {
                    list.postValue(response.body())
                }

                val message = when (response.code()) {
                    401 -> "${response.code()} : Forbidden"
                    403 -> "${response.code()} : Bad Request"
                    404 -> "${response.code()} : Not Found"
                    else -> "${response.code()} : ${response.body()}"
                }
                Log.d("onResponseDetail", message)
            }

            override fun onFailure(call: Call<MakananResponse>, t: Throwable) {
                Log.d("onFailureDetail", t.message!!)
            }
        })

        return list
    }
}