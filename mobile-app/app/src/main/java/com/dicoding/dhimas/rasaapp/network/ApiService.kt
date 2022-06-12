package com.dicoding.dhimas.rasaapp.network

import DetailMakananResponse
import MakananResponse
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import okhttp3.MultipartBody
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @GET("foods") fun getAllMakanan(): Call<MakananResponse>

    @GET("foods/{id}")
    fun getDetailMakanan(
        @Path("id") id: String
    ): Call<DetailMakananResponse>

    @Multipart
    @POST("analyze")
    fun analyze(@HeaderMap headers: Map<String, String>, @Part image: MultipartBody.Part) : Call<AnalyzeBaseResponse>
}