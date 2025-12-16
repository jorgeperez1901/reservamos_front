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
  <nav>
    <span v-if="auth.user">
      Hola, {{ auth.user.name }}
    </span>

    <button v-if="auth.user" @click="logout">
      Logout
    </button>
  </nav>
</template>
