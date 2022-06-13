package com.dicoding.dhimas.rasaapp.ui.login

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.dicoding.dhimas.rasaapp.data.repository.UserRepository
import com.dicoding.dhimas.rasaapp.utils.SessionManager
import kotlinx.coroutines.launch

class LoginViewModel(application: Application) : AndroidViewModel(application) {
    private val repository = UserRepository()

    private val _responseLogin = MutableLiveData<Pair<Boolean, String>>()
    val responseLogin get() = _responseLogin

    fun login(username: String, password: String) {
        repository.login(username, password, onSuccess = { loginResponse ->
            viewModelScope.launch {
                SessionManager.getInstance(getApplication()).accessToken = loginResponse.data!!.accessToken
                _responseLogin.postValue(Pair(true, "Berhasil login"))
            }
            }, onError = {
            _responseLogin.postValue(Pair(false, it))
        })
    }

}