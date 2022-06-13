package com.dicoding.dhimas.rasaapp.adapter

import DataItemMakanan
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.dicoding.dhimas.rasaapp.data.model.DataItemHistory
import com.dicoding.dhimas.rasaapp.databinding.ItemRowListBinding
import com.dicoding.dhimas.rasaapp.ui.detail.DetailActivity

class ListMakananAdapter(private val listMakanan: ArrayList<DataItemMakanan>) :
    RecyclerView.Adapter<ListMakananAdapter.ListViewHolder>() {
    override fun onCreateViewHolder(viewGroup: ViewGroup, viewType: Int): ListViewHolder {
        val binding =
            ItemRowListBinding.inflate(LayoutInflater.from(viewGroup.context), viewGroup, false)
        return ListViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ListViewHolder, position: Int) {
        val makanan = listMakanan[position]
        holder.bind(makanan)
        holder.itemView.setOnClickListener {
            val intent = Intent(holder.itemView.context, DetailActivity::class.java)
            intent.putExtra(DetailActivity.EXTRA_ID, makanan.id)
            intent.putExtra(DetailActivity.EXTRA_NAME, makanan.name)
            holder.itemView.context.startActivity(intent)
        }
    }

    override fun getItemCount(): Int = listMakanan.size

    inner class ListViewHolder(private val binding: ItemRowListBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(makanan: DataItemMakanan) {
            binding.apply {
                tvNama.text = makanan.name
                tvTempat.text = makanan.origin
                Glide.with(itemView.context).load(makanan.image).into(imgFoto)
            }
        }
    }
}