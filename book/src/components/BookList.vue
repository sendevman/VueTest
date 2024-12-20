<template>
  <div>
    <h2>Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.title }} by {{ book.author }} ({{ book.release_date }})
        <button @click="editBook(book)">Edit</button>
        <button @click="deleteBook(book.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['books', 'editBook', 'deleteBook'],
};
</script>