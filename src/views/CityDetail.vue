<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getForecast } from '../api/weather'

const route = useRoute()
const forecast = ref([])

onMounted(async () => {
  const { data } = await getForecast(route.params.lat, route.params.lon)
  forecast.value = data.result.daily
})
</script>

<template>
  <div>
    <h1>Pronóstico 7 días</h1>

    <div v-for="day in forecast" :key="day.dt">
      <p>{{ new Date(day.dt * 1000).toLocaleDateString() }}</p>
      <p>Max: {{ day.temp.max }}°C</p>
      <p>Min: {{ day.temp.min }}°C</p>
      <p>{{ day.weather[0].description }}</p>
    </div>
  </div>
</template>
