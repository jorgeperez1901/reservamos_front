import axios from './axios'

export const getCities = (type) =>
  axios.get(`/places?type=${type}`)
