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
  <div class="max-w-2xl">
    <NuxtLink :to="`/books/${id}`" class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      Back to book
    </NuxtLink>

    <div class="mt-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
      <h1 class="mb-6 text-2xl font-extrabold text-slate-900">Edit Book</h1>

      <div v-if="status === 'pending'" class="space-y-3 animate-pulse">
        <div class="h-4 w-1/2 rounded bg-slate-100" />
        <div class="h-10 rounded-xl bg-slate-100" />
        <div class="h-10 rounded-xl bg-slate-100" />
        <div class="h-10 rounded-xl bg-slate-100" />
      </div>
      <div v-else-if="loadError" class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{{ apiError(loadError) }}</div>
      <BookForm
        v-else-if="book"
        :initial="book"
        submit-label="Save Changes"
        :loading="loading"
        :error="error"
        @submit="handleUpdate"
      />
    </div>
  </div>
</template>
