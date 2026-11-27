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
  <div class="max-w-2xl">
    <NuxtLink to="/books" class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to books
    </NuxtLink>
    <div class="mt-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
      <h1 class="mb-6 text-2xl font-extrabold text-slate-900">Add New Book</h1>
      <BookForm submit-label="Add Book" :loading="loading" :error="error" @submit="handleCreate" />
    </div>
  </div>
</template>
