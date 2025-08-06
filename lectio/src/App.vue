<script setup>
import { ref, computed, onMounted, watch } from 'vue';

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

const filteredBooks = computed(() => {
  let filtered = [ ...books.value ];

  if (bookSearchQuery.value.trim()) {
    filtered = filtered.filter(book => book.title.toLocaleLowerCase().includes(bookSearchQuery.value.toLocaleLowerCase()))
  }

  return filtered;
});
const availableBooks = computed(() => filteredBooks.value.filter(book => !selectedBookIds.value.has(book.id)));
const selectedBooks = computed(() => books.value.filter(book => selectedBookIds.value.has(book.id)));
const totalSelectedBooks = computed(() => selectedBooks.value.length);

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
}

function handleUnSelectBook(bookId) {
  selectedBookIds.value.delete(bookId);
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
    <ReadList :selected-books="selectedBooks">
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
  </AppSidebar>

  <div class="app__wrapper">
    <AppHeader @toggle-sidebar="handleToggleSidebar" />

    <main class="app__main">
      <div class="container container--fluid">
        <div class="app__content">
          <AppToolbar
            :search-query="bookSearchQuery"
            @search-book="handleBookSearch"
            @toggle-filter="handleToggleFilter"
          />

          <BookList :books="availableBooks">
            <template v-slot="{ item }">
              <BookListItem
                :book="item"
                @select-book="handleSelectBook"
              />
            </template>
          </BookList>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>

  <AppFilter
    v-if="isFilterVisible"
    @toggle-filter="handleToggleFilter"
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
</style>
