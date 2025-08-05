<script setup>
const props = defineProps({
  selectedBooks: {
    type: Array,
    default: [],
  },
});
</script>

<template>
  <ul class="reading-list">
    <li
      v-for="book in selectedBooks"
      :key="book.id"
      class="reading-list__item"
    >
      <slot :item="book" />
    </li>
  </ul>
</template>

<style scoped>
.reading-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing);
  margin: 0;
  padding: var(--spacing);
  list-style: none;
}

.reading-progress {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 0.5rem;
  width: 100%;
}

.reading-progress label {
  font-size: 0.875rem;
  color: var(--color-surface);
}
</style>
