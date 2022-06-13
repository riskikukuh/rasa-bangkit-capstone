package com.dicoding.dhimas.rasaapp.data.model

import com.google.gson.annotations.SerializedName

data class RegisterResponse(

	@field:SerializedName("data")
	val data: Data,

	@field:SerializedName("status")
	val status: String
)

data class Data(

	@field:SerializedName("userId")
	val userId: String
)
