package com.dicoding.dhimas.rasaapp.ui.login

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.dhimas.rasaapp.databinding.ActivityLoginBinding

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.toolbarLogin.setNavigationOnClickListener { onBackPressed() }
    }
}