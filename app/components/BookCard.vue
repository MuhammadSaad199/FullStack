<script setup lang="ts">
import type { Book } from '~/composables/useBooks'

defineProps<{ book: Book }>()
</script>

<template>
  <NuxtLink
    :to="`/books/${book.id}`"
    class="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/60"
  >
    <!-- Book cover placeholder -->
    <div class="mb-4 flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50">
      <svg class="h-10 w-10 text-indigo-300 transition-colors group-hover:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    </div>

    <h3 class="line-clamp-2 text-base font-bold text-slate-900 leading-snug">{{ book.title }}</h3>
    <p class="mt-1 text-sm text-slate-500">{{ book.author }}</p>

    <div class="mt-auto pt-4 flex items-center justify-between">
      <span class="rounded-lg bg-amber-50 px-2.5 py-1 text-sm font-bold text-amber-700">${{ Number(book.price).toFixed(2) }}</span>
      <span class="text-xs font-medium text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100">View →</span>
    </div>
  </NuxtLink>
</template>
