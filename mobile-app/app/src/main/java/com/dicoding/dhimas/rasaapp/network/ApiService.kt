package com.dicoding.dhimas.rasaapp.network

import MakananResponse
import retrofit2.Call
import retrofit2.http.*

interface ApiService {
    @GET("foods") fun getAllMakanan(): Call<MakananResponse>
}