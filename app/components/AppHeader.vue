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
  <header class="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
    <NuxtLink to="/" class="text-xl font-bold">BookStore</NuxtLink>
    <nav class="flex items-center gap-4">
      <NuxtLink to="/" class="text-gray-600 hover:text-gray-900" exact-active-class="font-semibold text-gray-900">Home</NuxtLink>
      <NuxtLink to="/books" class="text-gray-600 hover:text-gray-900" exact-active-class="font-semibold text-gray-900">Books</NuxtLink>

      <template v-if="isLoggedIn">
        <button :disabled="loggingOut" class="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-60" @click="handleLogout">
          {{ loggingOut ? 'Logging out...' : 'Logout' }}
        </button>
      </template>
      <template v-else>
        <NuxtLink to="/login" class="text-gray-600 hover:text-gray-900" exact-active-class="font-semibold text-gray-900">Login</NuxtLink>
        <NuxtLink to="/register" class="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700">Register</NuxtLink>
      </template>
    </nav>
  </header>
</template>
