<script setup>
const props = defineProps({
  books: Array
});
</script>

<template>
  <ul class="book-list">
    <li
      v-for="book in books"
      :key="book.id"
      class="book-list__item"
    >
      <slot :item="book" />
    </li>
  </ul>
</template>

<style scoped>
.book-list {
   --book-list-columns: 1fr;
   --book-list-item-spacing: 1rem;
  
  display: grid;
  grid-template-columns: var(--book-list-columns);
  gap: var(--spacing);
  margin: 0;
  padding: 0;
  padding-block-start: calc(var(--spacing) / 2);
  padding-block-end: var(--spacing);
  list-style: none;
}

@media (min-width: 48rem) {
  .book-list {
    --book-list-columns: repeat(2, 1fr);
  }
}

@media (min-width: 80rem) {
  .book-list {
    --book-list-columns: repeat(4, 1fr);
  }
}
</style>