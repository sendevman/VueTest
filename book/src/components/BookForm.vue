<template>
  <div>
    <h2>Add Book</h2>
    <form @submit.prevent="submitBook">
      <input v-model="book.title" placeholder="Title" required />
      <input v-model="book.author" placeholder="Author" required />
      <input v-model="book.release_date" type="date" required />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: {
        title: '',
        author: '',
        release_date: '',
      },
    };
  },
  methods: {
    submitBook() {
      this.$emit('submit-book', { ...this.book });
      this.book.title = '';
      this.book.author = '';
      this.book.release_date = '';
    },
  },
};
</script>