<script setup lang="ts">
import type { Book } from '~/composables/useBooks'

defineProps<{ book: Book }>()
</script>

<template>
  <NuxtLink
    :to="`/books/${book.id}`"
    class="block rounded-lg border border-gray-200 bg-white p-4 transition-colors hover:border-blue-600"
  >
    <h3 class="mb-2 text-lg font-semibold">{{ book.title }}</h3>
    <p class="text-gray-600">{{ book.author }}</p>
    <p class="mt-3 font-semibold">${{ book.price.toFixed(2) }}</p>
  </NuxtLink>
</template>
