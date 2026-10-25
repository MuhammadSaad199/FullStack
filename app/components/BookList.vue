<script setup lang="ts">
import type { Book } from '~/composables/useBooks'

defineProps<{ books: Book[] }>()
</script>

<template>
  <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
    <BookCard v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>
