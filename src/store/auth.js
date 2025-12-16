import { defineStore } from 'pinia'
import { login } from '../api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token')
  }),

  actions: {
    async login(credentials) {
      const { data } = await login(credentials)
      this.token = data.token
      this.user = data.user
      localStorage.setItem('token', this.token)
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    }
  }
})
