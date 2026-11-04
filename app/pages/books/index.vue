<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { getBooks } = useBooks()

// server: false -> browser se fetch (backend ka dev HTTPS cert Node SSR mein reject hota hai)
const { data: books, status, error } = await useAsyncData('books', getBooks, { server: false })
</script>

<template>
  <section>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-3xl font-bold">All Books</h1>
      <NuxtLink to="/books/new" class="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">+ Add Book</NuxtLink>
    </div>

    <p v-if="status === 'pending'" class="text-gray-600">Loading books...</p>
    <p v-else-if="error" class="text-red-600">Books load nahi ho sakin: {{ apiError(error) }}</p>
    <p v-else-if="!books?.length" class="text-gray-600">Abhi koi book nahi hai.</p>
    <BookList v-else :books="books" />
  </section>
</template>
