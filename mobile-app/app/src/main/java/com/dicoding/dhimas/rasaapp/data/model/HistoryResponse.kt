package com.dicoding.dhimas.rasaapp.data.model

import com.google.gson.annotations.SerializedName

data class HistoryResponse(

	@field:SerializedName("data")
	val data: List<DataItemHistory>,

	@field:SerializedName("status")
	val status: String
)

data class DataItemHistory(

	@field:SerializedName("image")
	val image: String,

	@field:SerializedName("accuracy")
	val accuracy: Double,

	@field:SerializedName("created_at")
	val createdAt: String,

	@field:SerializedName("id")
	val id: String,

	@field:SerializedName("food")
	val food: Food?,

	@field:SerializedName("status")
	val status: String
)

data class Food(

	@field:SerializedName("image")
	val image: String,

	@field:SerializedName("province")
	val province: String,

	@field:SerializedName("origin")
	val origin: String,

	@field:SerializedName("name")
	val name: String,

	@field:SerializedName("description")
	val description: String,

	@field:SerializedName("created_at")
	val createdAt: String,

	@field:SerializedName("id")
	val id: String
)
