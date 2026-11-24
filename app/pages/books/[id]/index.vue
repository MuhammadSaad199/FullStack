<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { getBookById, deleteBook } = useBooks()

const id = Number(route.params.id)
const { data: book, status, error } = await useAsyncData(`book-${id}`, () => getBookById(id), { server: false })

const deleting = ref(false)
const deleteError = ref('')

const handleDelete = async () => {
  if (!confirm(`"${book.value?.title}" ko delete karna hai?`)) return
  deleteError.value = ''
  deleting.value = true
  try {
    await deleteBook(id)
    await navigateTo('/books')
  } catch (e) {
    deleteError.value = apiError(e, 'Book delete nahi ho saki')
  } finally {
    deleting.value = false
  }
}
</script>

<template>
  <div>
    <!-- Skeleton -->
    <div v-if="status === 'pending'" class="max-w-2xl animate-pulse space-y-4">
      <div class="h-4 w-24 rounded bg-slate-100" />
      <div class="h-8 w-3/4 rounded bg-slate-100" />
      <div class="h-4 w-1/2 rounded bg-slate-100" />
      <div class="h-24 rounded bg-slate-100" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">{{ apiError(error) }}</div>

    <article v-else-if="book" class="max-w-2xl">
      <NuxtLink to="/books" class="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to books
      </NuxtLink>

      <div class="mt-5 rounded-2xl border border-slate-100 bg-white p-7 shadow-sm">
        <div class="flex gap-6">
          <!-- Cover placeholder -->
          <div class="flex h-36 w-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50">
            <svg class="h-10 w-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-2xl font-extrabold leading-tight text-slate-900">{{ book.title }}</h1>
            <p class="mt-1 text-slate-500">by <span class="font-semibold text-slate-700">{{ book.author }}</span></p>
            <span class="mt-3 inline-block rounded-lg bg-amber-50 px-3 py-1 text-base font-bold text-amber-700">${{ Number(book.price).toFixed(2) }}</span>
          </div>
        </div>

        <div v-if="book.description" class="mt-6 border-t border-slate-100 pt-5">
          <h2 class="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">Description</h2>
          <p class="text-slate-700 leading-relaxed">{{ book.description }}</p>
        </div>

        <div class="mt-6 flex gap-3">
          <NuxtLink
            :to="`/books/${id}/edit`"
            class="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </NuxtLink>
          <button
            :disabled="deleting"
            class="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
            @click="handleDelete"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {{ deleting ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
        <p v-if="deleteError" class="mt-4 text-sm text-red-600">{{ deleteError }}</p>
      </div>
    </article>
  </div>
</template>
