import axios from './axios'

export const getForecast = (lat, lon) =>
  axios.get(`/show?lat=${lat}&lon=${lon}`)
