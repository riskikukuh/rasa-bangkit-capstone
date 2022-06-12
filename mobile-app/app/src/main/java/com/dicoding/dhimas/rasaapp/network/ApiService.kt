package com.dicoding.dhimas.rasaapp.network

import DetailMakananResponse
import MakananResponse
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import com.dicoding.dhimas.rasaapp.data.model.LoginResponse
import okhttp3.MultipartBody
import okhttp3.RequestBody
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

    @POST("user/login")
    fun login(@Body requestBody: RequestBody): Call<LoginResponse>
}