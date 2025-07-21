<script setup lang="ts">
import { ref, onMounted } from 'vue';

import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppFilter from '@/components/AppFilter.vue';
import AppToolbar from '@/components/AppToolbar.vue';
import ListBooks  from '@/components/ListBooks.vue';

const isSidebarVisible = ref(false);
const isFilterVisible = ref(false);
let appElement = null;

onMounted(() => {
  appElement = document.getElementById('app');

  if (appElement && isSidebarVisible.value) {
    appElement.classList.add('app--with-sidebar');
  }
});
</script>

<template>
  <AppSidebar v-if="isSidebarVisible" />

  <div class="app__wrapper">
    <AppHeader />

    <main class="app__main">
      <div class="container container--fluid">
        <div class="app__content">
          <AppToolbar />

          <ListBooks />
        </div>
      </div>
    </main>

    <AppFooter />
  </div>

  <AppFilter v-if="isFilterVisible" />
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
