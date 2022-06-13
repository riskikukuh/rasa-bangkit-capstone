package com.dicoding.dhimas.rasaapp.ui.history

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isGone
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.LinearLayoutManager
import com.dicoding.dhimas.rasaapp.adapter.HistoryMakananAdapter
import com.dicoding.dhimas.rasaapp.data.model.DataItemHistory
import com.dicoding.dhimas.rasaapp.databinding.FragmentHistoryBinding
import com.dicoding.dhimas.rasaapp.ui.login.LoginActivity
import com.dicoding.dhimas.rasaapp.utils.SessionManager
import com.dicoding.dhimas.rasaapp.utils.ViewModelFactory

class HistoryFragment : Fragment() {

    private var _binding: FragmentHistoryBinding? = null
    private val binding get() = _binding!!
    private lateinit var viewModel: HistoryViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHistoryBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewModel = obtainViewModel(requireActivity() as AppCompatActivity)

        checkToken()

        binding.btnLogin.setOnClickListener{
            val moveIntent = Intent(requireActivity(), LoginActivity::class.java)
            startActivity(moveIntent)
        }

        binding.btnLogout.setOnClickListener {
            SessionManager.getInstance(requireContext()).accessToken = ""
            isLayoutShow(true)
        }

    }

    fun checkToken() {
        if (SessionManager.getInstance(requireContext()).accessToken.isNullOrEmpty()){
            isLayoutShow(true)
        }else{
            isLayoutShow(false)
            val headers = mutableMapOf<String, String>()
            val token = SessionManager.getInstance(requireContext()).accessToken
            headers["Authorization"] = "Bearer $token"

            viewModel.getHistoryMakanan(headers).observe(requireActivity()){ list ->
                if (list.data.isNotEmpty() ){
                    binding.layoutEmpty.isVisible = false
                    binding.rvHistoryMakanan.layoutManager = LinearLayoutManager(requireActivity())
                    val historyMakananAdapter = HistoryMakananAdapter(list.data as ArrayList<DataItemHistory>)
                    binding.rvHistoryMakanan.adapter = historyMakananAdapter
                }else{
                    binding.layoutEmpty.isVisible = true
                }
            }
        }
    }

    private fun isLayoutShow(state: Boolean){
        binding.apply {
            layoutToLogin.isVisible = state
            layoutEmpty.isGone = state
            rvHistoryMakanan.isGone = state
            btnLogout.isGone = state
        }
    }

    private fun obtainViewModel(activity: AppCompatActivity): HistoryViewModel {
        val factory = ViewModelFactory.getInstance(activity.application)
        return ViewModelProvider(activity, factory)[HistoryViewModel::class.java]
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}