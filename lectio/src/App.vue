<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppFilter from '@/components/AppFilter.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import { BookList, BookListItem } from '@/components/book-list';
import { ReadList, ReadListItem } from '@/components/read-list';

import { mockBooks } from '@/data/mockBooks';

const books = ref(mockBooks);
const reads = ref([]);

const isSidebarVisible = ref(false);
const isFilterVisible = ref(false);
let appElement = null;

function handleToggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

function handleToggleFilter() {
  isFilterVisible.value = !isFilterVisible.value;
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
    @toggle-sidebar="handleToggleSidebar"
  >
    <ReadList :reads="reads">
      <template v-slot="{ item }">
        <ReadListItem :book="item" />
      </template>
    </ReadList>
  </AppSidebar>

  <div class="app__wrapper">
    <AppHeader @toggle-sidebar="handleToggleSidebar" />

    <main class="app__main">
      <div class="container container--fluid">
        <div class="app__content">
          <AppToolbar @toggle-filter="handleToggleFilter" />

          <BookList :books="books">
            <template v-slot="{ item }">
              <BookListItem :book="item"/>
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
