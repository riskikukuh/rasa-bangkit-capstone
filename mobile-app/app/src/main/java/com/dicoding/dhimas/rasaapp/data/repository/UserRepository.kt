package com.dicoding.dhimas.rasaapp.data.repository

import com.dicoding.dhimas.rasaapp.data.model.LoginResponse
import com.dicoding.dhimas.rasaapp.data.model.RegisterResponse
import com.dicoding.dhimas.rasaapp.network.ApiConfig
import com.dicoding.dhimas.rasaapp.network.ApiService
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONObject
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class UserRepository {
    private val api: ApiService = ApiConfig.getApiService()

    fun login(username: String, password: String, onSuccess: (data: LoginResponse) -> Unit, onError: (message: String) -> Unit) {
        val body = JSONObject().apply {
            put("username", username)
            put("password", password)
        }
        val jsonObjectString = body.toString()
        val requestBody = jsonObjectString.toRequestBody("application/json".toMediaTypeOrNull())
        api.login(requestBody).enqueue(object : Callback<LoginResponse> {
            override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
                if (response.code() == 200 && response.body() != null) {
                    return onSuccess(response.body()!!)
                }

                if (response.errorBody() != null) {
                    val jsonError = JSONObject(response.errorBody()!!.string())
                    return onError(jsonError.getString("message") ?: "Gagal menjangkau server")
                }
                return onError("Gagal menjangkau server")
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                return onError(t.message ?: "Terjadi kesalahan, silahkan coba kembali")
            }

        })
    }

    fun register(username: String, password: String, email: String, firstname: String, lastname: String, onSuccess: (data: RegisterResponse) -> Unit, onError: (message: String) -> Unit) {
        val body = JSONObject().apply {
            put("username", username)
            put("password", password)
            put("email", email)
            put("firstname", firstname)
            put("lastname", lastname)
        }
        val jsonObjectString = body.toString()
        val requestBody = jsonObjectString.toRequestBody("application/json".toMediaTypeOrNull())
        api.register(requestBody).enqueue(object : Callback<RegisterResponse> {
            override fun onResponse(call: Call<RegisterResponse>, response: Response<RegisterResponse>) {
                if (response.code() == 201 && response.body() != null) {
                    return onSuccess(response.body()!!)
                }

                if (response.errorBody() != null) {
                    val jsonError = JSONObject(response.errorBody()!!.string())
                    return onError(jsonError.getString("message") ?: "Gagal menjangkau server")
                }
                return onError("Gagal menjangkau server")
            }

            override fun onFailure(call: Call<RegisterResponse>, t: Throwable) {
                return onError(t.message ?: "Terjadi kesalahan, silahkan coba kembali")
            }

        })
    }
}