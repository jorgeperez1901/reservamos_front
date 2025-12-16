import axios from './axios'

export const getForecast = (lat, lon) =>
  axios.get(`/show/${lat}/${lon}`)
