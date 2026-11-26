<script setup lang="ts">
import type { BookInput } from '~/composables/useBooks'

const props = defineProps<{
  initial?: BookInput
  submitLabel: string
  loading?: boolean
  error?: string
}>()

const emit = defineEmits<{ submit: [payload: BookInput] }>()

const form = reactive<BookInput>({
  title: props.initial?.title ?? '',
  author: props.initial?.author ?? '',
  price: props.initial?.price ?? 0,
  description: props.initial?.description ?? ''
})

const handleSubmit = () => emit('submit', { ...form, price: Number(form.price) })
</script>

<template>
  <form class="space-y-5" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1.5 block text-sm font-semibold text-slate-700">Title</label>
      <input
        v-model="form.title"
        required
        placeholder="e.g. The Great Gatsby"
        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>
    <div>
      <label class="mb-1.5 block text-sm font-semibold text-slate-700">Author</label>
      <input
        v-model="form.author"
        required
        placeholder="e.g. F. Scott Fitzgerald"
        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>
    <div>
      <label class="mb-1.5 block text-sm font-semibold text-slate-700">Price ($)</label>
      <input
        v-model="form.price"
        type="number"
        min="0"
        step="0.01"
        required
        placeholder="0.00"
        class="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>
    <div>
      <label class="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
      <textarea
        v-model="form.description"
        rows="4"
        placeholder="A short summary of the book…"
        class="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>

    <div v-if="error" class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</div>

    <div class="flex gap-3 pt-1">
      <button
        :disabled="loading"
        class="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:opacity-60"
      >
        <svg v-if="loading" class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        {{ loading ? 'Saving…' : submitLabel }}
      </button>
      <button
        type="button"
        class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        @click="$router.back()"
      >Cancel</button>
    </div>
  </form>
</template>
