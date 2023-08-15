import { ref } from 'vue'
import { defineStore } from 'pinia'
import setAuthToken from '../utils/setAuthToken'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  function setAuthUser(u) {
    user.value = u
  }

  function logout() {
    localStorage.removeItem('jwtToken')
    setAuthUser(null)
    setAuthToken(false)
  }

  return { user, setAuthUser, logout }
})
