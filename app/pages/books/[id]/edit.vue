<script setup lang="ts">
import type { BookInput } from '~/composables/useBooks'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { getBookById, updateBook } = useBooks()

const id = Number(route.params.id)
const { data: book, status, error: loadError } = await useAsyncData(`book-edit-${id}`, () => getBookById(id), { server: false })

const loading = ref(false)
const error = ref('')

const handleUpdate = async (payload: BookInput) => {
  error.value = ''
  loading.value = true
  try {
    await updateBook(id, payload)
    await navigateTo(`/books/${id}`)
  } catch (e) {
    error.value = apiError(e, 'Book update nahi ho saki')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl rounded-lg border border-gray-200 bg-white p-6">
    <NuxtLink :to="`/books/${id}`" class="text-sm text-blue-600 hover:underline">&larr; Back to book</NuxtLink>
    <h1 class="mt-4 mb-6 text-3xl font-bold">Edit Book</h1>

    <p v-if="status === 'pending'" class="text-gray-600">Loading...</p>
    <p v-else-if="loadError" class="text-red-600">{{ apiError(loadError) }}</p>
    <BookForm
      v-else-if="book"
      :initial="book"
      submit-label="Save Changes"
      :loading="loading"
      :error="error"
      @submit="handleUpdate"
    />
  </div>
</template>
