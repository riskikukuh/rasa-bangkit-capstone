import com.google.gson.annotations.SerializedName

data class DetailMakananResponse(

	@field:SerializedName("data")
	val data: DataDetailItemMakanan,

	@field:SerializedName("status")
	val status: String
)

data class DataDetailItemMakanan(

	@field:SerializedName("image")
	val image: String,

	@field:SerializedName("province")
	val province: String,

	@field:SerializedName("updated_at")
	val updatedAt: Any,

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
