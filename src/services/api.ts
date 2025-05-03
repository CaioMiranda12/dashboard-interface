import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`
})

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('findash:userData')

  if(userData) {
    const parsed = JSON.parse(userData)

    if(parsed.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`
    }
  }

  return config;
})

export { api }