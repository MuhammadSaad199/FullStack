<script setup lang="ts">
const route = useRoute()
const { getBookById } = useBooks()

const book = getBookById(Number(route.params.id))

if (!book) {
  throw createError({ statusCode: 404, statusMessage: 'Book not found' })
}
</script>

<template>
  <article v-if="book" class="max-w-2xl rounded-lg border border-gray-200 bg-white p-6">
    <NuxtLink to="/books" class="text-sm text-blue-600 hover:underline">&larr; Back to books</NuxtLink>
    <h1 class="mt-4 text-3xl font-bold">{{ book.title }}</h1>
    <p class="mt-4"><span class="font-semibold">Author:</span> {{ book.author }}</p>
    <p class="mt-1"><span class="font-semibold">Price:</span> ${{ book.price.toFixed(2) }}</p>
    <p class="mt-4 text-gray-700">{{ book.description }}</p>
  </article>
</template>
