<script setup>
import { onMounted, ref, computed } from 'vue'
import { getCities } from '../api/places'
import { useRouter } from 'vue-router'

const cities = ref([])
const loading = ref(false)
const search = ref('')
const router = useRouter()

onMounted(async () => {
  loading.value = true
  const { data } = await getCities('city')
  cities.value = data.response.result
  loading.value = false
})

const goToCity = (city) => {
  router.push(`/city/${city.lat}/${city.long}`)
}

const filteredCities = computed(() =>
  cities.value.filter(city =>
    city.city_name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const tempClass = (temp) => {
  if (temp <= 10) return 'bg-blue-100 text-blue-700'
  if (temp <= 25) return 'bg-green-100 text-green-700'
  return 'bg-orange-100 text-orange-700'
}

const iconUrl = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`
</script>
<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">
        Ciudades
      </h1>

      <!-- Search -->
      <input
        v-model="search"
        placeholder="Buscar ciudad..."
        class="mt-3 md:mt-0 px-4 py-2 border rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <!-- Skeleton -->
    <div v-if="loading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="h-12 bg-gray-200 rounded animate-pulse"
      />
    </div>

    <!-- Table -->
    <div
      v-else
      class="overflow-x-auto bg-white rounded-xl shadow"
    >
      <table class="min-w-full text-sm">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th class="px-6 py-3 text-left">Ciudad</th>
            <th class="px-6 py-3 text-left">Clima</th>
            <th class="px-6 py-3 text-left">Temperatura</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="city in filteredCities"
            :key="city.id"
            @click="goToCity(city)"
            class="border-b cursor-pointer hover:bg-blue-50 transition"
          >
            <td class="px-6 py-4 font-medium text-gray-800">
              {{ city.city_name }}
            </td>

            <td class="px-6 py-4 flex items-center gap-2 capitalize">
              <img
                :src="iconUrl(city.weather[0].icon)"
                class="w-8 h-8"
              />
              {{ city.weather[0].description }}
            </td>

            <td class="px-6 py-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-medium"
                :class="tempClass(city.temp)"
              >
                {{ city.temp }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty state -->
      <div
        v-if="filteredCities.length === 0"
        class="text-center text-gray-500 py-8"
      >
        No se encontraron ciudades
      </div>
    </div>
  </div>
</template>
