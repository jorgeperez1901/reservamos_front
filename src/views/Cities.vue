<script setup>
import { onMounted, ref } from 'vue'
import { getCities } from '../api/places'
import { useRouter } from 'vue-router'

const cities = ref([])
const router = useRouter()

onMounted(async () => {
  const { data } = await getCities('city')
  cities.value = data.response.result
})

const goToCity = (city) => {
  router.push(`/city/${city.lat}/${city.long}`)
}
</script>

<template>
  <div>
    <h1>Ciudades</h1>

    <div v-for="city in cities" :key="city.id" @click="goToCity(city)">
      <h3>{{ city.city_name }}</h3>
      <p>{{ city.temp }}</p>
      <p>{{ city.weather[0].description }}</p>
    </div>
  </div>
</template>
