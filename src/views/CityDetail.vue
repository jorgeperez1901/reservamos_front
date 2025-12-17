<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getForecast } from '../api/weather'

const route = useRoute()
const forecast = ref([])
const city = ref({})
const loading = ref(false)

const fetchForecast = async () => {
  loading.value = true
  const { lat, lon } = route.params
  const { data } = await getForecast(lat, lon)
  forecast.value = data.response.result.list
  city.value = data.response.result.city
  loading.value = false
}

watch(
  () => route.params,
  fetchForecast,
  { immediate: true }
)

const tempClass = (temp) => {
  if (temp <= 10) return 'bg-blue-100 text-blue-700'
  if (temp <= 25) return 'bg-green-100 text-green-700'
  return 'bg-orange-100 text-orange-700'
}

const iconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`

const formatDateTime = (dtTxt) => {
  return new Date(dtTxt.replace(' ', 'T')).toLocaleString('es-MX', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Pronóstico 7 días
      </h1>
      <p class="text-gray-600 mt-1">
        {{ city.name }}
      </p>
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="h-12 bg-gray-200 rounded animate-pulse"
      />
    </div>

    <!-- CONTENT -->
    <div v-else>
      <!-- DESKTOP TABLE -->
      <div class="hidden md:block overflow-x-auto bg-white rounded-xl shadow">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left">Fecha</th>
              <th class="px-6 py-3 text-left">Clima</th>
              <th class="px-6 py-3 text-left">Temp. Máx</th>
              <th class="px-6 py-3 text-left">Temp. Mín</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="day in forecast"
              :key="day.dt"
              class="border-b hover:bg-blue-50 transition"
            >
              <td class="px-6 py-4 font-medium">
                 {{ formatDateTime(day.dt_txt) }}
              </td>

              <td class="px-6 py-4 flex items-center gap-2 capitalize">
                <img
                  :src="iconUrl(day.weather[0].icon)"
                  class="w-8 h-8"
                />
                {{ day.weather[0].description }}
              </td>

              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="tempClass(day.main.temp_max)"
                >
                  {{ Math.round(day.main.temp_max) }} °C
                </span>
              </td>

              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium"
                  :class="tempClass(day.main.temp_min)"
                >
                  {{ Math.round(day.main.temp_min) }} °C
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MOBILE CARDS -->
      <div class="grid grid-cols-1 gap-4 md:hidden mt-4">
        <div
          v-for="day in forecast"
          :key="day.dt"
          class="bg-white rounded-xl shadow p-4"
        >
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium">
              {{ new Date(day.dt * 1000).toLocaleDateString() }}
            </span>
            <img
              :src="iconUrl(day.weather[0].icon)"
              class="w-10 h-10"
            />
          </div>

          <p class="text-gray-600 capitalize mb-2">
            {{ day.weather[0].description }}
          </p>

          <div class="flex gap-2">
            <span
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="tempClass(day.main.temp_max)"
            >
              Máx {{ Math.round(day.main.temp_max) }} °C
            </span>

            <span
              class="px-3 py-1 rounded-full text-xs font-medium"
              :class="tempClass(day.main.temp_min)"
            >
              Mín {{ Math.round(day.main.temp_min) }} °C
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
