<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  genreOptions: {
    type: Array,
    required: true,
  },
  selectedGenres: {
    type: Array,
    default: [],
  },
  selectedPublicationDate: {
    type: String,
    default: ''
  },
  selectedBookRating: {
    type: String,
    default: ''
  },
  selectedBookLength: {
    type: String,
    default: ''
  },
});

const emits = defineEmits([
  'toggle-filter',
  'filter-by-genre',
  'filter-by-publication-date',
  'filter-by-rating',
  'filter-by-length',
  'clear-filters',
]);

const genreFilter = ref(props.selectedGenres);
watch(() => props.selectedGenres, (nextSelectedGenres) => {
  genreFilter.value = [ ...nextSelectedGenres ];
});

function handleGenreFilterChange(genre, isChecked) {
  if (isChecked) {
    genreFilter.value.push(genre);
  } else {
    const index = genreFilter.value.indexOf(genre);

    if (index > -1) {
      genreFilter.value.splice(index, 1);
    }
  }
  emits('filter-by-genre', [...genreFilter.value]);
}

const publicationDateOptions = [
  {
    slug: 'recent',
    label: 'Recent (2020+)',
  },
  {
    slug: 'modern',
    label: 'Modern (2000-2019)',
  },
  {
    slug: 'classic',
    label: 'Classic (Before 2000)',
  },
];
const publicationDateFilter = ref(props.selectedPublicationDate);
watch(() => props.selectedPublicationDate, (nextSelectedPublicationDate) => {
  publicationDateFilter.value = nextSelectedPublicationDate;
});

function handlePublicationDateFilterChange($event) {
  publicationDateFilter.value = $event.target.value;

  emits('filter-by-publication-date', publicationDateFilter.value);
}

const ratingOptions = [
  {
    slug: 'excellent',
    label: 'Excellent (4.5+ stars)',
  },
  {
    slug: 'good',
    label: 'Good (4.0-4.4 stars)',
  },
  {
    slug: 'decent',
    label: 'Decent (3.5-3.9 stars)',
  },
];
const ratingFilter = ref(props.selectedBookRating);
watch(() => props.selectedBookRating, (nextSelectedBookRating) => {
  ratingFilter.value = nextSelectedBookRating;
});

function handleRatingFilterChange($event) {
  ratingFilter.value = $event.target.value;

  emits('filter-by-rating', ratingFilter.value);
}

const lengthOptions = [
  {
    slug: 'quick',
    label: 'Quick Read',
  },
  {
    slug: 'medium',
    label: 'Medium Read',
  },
  {
    slug: 'long',
    label: 'Long Read',
  },
];
const lengthFilter = ref(props.selectedBookLength);
watch(() => props.selectedBookLength, (nextSelectedBookLength) => {
  lengthFilter.value = nextSelectedBookLength;
});

function handleLengthFilterChange($event) {
  lengthFilter.value = $event.target.value;

  emits('filter-by-length', lengthFilter.value);
}

function handleToggleFilter() {
  emits('toggle-filter');
}

function handleClearAll() {
  genreFilter.value = [];
  publicationDateFilter.value = '';
  ratingFilter.value = '';
  lengthFilter.value = '';

  emits('clear-filters');
}
</script>

<template>
  <form class="app__filter">
    <header class="app__filter-header">
      <h3>Filter</h3>

      <button
        type="button"
        class="btn btn--icon"
        @click="handleToggleFilter"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#3b4252">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>

        <span class="sr-only">Close</span>
      </button>
    </header>

    <div class="app__filter-body">
      <fieldset>
        <h4>Genre</h4>

        <ul>
          <li
            v-for="genre in genreOptions"
            :key="genre"
          >
            <input
              :id="`genre-${genre}`"
              type="checkbox"
              name="genre"
              :value="genre"
              :checked="genreFilter.includes(genre)"
              @change="handleGenreFilterChange(genre, $event.target.checked)"
            />
            <label :for="`genre-${genre}`">{{ genre }}</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <h4>Publication Year</h4>

        <ul>
          <li
            v-for="option in publicationDateOptions"
            :key="option.slug"
          >
            <input
              :id="`publication-${option.slug}`"
              type="radio"
              name="publicationDate"
              :value="option.slug"
              :checked="publicationDateFilter === option.slug"
              @change="handlePublicationDateFilterChange"
            />
            <label :for="`publication-${option.slug}`">{{ option.label }}</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <h4>Book Rating</h4>

        <ul>
          <li
            v-for="option in ratingOptions"
            :key="option.slug"
          >
            <input
              :id="`rating-${option.slug}`"
              type="radio"
              name="rating"
              :value="option.slug"
              :checked="ratingFilter === option.slug"
              @change="handleRatingFilterChange"
            />
            <label :for="`rating-${option.slug}`">{{ option.label }}</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <h4>Book Length</h4>

        <ul>
          <li
            v-for="option in lengthOptions"
            :key="option.slug"
          >
            <input
              :id="`length-${option.slug}`"
              type="radio"
              name="bookLength"
              :value="option.slug"
              :checked="lengthFilter === option.slug"
              @change="handleLengthFilterChange"
            />
            <label :for="`length-${option.slug}`">{{ option.label }}</label>
          </li>
        </ul>
      </fieldset>
    </div>

    <footer class="app__filter-footer">
      <button
        type="button"
        class="btn btn--primary"
        @click="handleClearAll"
      >
        Clear All
      </button>

      <!-- <button type="button" class="btn btn--secondary">Apply</button> -->
    </footer>
  </form>
</template>

<style scoped>
.app__filter {
  position: fixed;
  display: grid;
  grid-template-rows: auto 1fr auto;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  max-width: var(--panel-width);
  background: var(--color-background);
  border-left: 1px solid var(--color-border);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  z-index: 9999;
}

.app__filter-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: var(--spacing);
  overflow-x: hidden;
  overflow-y: auto;
}

.app__filter-header,
.app__filter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--header-height);
  padding-block: 0.5rem;
  padding-inline: var(--spacing);
}

.app__filter-footer {
  justify-content: end;
}

.app__filter ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.app__filter li {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
}

.app__filter fieldset {
  margin-block: 0;
  margin-inline: var(--spacing);
  padding: 0 0 1rem 0;
  border: 0;
  border-bottom: 1px solid var(--color-border);
}

.app__filter h4 {
  margin-block-end: 0.5rem;
}

.app__filter input {
  padding-right: 0.5rem;
}
</style>