<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo / App -->
      <div class="text-xl font-semibold text-blue-600">
        WeatherApp
      </div>

      <!-- Right -->
      <div v-if="auth.isAuthenticated" class="flex items-center gap-4">
        <span class="text-sm text-gray-700 hidden sm:block">
          Hola,
          <span class="font-medium">
            {{ auth.user.email }}
          </span>
        </span>

        <button
          @click="logout"
          class="px-4 py-2 rounded-lg text-sm font-medium
                 bg-red-50 text-red-600
                 hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
