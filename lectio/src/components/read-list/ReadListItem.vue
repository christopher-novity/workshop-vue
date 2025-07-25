<script setup>
const props = defineProps({
  book: Object
});
</script>

<template>
  <div class="book-card book-card--selected">
    <header class="book-card__header">
      <img :src="book.coverImageUrl" width="115" height="180" role="presentation" />

      <div class="book-card__meta">
        <h2>{{ book.title }}</h2>
        <h3>by {{ book.author }}</h3>
      </div>
    </header>

    <div class="book-card__footer">
      <button type="button" class="btn btn--primary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" width="24" height="24" stroke="#f9fafb">
          <g>
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
            <path d="m9 9.5l2 2l4-4"/>
          </g>
        </svg>
        Mark as Read
      </button>

      <button type="button" class="btn btn--secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" width="24" height="24" stroke="#f9fafb">
          <path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 5v6m4-6v6"/>
        </svg>
        Remove
      </button>
    </div>
  </div>
</template>