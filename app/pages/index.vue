<script setup lang="ts">
const { getBooks } = useBooks()
const featured = getBooks().slice(0, 3)
</script>

<template>
  <section>
    <h1 class="text-3xl font-bold">Welcome to BookStore</h1>
    <p class="mt-2 text-gray-600">Find your next favourite book.</p>

    <h2 class="mt-8 mb-4 text-2xl font-semibold">Featured</h2>
    <BookList :books="featured" />
  </section>
</template>
