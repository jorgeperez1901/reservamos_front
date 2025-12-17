<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const mode = ref('login') // login | register
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const isRegister = computed(() => mode.value === 'register')

const isDisabled = computed(() => {
  if (auth.loading) return true
  if (!email.value || !password.value) return true
  if (isRegister.value && password.value !== passwordConfirm.value)
    return true
  return false
})

const submit = async () => {
  try {
    if (isRegister.value) {
      await auth.register({ 
        user: {
          email: email.value,
          password: password.value,
          password_confirmation: passwordConfirm.value,
        }
      })
    } else {
      await auth.login({
        email: email.value,
        password: password.value,
      })
    }
    router.push('/cities')
  } catch (e) {}
}
</script>
<template>
  <div
    class="min-h-screen flex items-center justify-center
           bg-gradient-to-br from-blue-50 to-indigo-100"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <!-- HEADER -->
      <div class="text-center mb-8">
        <div
          class="mx-auto mb-4 w-12 h-12 rounded-full bg-blue-600
                 flex items-center justify-center text-white text-xl font-bold"
        >
          ☁️
        </div>
        <h1 class="text-2xl font-semibold text-gray-800">
          {{ isRegister ? 'Crear cuenta' : 'Iniciar sesión' }}
        </h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ isRegister ? 'Regístrate para continuar' : 'Accede a tu cuenta' }}
        </p>
      </div>

      <!-- ERROR -->
      <div
        v-if="auth.error"
        class="mb-4 rounded-lg bg-red-50 border border-red-200
               text-red-700 px-4 py-3 text-sm"
      >
        {{ auth.error }}
      </div>

      <form @submit.prevent="submit" class="space-y-5">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:ring-2 focus:ring-blue-500"
        />

        <input
          v-if="isRegister"
          v-model="passwordConfirm"
          type="password"
          placeholder="Confirmar contraseña"
          class="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:ring-2 focus:ring-blue-500"
        />

        <button
          :disabled="isDisabled"
          class="w-full bg-blue-600 text-white py-2.5 rounded-lg
                 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ auth.loading
            ? 'Procesando...'
            : isRegister
              ? 'Registrarme'
              : 'Entrar'
          }}
        </button>
      </form>

      <!-- TOGGLE -->
      <div class="text-center mt-6 text-sm">
        <button
          class="text-blue-600 hover:underline"
          @click="mode = isRegister ? 'login' : 'register'"
        >
          {{ isRegister
            ? '¿Ya tienes cuenta? Inicia sesión'
            : '¿No tienes cuenta? Regístrate'
          }}
        </button>
      </div>
    </div>
  </div>
</template>