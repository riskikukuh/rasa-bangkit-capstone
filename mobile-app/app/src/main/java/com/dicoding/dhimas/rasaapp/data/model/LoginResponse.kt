package com.dicoding.dhimas.rasaapp.data.model

import com.google.gson.annotations.SerializedName

data class LoginResponse(
    @SerializedName("status")
    val status: String,

    @SerializedName("message")
    val message: String?,

    @SerializedName("data")
    val data: DataLoginResponse?,
)

data class DataLoginResponse(
    @SerializedName("accessToken")
    val accessToken: String
)