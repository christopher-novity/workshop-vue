<script setup lang="ts">
const emit = defineEmits(['toggleFilter']);

function handleToggleFilter() {
  emit('toggleFilter');
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
          <li>
            <input id="genre-1" type="checkbox" name="genre" value="genre-1" />
            <label for="genre-1">Genre 1</label>
          </li>

          <li>
            <input id="genre-2" type="checkbox" name="genre" value="genre-2" />
            <label for="genre-2">Genre 2</label>
          </li>

          <li>
            <input id="genre-3" type="checkbox" name="genre" value="genre-3" />
            <label for="genre-3">Genre 3</label>
          </li>

          <li>
            <input id="genre-4" type="checkbox" name="genre" value="genre-4" />
            <label for="genre-4">Genre 4</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <h4>Publication Year</h4>

        <ul>
          <li>
            <input id="publication-1" type="checkbox" name="publication" value="publication-1" />
            <label for="publication-1">Publication 1</label>
          </li>

          <li>
            <input id="publication-2" type="checkbox" name="publication" value="publication-2" />
            <label for="publication-2">Publication 2</label>
          </li>

          <li>
            <input id="publication-3" type="checkbox" name="publication" value="publication-3" />
            <label for="publication-3">Publication 3</label>
          </li>

          <li>
            <input id="publication4" type="checkbox" name="publication" value="publication-4" />
            <label for="publication4">Publication 4</label>
          </li>
        </ul>
      </fieldset>

      <fieldset>
        <h4>Book Length</h4>

        <ul>
          <li>
            <input id="quick" type="checkbox" name="book-length" value="quick" />
            <label for="quick">Quick</label>
          </li>

          <li>
            <input id="medium" type="checkbox" name="book-length" value="medium" />
            <label for="medium">Medium</label>
          </li>

          <li>
            <input id="long" type="checkbox" name="book-length" value="long" />
            <label for="long">Long</label>
          </li>
        </ul>
      </fieldset>
    </div>

    <footer class="app__filter-footer">
      <button type="button" class="btn btn--primary">Clear All</button>

      <button type="button" class="btn btn--secondary">Apply</button>
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