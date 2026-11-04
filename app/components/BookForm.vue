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
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div>
      <label class="mb-1 block text-sm font-semibold">Title</label>
      <input v-model="form.title" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
    </div>
    <div>
      <label class="mb-1 block text-sm font-semibold">Author</label>
      <input v-model="form.author" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
    </div>
    <div>
      <label class="mb-1 block text-sm font-semibold">Price</label>
      <input v-model="form.price" type="number" min="0" step="0.01" required class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
    </div>
    <div>
      <label class="mb-1 block text-sm font-semibold">Description</label>
      <textarea v-model="form.description" rows="4" class="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-600 focus:outline-none" />
    </div>

    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

    <div class="flex gap-3">
      <button :disabled="loading" class="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
        {{ loading ? 'Please wait...' : submitLabel }}
      </button>
      <button type="button" class="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100" @click="$router.back()">Cancel</button>
    </div>
  </form>
</template>
