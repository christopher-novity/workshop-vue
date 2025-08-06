<script setup>
import { computed } from 'vue';

const props = defineProps({
  booksRead: {
    type: Array,
    required: true,
  },
  selectedBooks: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(['toggleSidebar']);

const totalBooksRead = computed(() => props.booksRead.length);
const totalSelectedBooks = computed(() => props.selectedBooks.length);
const totalReadingInProgress = computed(() => props.selectedBooks.filter(selectedBook => selectedBook.isReading).length);

function handleToggleSidebar() {
  emit('toggleSidebar');
}
</script>

<template>
  <div class="app__sidebar">
    <header class="app__sidebar-header">
      <h3>My Reading List</h3>

      <button
        type="button"
        class="btn btn--icon"
        @click="handleToggleSidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#3b4252">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>

        <span class="sr-only">Close</span>
      </button>
    </header>

    <div class="app__sidebar-body">
      <slot />
    </div>

    <footer class="app__sidebar-footer">
      <div class="reading-progress">
        <label>Current Reading Progress: <span>{{ totalReadingInProgress }}/{{ totalSelectedBooks }}</span></label>
        <label>Total Books Read: <span>{{ totalBooksRead }}</span></label>
        <!-- <input id="progress" type="range" value="1" max="5" step="1" /> -->
      </div>
    </footer>
  </div>
</template>

<style scoped>
.app__sidebar {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: var(--color-primary);
  height: 100vh;
}

.app__sidebar-body {
  overflow-x: hidden;
  overflow-y: auto;
}

.app__sidebar-header,
.app__sidebar-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding-block: 0.5rem;
  padding-inline: var(--spacing);
}

.app__sidebar h3 {
  color: var(--color-surface);
}

.app__sidebar-footer h3 {
  font-size: 1rem;
}
</style>