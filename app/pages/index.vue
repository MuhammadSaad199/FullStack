<script setup lang="ts">
const { isLoggedIn } = useAuth()
const { getBooks } = useBooks()

// Backend /api/book ke liye token chahiye, isliye sirf login hone par fetch
const { data: featured, status } = await useAsyncData(
  'featured-books',
  async () => (isLoggedIn.value ? (await getBooks()).slice(0, 3) : []),
  { server: false, watch: [isLoggedIn] }
)
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold">Welcome to BookStore</h1>
    <p class="mt-2 text-gray-600">Find your next favourite book.</p>

    <h2 class="mt-8 mb-4 text-2xl font-semibold">Featured</h2>
    <p v-if="!isLoggedIn" class="text-gray-600">
      Books dekhne ke liye <NuxtLink to="/login" class="text-blue-600 hover:underline">login</NuxtLink> karein.
    </p>
    <p v-else-if="status === 'pending'" class="text-gray-600">Loading...</p>
    <BookList v-else-if="featured?.length" :books="featured" />
    <p v-else class="text-gray-600">Abhi koi book nahi hai.</p>
  </section>
</template>
