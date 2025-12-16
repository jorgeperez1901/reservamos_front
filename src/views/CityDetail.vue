<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getForecast } from '../api/weather'

const route = useRoute()
const forecast = ref([])

const fetchForecast = async () => {
  const { lat, lon } = route.params
  const { data } = await getForecast(lat, lon)
  forecast.value = data.response.result.list
}

watch(
  () => route.params,
  fetchForecast,
  { immediate: true }
)
</script>

<template>
  <div>
    <h1>Pronóstico 7 días</h1>

    <div v-for="day in forecast" :key="day.dt">
      <p>{{ new Date(day.dt * 1000).toLocaleDateString() }}</p>
      <p>Max: {{ day.main.temp_max }}°C</p>
      <p>Min: {{ day.main.temp_min }}°C</p>
      <p>{{ day.weather[0].description }}</p>
    </div>
  </div>
</template>
