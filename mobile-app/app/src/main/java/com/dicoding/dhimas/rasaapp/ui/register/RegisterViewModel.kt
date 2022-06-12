package com.dicoding.dhimas.rasaapp.ui.register

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.dicoding.dhimas.rasaapp.data.repository.UserRepository
import kotlinx.coroutines.launch

class RegisterViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = UserRepository()

    private val _responseRegister = MutableLiveData<Pair<Boolean, String>>()
    val responseRegister get() = _responseRegister

    fun register(username: String, password: String, email: String, firstname: String, lastname: String,) {
        repository.register(username, password, email, firstname, lastname, onSuccess = { registerResponse ->
            viewModelScope.launch {
                _responseRegister.postValue(Pair(true, "Berhasil Register "+registerResponse.data.userId))
            }
        }, onError = {
            _responseRegister.postValue(Pair(false, it))
        })
    }

}