<template>
  <footer class="app__footer">
    <div class="container container--fluid">
      <span class="brand">&copy; Lectio - 2025</span>
    </div>
  </footer>
</template>

<style scoped>
.app__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
}

.app__footer .brand {
  font-size: 0.75rem;
  color: var(--color-text-dark);
}

.app__footer .brand:hover,
.app__footer .brand:focus {
  color: var(--color-text-dark);
}
</style>