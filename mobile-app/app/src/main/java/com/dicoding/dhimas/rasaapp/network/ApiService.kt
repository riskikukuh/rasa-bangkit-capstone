package com.dicoding.dhimas.rasaapp.network

import DetailMakananResponse
import MakananResponse
import com.dicoding.dhimas.rasaapp.data.model.AnalyzeBaseResponse
import com.dicoding.dhimas.rasaapp.data.model.HistoryResponse
import com.dicoding.dhimas.rasaapp.data.model.LoginResponse
import com.dicoding.dhimas.rasaapp.data.model.RegisterResponse
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

    @GET("user/history")
    fun getHistoryMakanan(
        @HeaderMap headers: Map<String, String>
    ): Call<HistoryResponse>

    @Multipart
    @POST("analyze")
    fun analyze(@HeaderMap headers: Map<String, String>, @Part image: MultipartBody.Part) : Call<AnalyzeBaseResponse>

    @POST("user/login")
    fun login(@Body requestBody: RequestBody): Call<LoginResponse>

    @POST("user")
    fun register(@Body requestBody: RequestBody): Call<RegisterResponse>
}