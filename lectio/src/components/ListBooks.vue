<template>
  <ul class="book-list">
    <li class="book-list__item">
      <div class="book-card">
        <header class="book-card__header">
          <img src="./src/assets/images/book-cover-01.jpg" width="115" height="180" role="presentation" />

          <div class="book-card__meta">
            <h2>Atomic Habits</h2>
            <h3>by James Clear</h3>
            <small>Published 2025</small>
          </div>
        </header>

        <div class="book-card__description">
          <p>No matter your goals, Atomic Habits offers a proven framework for improving everyday. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.</p>
        </div>

        <div class="book-card__footer">
          <button type="button" class="btn btn--primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#f9fafb">
                <path d="M12 7v6m-8 6.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M9 10h6"/>
            </svg>
            Add to Reading List
          </button>
        </div>
      </div>
    </li>

    <li class="book-list__item">
      <div class="book-card">
        <header class="book-card__header">
          <img src="./src/assets/images/book-cover-02.jpg" width="115" height="180" role="presentation" />

          <div class="book-card__meta">
            <h2>The Psychology of Money</h2>
            <h3>by Morgan Housel</h3>
            <small>Published 2020</small>
          </div>
        </header>

        <div class="book-card__description">
          <p>Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people. Money investing, personal finance, and business decisions is typically taught as a math-based field, where data and formulas tell us exactly what to do.</p>
        </div>

        <div class="book-card__footer">
          <button type="button" class="btn btn--primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke="#f9fafb">
                <path d="M12 7v6m-8 6.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20M9 10h6"/>
            </svg>
            Add to Reading List
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.book-list {
   --book-list-columns: 1fr;
   --book-list-item-spacing: 1rem;
  
  display: grid;
  grid-template-columns: var(--book-list-columns);
  gap: var(--spacing);
  margin: 0;
  padding: 0;
  padding-block-start: calc(var(--spacing) / 2);
  padding-block-end: var(--spacing);
  list-style: none;
}

@media (min-width: 48rem) {
  .book-list {
    --book-list-columns: repeat(2, 1fr);
  }
}

@media (min-width: 80rem) {
  .book-list {
    --book-list-columns: repeat(4, 1fr);
  }
}
</style>