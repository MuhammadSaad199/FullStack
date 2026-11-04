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
    <p v-if="status === 'pending'" class="text-gray-600">Loading...</p>
    <p v-else-if="error" class="text-red-600">{{ apiError(error) }}</p>

    <article v-else-if="book" class="max-w-2xl rounded-lg border border-gray-200 bg-white p-6">
      <NuxtLink to="/books" class="text-sm text-blue-600 hover:underline">&larr; Back to books</NuxtLink>
      <h1 class="mt-4 text-3xl font-bold">{{ book.title }}</h1>
      <p class="mt-4"><span class="font-semibold">Author:</span> {{ book.author }}</p>
      <p class="mt-1"><span class="font-semibold">Price:</span> ${{ Number(book.price).toFixed(2) }}</p>
      <p class="mt-4 text-gray-700">{{ book.description }}</p>

      <div class="mt-6 flex gap-3">
        <NuxtLink :to="`/books/${id}/edit`" class="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Edit</NuxtLink>
        <button :disabled="deleting" class="rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:opacity-60" @click="handleDelete">
          {{ deleting ? 'Deleting...' : 'Delete' }}
        </button>
      </div>
      <p v-if="deleteError" class="mt-4 text-sm text-red-600">{{ deleteError }}</p>
    </article>
  </div>
</template>
