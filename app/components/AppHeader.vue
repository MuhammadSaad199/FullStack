<script setup lang="ts">
const { isLoggedIn, logout } = useAuth()

const loggingOut = ref(false)
const handleLogout = async () => {
  loggingOut.value = true
  try {
    await logout()
  } finally {
    loggingOut.value = false
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2 group">
        <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-md shadow-indigo-200 transition-transform group-hover:scale-105">
          <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <span class="text-lg font-bold text-slate-900 tracking-tight">BookStore</span>
      </NuxtLink>

      <!-- Nav links -->
      <nav class="flex items-center gap-1">
        <NuxtLink
          to="/"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          exact-active-class="bg-indigo-50 text-indigo-700 font-semibold"
        >Home</NuxtLink>
        <NuxtLink
          to="/books"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
          active-class="bg-indigo-50 text-indigo-700 font-semibold"
        >Books</NuxtLink>

        <div class="ml-2 h-5 w-px bg-slate-200" />

        <template v-if="isLoggedIn">
          <button
            :disabled="loggingOut"
            class="ml-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50"
            @click="handleLogout"
          >
            {{ loggingOut ? 'Logging out…' : 'Logout' }}
          </button>
        </template>
        <template v-else>
          <NuxtLink
            to="/login"
            class="ml-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
            exact-active-class="bg-indigo-50 text-indigo-700 font-semibold"
          >Login</NuxtLink>
          <NuxtLink
            to="/register"
            class="ml-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200"
          >Register</NuxtLink>
        </template>
      </nav>
    </div>
  </header>
</template>
