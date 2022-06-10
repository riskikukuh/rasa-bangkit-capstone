package com.dicoding.dhimas.rasaapp.network

import MakananResponse
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @GET("foods") fun getAllMakanan(): Call<MakananResponse>

    @Multipart
    @POST("analyze")
    fun analyze(@HeaderMap headers: Map<String, String>, @Part image: MultipartBody.Part) : Call<AnalyzeBaseResponse>
}