package com.dicoding.dhimas.rasaapp.ui.login

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import com.dicoding.dhimas.rasaapp.R
import com.dicoding.dhimas.rasaapp.databinding.ActivityLoginBinding
import com.dicoding.dhimas.rasaapp.ui.main.MainActivity
import com.dicoding.dhimas.rasaapp.ui.register.RegisterActivity
import com.google.android.material.snackbar.Snackbar

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding
    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (Build.VERSION.SDK_INT >= 21) {
            val window = this.window
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
            window.statusBarColor = this.resources.getColor(R.color.black_matte)
        }

        binding.toolbarLogin.setNavigationOnClickListener { onBackPressed() }
        binding.btnPageDaftar.setOnClickListener {
            val moveIntent = Intent(this, RegisterActivity::class.java)
            startActivity(moveIntent)
        }

        initApp()
        setupObserver()
    }

    private fun setupObserver() {
        viewModel.responseLogin.observe(this) {
            Snackbar.make(binding.root, it.second, Snackbar.LENGTH_LONG).show()
            if (it.first) {
                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
                finish()
            }
        }
    }

    private fun initApp() {
        binding.btnMasuk.setOnClickListener {
            val username = binding.edtUsername.text
            val password = binding.edtPassword.text

            if (username.isNullOrEmpty() && password.isNullOrEmpty()) return@setOnClickListener Snackbar.make(
                binding.root,
                "Username dan Password tidak boleh kosong",
                Snackbar.LENGTH_LONG
            ).show()

            viewModel.login(username.toString(), password.toString())
        }
    }
}