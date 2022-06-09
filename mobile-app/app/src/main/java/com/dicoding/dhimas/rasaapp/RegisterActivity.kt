package com.dicoding.dhimas.rasaapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.dicoding.dhimas.rasaapp.databinding.ActivityRegisterBinding

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)
    }
}