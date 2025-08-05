<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const emits = defineEmits(['select-book']);

function handleAddToReadingList() {
  emits('select-book', props.book.id);
}
</script>

<template>
  <div class="book-card">
    <header class="book-card__header">
      <img :src="book.coverImageUrl" width="115" height="180" role="presentation" />

      <div class="book-card__meta">
        <h2>{{ book.title }}</h2>
        <h3>by {{ book.author }}</h3>
        <small>Published {{ book.publishedDate }}</small>
      </div>
    </header>

    <div class="book-card__description">
      <p>{{ book.description }}</p>
    </div>

    <div class="book-card__footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="handleAddToReadingList"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#f9fafb">
            <path d="M12 7v6m-8 6.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M9 10h6"/>
        </svg>
        Add to Reading List
      </button>
    </div>
  </div>
</template>
