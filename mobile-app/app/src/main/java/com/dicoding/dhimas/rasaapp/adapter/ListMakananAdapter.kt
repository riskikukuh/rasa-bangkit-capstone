package com.dicoding.dhimas.rasaapp.adapter

import DataItemMakanan
import android.content.Intent
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.dicoding.dhimas.rasaapp.databinding.ItemRowListBinding

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
            Toast.makeText(holder.itemView.context, "Kamu memilih " + listMakanan[holder.adapterPosition].name, Toast.LENGTH_SHORT).show()
        }
    }

    override fun getItemCount(): Int = listMakanan.size

    class ListViewHolder(private val binding: ItemRowListBinding) :
        RecyclerView.ViewHolder(binding.root) {
        fun bind(makanan: DataItemMakanan) {
            binding.apply {
                tvNama.text = makanan.name
                tvTempat.text = makanan.province
                Glide.with(itemView.context).load(makanan.image).into(imgFoto)
//                itemView.setOnClickListener {
//                    Toast.makeText(itemView.context, "Kamu memilih ", Toast.LENGTH_SHORT).show()
//                    val intent = Intent(itemView.context, DetailActivity::class.java)
//                    intent.putExtra(DetailActivity.EXTRA_ID, user.id)
//                    intent.putExtra(DetailActivity.EXTRA_USERNAME, user.login)
//                    intent.putExtra(DetailActivity.EXTRA_AVATAR, user.avatar_url)
//                    itemView.context.startActivity(intent)
//                }
            }
        }
    }
}