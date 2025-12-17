import { defineStore } from 'pinia'
import { login, register } from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
    token: localStorage.getItem('token'),
    error: null,
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const { data } = await login(credentials)
        console.log('LOGIN RESPONSE 👉', data)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', this.token)
      }catch (err) {
        if (err.response?.status === 401) {
          this.error = err.response.data.error
        } else {
          this.error = 'Error al iniciar sesión'
        }
        throw err // importante
      } finally {
        this.loading = false
      }
    },

    async register(payload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await register(payload)
        this.token = data.token
        this.user = data.user
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al registrarse'
        throw err
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }
})
