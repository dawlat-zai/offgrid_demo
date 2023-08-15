<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address">Email address</label>
            <input
              id="email-address"
              name="email"
              v-model="form.email"
              type="text"
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              placeholder="Email address"
            />
            <div v-for="error of v$.email.$errors" :key="error.$uid">
              <div class="text-red-600">{{ error.$message }}</div>
            </div>
          </div>
          <div>
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              v-model="form.password"
              type="password"
              class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              placeholder="Password"
            />
            <div v-for="error of v$.password.$errors" :key="error.$uid">
              <div class="text-red-600">{{ error.$message }}</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-gray-900 hover:text-gray-500">Forgot your password?</a>
          </div>
        </div>

        <div v-for="error in errors" :key="error">
          <div class="text-red-600">{{ error }}</div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Sign in
          </button>
        </div>

        <div>
          <div class="text-sm flex justify-center">
            <router-link :to="{ name: 'register' }" class="font-medium text-gray-900 hover:text-gray-500"
              >Can't have an account?</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, unref, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import AuthService from '../services/AuthService'
import jwt_decode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const form = reactive({
  email: '',
  password: ''
})

const rules = {
  email: { required, email },
  password: { required }
}

const v$ = useVuelidate(rules, form)

const router = useRouter()

const authStore = useAuthStore()

const errors = ref([])

const login = async () => {
  const isValid = await unref(v$).$validate()
  if (isValid) {
    AuthService.login(form)
      .then((response) => {
        const { token } = response

        // Save token to localStorage
        localStorage.setItem('jwtToken', token)

        // Set token to Auth header
        setAuthToken(token)

        // Decode token to get user data
        const decoded = jwt_decode(token)
        authStore.setAuthUser(decoded)

        router.push({ name: 'dashboard' })
      })
      .catch((e) => {
        errors.value = Object.values(e)
      })
  }
}
</script>
