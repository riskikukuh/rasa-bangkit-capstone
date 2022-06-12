package com.dicoding.dhimas.rasaapp.utils

import android.app.Application
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.dicoding.dhimas.rasaapp.ui.detail.DetailViewModel
import com.dicoding.dhimas.rasaapp.ui.home.HomeViewModel
import com.dicoding.dhimas.rasaapp.ui.list.ListViewModel

class ViewModelFactory constructor(private val application: Application) :
    ViewModelProvider.NewInstanceFactory() {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
//            modelClass.isAssignableFrom(MainViewModel::class.java) -> MainViewModel(application) as T

            modelClass.isAssignableFrom(DetailViewModel::class.java) -> DetailViewModel(application) as T

            modelClass.isAssignableFrom(ListViewModel::class.java) -> ListViewModel(application) as T

            modelClass.isAssignableFrom(HomeViewModel::class.java) -> HomeViewModel(application) as T

//            modelClass.isAssignableFrom(SplashViewModel::class.java) -> SplashViewModel(application) as T

            else -> throw IllegalArgumentException("Unknown ViewModel class: ${modelClass.name}")
        }
    }

    companion object {
        @Volatile
        private var INSTANCE: ViewModelFactory? = null

        @JvmStatic
        fun getInstance(application: Application): ViewModelFactory =
            INSTANCE ?: synchronized(this) {
                INSTANCE ?: ViewModelFactory(application)
            }
    }
}