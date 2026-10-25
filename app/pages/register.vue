<script setup lang="ts">
definePageMeta({ middleware: 'guest' })

const { register } = useAuth()

const form = reactive({
  username: '',
  userEmail: '',
  password: '',
  confirm: '',
  role: 'User'
})
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  loading.value = true
  try {
    await register(form)
    await navigateTo('/')
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="mx-auto mt-16 max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
    <h1 class="mb-6 text-2xl font-bold">Register</h1>
    <form class="space-y-4" @submit.prevent="handleRegister">
      <input v-model="form.username" placeholder="Username" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
      <input v-model="form.userEmail" type="email" placeholder="Email" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
      <input v-model="form.password" type="password" placeholder="Password" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
      <input v-model="form.confirm" type="password" placeholder="Confirm password" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
      <button :disabled="loading" class="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
        {{ loading ? 'Please wait...' : 'Register' }}
      </button>
    </form>
    <p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p>
    <NuxtLink to="/login" class="mt-4 block text-sm text-blue-600 hover:underline">Pehle se account hai? Login karein</NuxtLink>
  </div>
</template>
