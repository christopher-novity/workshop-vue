<script setup>
import { ref, reactive, computed, onMounted, onUpdated, watch } from 'vue';

import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppFilter from '@/components/AppFilter.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import { BookList, BookListItem } from '@/components/book-list';
import { ReadList, ReadListItem } from '@/components/read-list';

import { mockBooks } from '@/data/mockBooks';

const books = ref(mockBooks);
const booksRead = ref([]);
const selectedBookIds = ref(new Set());
const bookSearchQuery = ref('');
const selectedGenres = ref([]);
const selectedPublicationDate = ref('');
const selectedBookRating = ref('');
const selectedBookLength = ref('');
// const filters = ref({
//   genres: [],
//   yearRange: '',
//   rating: '',
//   length: ''
// });

const filteredBooks = computed(() => {
  let filtered = [ ...books.value ];

  if (bookSearchQuery.value.trim()) {
    filtered = filtered.filter(book => book.title.toLocaleLowerCase().includes(bookSearchQuery.value.toLocaleLowerCase()))
  }

  if (selectedGenres.value.length > 0) {
    filtered = filtered.filter(book => 
      selectedGenres.value.includes(book.genre)
    );
  }

  if (selectedPublicationDate.value) {
    filtered = filtered.filter(book => {
      const year = new Date(book.publishedDate).getFullYear();
      switch (selectedPublicationDate.value) {
        case 'recent': return year >= 2020;
        case 'modern': return year >= 2000 && year < 2020;
        case 'classic': return year < 2000;
        default: return true;
      }
    });
  }

  if (selectedBookRating.value) {
    filtered = filtered.filter(book => {
      switch (selectedBookRating.value) {
        case 'excellent': return book.rating >= 4.5;
        case 'good': return book.rating >= 4.0 && book.rating < 4.5;
        case 'decent': return book.rating >= 3.5 && book.rating < 4.0;
        default: return true;
      }
    });
  }

  if (selectedBookLength.value) {
    filtered = filtered.filter(book => {
      const descLength = book.pages;
      switch (selectedBookLength.value) {
        case 'quick': return descLength < 290;
        case 'medium': return descLength >= 290 && descLength < 400;
        case 'long': return descLength >= 400;
        default: return true;
      }
    });
  }

  return filtered;
});
const availableBooks = computed(() => filteredBooks.value.filter(book => !selectedBookIds.value.has(book.id)));
const hasAvailableBooks = computed(() => !!availableBooks.value.length);

const selectedBooks = computed(() => books.value.filter(book => selectedBookIds.value.has(book.id)));
const hasSelectedBookd = computed(() => !!selectedBooks.value.length);
const totalSelectedBooks = computed(() => selectedBooks.value.length);

const genreOptions = computed(() => [...new Set(books.value.map(book => book.genre))].sort());

const isSidebarVisible = ref(false);
const isFilterVisible = ref(false);

let appElement = null;

function handleToggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

function handleToggleFilter() {
  isFilterVisible.value = !isFilterVisible.value;
}

function handleSelectBook(bookId) {
  selectedBookIds.value.add(bookId);

  if (!isSidebarVisible.value) {
    isSidebarVisible.value = true;
  }
}

function handleUnSelectBook(bookId) {
  selectedBookIds.value.delete(bookId);

  if (selectedBookIds.value.size === 0) {
    isSidebarVisible.value = false;
  }
}

function handleAddToBooksRead(bookId) {
  const book = books.value.find(book => book.id === bookId);

  booksRead.value.push({
    ...book,
    readDate: new Date()
  });
}

function handleMarkAsReading(bookId) {
  const bookIndex = selectedBooks.value.findIndex(selectedBook => selectedBook.id === bookId);

  selectedBooks.value[bookIndex].isReading = true;
}

function handleBookSearch(query) {
  bookSearchQuery.value = query;
}

function handleClearBookSearch() {
  bookSearchQuery.value = '';
}

function handleApplyGenreFilter(genres) {
  selectedGenres.value = genres;
}

function handleApplyPublicationDateFilter(yearRange) {
  selectedPublicationDate.value = yearRange;
}

function handleApplyBookRatingFilter(rating) {
  selectedBookRating.value = rating;
}

function handleApplyBookLengthFilter(length) {
  selectedBookLength.value = length;
}

function handleClearAllFilters() {
  bookSearchQuery.value = '';
  selectedGenres.value = [];
  selectedPublicationDate.value = '';
  selectedBookRating.value = '';
  selectedBookLength.value = '';
}

onMounted(() => {
  appElement = document.getElementById('app');

  if (appElement && isSidebarVisible.value) {
    appElement.classList.add('app--with-sidebar');
  }
});

watch(isSidebarVisible, (newIsSidebarVisible) => {
  if (appElement && newIsSidebarVisible) {
    appElement.classList.add('app--with-sidebar');
  } else {
    appElement.classList.remove('app--with-sidebar');
  }
});
</script>

<template>
  <AppSidebar
    v-if="isSidebarVisible"
    :books-read="booksRead"
    :selected-books="selectedBooks"
    @toggle-sidebar="handleToggleSidebar"
  >
    <ReadList v-if="hasSelectedBookd" :selected-books="selectedBooks">
      <template v-slot="{ item }">
        <ReadListItem
          :book="item"
          :read-items="booksRead"
          @mark-as-read="handleAddToBooksRead"
          @mark-as-reading="handleMarkAsReading"
          @unselect-book="handleUnSelectBook"
        />
      </template>
    </ReadList>

    <template v-else>
      <span class="empty-list">You have, no books selected yet</span>
    </template>
  </AppSidebar>

  <div class="app__wrapper">
    <AppHeader @toggle-sidebar="handleToggleSidebar"/>

    <main class="app__main">
      <div class="container container--fluid">
        <div class="app__content">
          <AppToolbar
            :search-query="bookSearchQuery"
            @search-book="handleBookSearch"
            @clear-search="handleClearBookSearch"
            @toggle-filter="handleToggleFilter"
          />

          <BookList v-if="hasAvailableBooks" :books="availableBooks">
            <template v-slot="{ item }">
              <BookListItem
                :book="item"
                @select-book="handleSelectBook"
              />
            </template>
          </BookList>

          <template v-else>
            <span class="empty-list">No books mactching filter criteria found</span>
          </template>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>

  <AppFilter
    v-if="isFilterVisible"
    :genre-options="genreOptions"
    :selected-genres="selectedGenres"
    :selected-publication-date="selectedPublicationDate"
    :selected-book-rating="selectedBookRating"
    :selected-book-length="selectedBookLength"
    @toggle-filter="handleToggleFilter"
    @filter-by-genre="handleApplyGenreFilter"
    @filter-by-publication-date="handleApplyPublicationDateFilter"
    @filter-by-rating="handleApplyBookRatingFilter"
    @filter-by-length="handleApplyBookLengthFilter"
    @clear-filters="handleClearAllFilters"
  />
</template>

<style>
.app {
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  height: 100vh;
}

.app--with-sidebar {
  grid-template-columns: min(var(--panel-width), 30vw) 1fr;
}

.app__wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}

.app__header,
.app__footer {
  padding-block: 0.5rem;
  height: var(--header-height);
}

.app__main {
  height: calc(100vh - 140px);
  overflow-y: auto;
}

.app__main > div,
.app__content {
  height: 100%;
}

.empty-list {
  display: inline-block;
  width: 100%;
  padding: 1rem;
  color: var(--color-text-muted);
}
</style>
