import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import axios from 'axios'

import setAuthToken from './utils/setAuthToken'
import jwt_decode from 'jwt-decode'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (localStorage.jwtToken) {
  // set auth token header
  const token = localStorage.jwtToken
  setAuthToken(token)

  // decode token and get user info
  const decoded = jwt_decode(token)
  const authStore = useAuthStore()
  authStore.setAuthUser(decoded)

  // check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // logout user
    authStore.logout()

    // redirect to login
    router.push('/')
  }
}

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

app.mount('#app')
