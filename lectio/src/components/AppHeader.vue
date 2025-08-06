<script setup>
const emit = defineEmits(['toggleSidebar']);

function handleToggleSidebar() {
  emit('toggleSidebar');
}
</script>

<template>
  <header class="app__header">
    <div class="app__header-content container container--fluid">
      <a href="#" class="brand montserrat-bold">Lectio</a>

      <button
        type="button"
        class="btn btn--icon"
        @click="handleToggleSidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#3b4252">
          <g>
            <rect width="18" height="18" x="3" y="3" rx="2"/>
            <path d="M9 3v18m5-12l3 3l-3 3"/>
          </g>
        </svg>

        <span class="sr-only">Toggle Panel</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app__header {
  border-bottom: 1px solid var(--color-border);
}

.app__header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>