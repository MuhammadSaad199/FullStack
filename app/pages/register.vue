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
  <div class="flex min-h-[80vh] items-center justify-center">
    <div class="w-full max-w-md">
      <div class="rounded-2xl border border-slate-100 bg-white p-8 shadow-lg shadow-slate-200/60">
        <!-- Header -->
        <div class="mb-8 text-center">
          <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 shadow-md shadow-indigo-200">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 class="text-2xl font-extrabold text-slate-900">Create account</h1>
          <p class="mt-1 text-sm text-slate-500">Join BookStore today</p>
        </div>

        <form class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">Username</label>
            <input
              v-model="form.username"
              required
              placeholder="johndoe"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
            <input
              v-model="form.userEmail"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">Confirm Password</label>
            <input
              v-model="form.confirm"
              type="password"
              required
              placeholder="••••••••"
              class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div v-if="error" class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</div>

          <button
            :disabled="loading"
            class="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-60"
          >
            <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {{ loading ? 'Creating account…' : 'Create Account' }}
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-500">
          Already have an account?
          <NuxtLink to="/login" class="font-semibold text-indigo-600 hover:underline">Sign in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
