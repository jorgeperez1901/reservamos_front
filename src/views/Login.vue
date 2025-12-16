<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
  await auth.login({ email: email.value, password: password.value })
  router.push('/cities')
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button>Login</button>
  </form>
</template>
