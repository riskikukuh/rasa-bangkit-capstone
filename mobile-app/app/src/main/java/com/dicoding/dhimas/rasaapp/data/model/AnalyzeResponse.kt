package com.dicoding.dhimas.rasaapp.data.model

import com.google.gson.annotations.SerializedName

data class AnalyzeBaseResponse(
    @SerializedName("status")
    val status: String,
    @SerializedName("message")
    val message: String?,
    @SerializedName("data")
    val data: AnalyzeData,
)

data class AnalyzeData(
    @SerializedName("pictureUrl")
    val pictureUrl: String,
    @SerializedName("analyzeId")
    val analyzeId: String,
    @SerializedName("foodId")
    val foodId: String?,
    @SerializedName("accuracy")
    val accuracy: Double,
    @SerializedName("status")
    val status: String,
)
