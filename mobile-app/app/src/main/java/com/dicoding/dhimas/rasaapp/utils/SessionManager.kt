package com.dicoding.dhimas.rasaapp.utils

import android.content.Context
import android.content.SharedPreferences

class SessionManager(context: Context) {
    private val APP_PREF_1 = "RasaSessionManager"
    private val preferences: SharedPreferences = context.getSharedPreferences(APP_PREF_1, Context.MODE_PRIVATE)

    private val ACCESS_TOKEN_KEY = "RasaAccessToken"

    var accessToken : String?
        get() = preferences.getString(ACCESS_TOKEN_KEY, "")
        set(value) = preferences.edit().putString(ACCESS_TOKEN_KEY, value).apply()

    companion object {
        @Volatile private var instance: SessionManager? = null
        fun getInstance(context: Context) : SessionManager {
            return synchronized(this) {
                val checkInstance = instance
                if (checkInstance != null) {
                    checkInstance
                } else {
                    val created = SessionManager(context)
                    instance = created
                    created
                }
            }
        }
    }

}