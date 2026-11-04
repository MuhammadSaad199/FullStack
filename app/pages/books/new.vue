<script setup lang="ts">
import type { BookInput } from '~/composables/useBooks'

definePageMeta({ middleware: 'auth' })

const { createBook } = useBooks()
const loading = ref(false)
const error = ref('')

const handleCreate = async (payload: BookInput) => {
  error.value = ''
  loading.value = true
  try {
    const book = await createBook(payload)
    await navigateTo(book?.id ? `/books/${book.id}` : '/books')
  } catch (e) {
    error.value = apiError(e, 'Book add nahi ho saki')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl rounded-lg border border-gray-200 bg-white p-6">
    <NuxtLink to="/books" class="text-sm text-blue-600 hover:underline">&larr; Back to books</NuxtLink>
    <h1 class="mt-4 mb-6 text-3xl font-bold">Add Book</h1>
    <BookForm submit-label="Add Book" :loading="loading" :error="error" @submit="handleCreate" />
  </div>
</template>
