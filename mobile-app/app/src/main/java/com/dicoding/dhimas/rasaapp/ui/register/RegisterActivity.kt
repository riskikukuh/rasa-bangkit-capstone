package com.dicoding.dhimas.rasaapp.ui.register

import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.WindowManager
import android.widget.Toast
import androidx.activity.viewModels
import com.dicoding.dhimas.rasaapp.R
import com.dicoding.dhimas.rasaapp.databinding.ActivityRegisterBinding
import com.dicoding.dhimas.rasaapp.ui.login.LoginActivity
import com.google.android.material.snackbar.Snackbar

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private val viewModel: RegisterViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (Build.VERSION.SDK_INT >= 21) {
            val window = this.window
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS)
            window.statusBarColor = this.resources.getColor(R.color.black_matte)
        }

        binding.toolbarRegister.setNavigationOnClickListener { onBackPressed() }
        binding.btnPageLogin.setOnClickListener { onBackPressed() }

        initApp()
        setupObserver()
    }

    private fun setupObserver() {
        viewModel.responseRegister.observe(this) {
            Snackbar.make(binding.root, it.second, Snackbar.LENGTH_LONG).show()
            if (it.first) {
                Toast.makeText(this, "Berhasil Registrasi", Toast.LENGTH_LONG).show()
                val intent = Intent(this, LoginActivity::class.java)
                startActivity(intent)
                finish()
            }
        }
    }

    private fun initApp() {
        binding.btnDaftar.setOnClickListener {
            val firstname = binding.edtFirstname.text
            val lastname = binding.edtLastname.text
            val email = binding.edtEmail.text
            val username = binding.edtUsername.text
            val password = binding.edtPassword.text

            if (firstname.isNullOrEmpty() && email.isNullOrEmpty() && username.isNullOrEmpty() && password.isNullOrEmpty()) return@setOnClickListener Snackbar.make(
                binding.root,
                "Data tidak boleh kosong",
                Snackbar.LENGTH_LONG
            ).show()

            viewModel.register(username.toString(), password.toString(), email.toString(), firstname.toString(), lastname.toString())
        }
    }
}