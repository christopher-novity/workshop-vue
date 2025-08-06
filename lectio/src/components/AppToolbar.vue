<script setup>
import { ref } from 'vue';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
});

const emits = defineEmits(['toggle-filter', 'search-book']);

const localSearchQuery = ref(props.searchQuery);

function handleSearchInput($event) {
  const query = $event.target.value.trim();

  localSearchQuery.value = query;
  emits('search-book', query);
}

function handleSubmitSearch() {
  emits('search-book', localSearchQuery.value);
}

function handleToggleFilter() {
  emits('toggle-filter');
}
</script>

<template>
  <div class="toolbar">
    <form
      class="toolbar__search-form"
      @submit.prevent="handleSubmitSearch"
    >
      <label for="search-books" class="sr-only">Search books</label>
      <input
        id="search-books"
        type="text"
        name="Search books"
        placeholder="Search books..."
        :value="localSearchQuery"
        @input="handleSearchInput"
      />

      <button type="submit" class="btn btn--icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#3b4252">
          <g>
            <circle cx="11" cy="11" r="8"/><path d="m21 21l-4.3-4.3"/>
          </g>
        </svg>

        <span class="sr-only">Search</span>
      </button>
    </form>

    <button
      type="button"
      class="btn"
      @click="handleToggleFilter"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" stroke="#3b4252">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>
      </svg>
      Filter
    </button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding-block-start: var(--spacing);
  padding-block-end: calc(var(--spacing) / 2);
}

.toolbar__search-form {
  position: relative;
  width: 100%;
  max-width: 23.125rem;
}

.toolbar__search-form input {
  width: 100%;
  min-height: 3rem;
  padding: 0.5rem;
  padding-inline-end: 60px;
  border: 1px solid var(--color-border);
  border-radius: var(--rounded);
  font-size: 0.875rem;
}

.toolbar__search-form .btn {
  position: absolute;
  top: 0;
  right: 0;
  border: 0;
  background-color: transparent;
}
</style>