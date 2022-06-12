package com.dicoding.dhimas.rasaapp.network

import DetailMakananResponse
import MakananResponse
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @GET("foods") fun getAllMakanan(): Call<MakananResponse>

    @GET("foods/{id}")
    fun getDetailMakanan(
        @Path("id") id: String
    ): Call<DetailMakananResponse>
}