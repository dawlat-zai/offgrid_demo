<template>
  <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-md-1/2 space-y-8">
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div class="flex">
            <div class="w-1/2 mr-2">
              <label>First name</label>
              <input
                name="first_name"
                v-model="form.first_name"
                type="text"
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Email address"
              />
              <div v-for="error of v$.first_name.$errors" :key="error.$uid">
                <div class="text-red-600">{{ error.$message }}</div>
              </div>
            </div>
            <div class="w-1/2 ml-2">
              <label>Last name</label>
              <input
                name="last_name"
                v-model="form.last_name"
                type="text"
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Email address"
              />
              <div v-for="error of v$.last_name.$errors" :key="error.$uid">
                <div class="text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/2 mr-2">
              <label>Email</label>
              <input
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
            <div class="w-1/2 ml-2">
              <label>Phone</label>
              <input
                name="phone"
                v-model="form.phone"
                type="text"
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Email address"
              />
              <div v-for="error of v$.phone.$errors" :key="error.$uid">
                <div class="text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>
          <div class="flex">
            <div class="w-1/2 mr-2">
              <label>Password</label>
              <input
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
            <div class="w-1/2 ml-2">
              <label>Password Confirm</label>
              <input
                name="password"
                v-model="form.password_confirm"
                type="password"
                class="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
                placeholder="Password"
              />
              <div v-for="error of v$.password_confirm.$errors" :key="error.$uid">
                <div class="text-red-600">{{ error.$message }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="successMsg !== ''" class="text-green-600">{{ successMsg }}</div>

        <div v-for="error in errors" :key="error">
          <div class="text-red-600">{{ error }}</div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-900 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Create account
          </button>
        </div>

        <div class="text-sm flex justify-center">
          <router-link :to="{ name: 'login' }" class="font-medium text-gray-900 hover:text-gray-500">Login</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, unref, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import AuthService from '../services/AuthService'
import { useRouter } from 'vue-router'

const form = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirm: '',
  phone: ''
})

const rules = {
  first_name: { required },
  last_name: { required },
  phone: { required },
  email: { required, email },
  password: { required, minLength: minLength(8) },
  password_confirm: { required, sameAsPassword: sameAs(computed(() => form.password)) }
}

const v$ = useVuelidate(rules, form)

const router = useRouter()

const successMsg = ref('')
const errors = ref([])

const register = async () => {
  const isValid = await unref(v$).$validate()
  if (isValid) {
    console.log('valid')
    AuthService.register(form)
      .then((response) => {
        console.log('register successfully: ', response)
        successMsg.value = 'Your account is created successfully. Redirecting to Login page..'

        setTimeout(() => {
          router.push({ name: 'dashboard' })
        }, 3000)
      })
      .catch((e) => {
        errors.value = Object.values(e)
      })
  }
}
</script>
