<script setup lang="ts">
const { getBooks } = useBooks()
const books = getBooks()
</script>

<template>
  <section>
    <h1 class="mb-6 text-3xl font-bold">All Books</h1>
    <BookList :books="books" />
  </section>
</template>
