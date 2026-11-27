  <script setup lang="ts">
  import type { Book } from '~/composables/useBooks'

  defineProps<{ books: Book[] }>()
  </script>

  <template>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </template>
