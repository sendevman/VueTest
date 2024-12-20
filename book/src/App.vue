<template>
  <div>
    <h1>Book Management</h1>

    <BookForm @submit-book="addBook" />

    <div>
      <h2>Search Books</h2>
      <input v-model="searchTitle" @input="searchBooks" placeholder="Search by Title" />
    </div>

    <BookList :books="books" :editBook="editBook" :deleteBook="deleteBook" />
  </div>
</template>

<script>
import axios from 'axios';
import BookList from './components/BookList.vue';
import BookForm from './components/BookForm.vue';

export default {
  components: { BookList, BookForm },
  data() {
    return {
      books: [],
      searchTitle: '',
    };
  },
  methods: {
    fetchBooks() {
      axios.get('http://localhost:3000/books').then((response) => {
        this.books = response.data;
      });
    },
    searchBooks() {
      axios
        .get('http://localhost:3000/books/search', {
          params: { title: this.searchTitle },
        })
        .then((response) => {
          this.books = response.data;
        });
    },
    addBook(book) {
      console.log('book', book);
      axios.post('http://localhost:3000/books', book).then(() => {
        this.fetchBooks();
      });
    },
    editBook(book) {
      const updatedTitle = prompt('Edit Title', book.title);
      if (updatedTitle !== null) {
        axios
          .put(`http://localhost:3000/books/${book.id}`, {
            ...book,
            title: updatedTitle,
          })
          .then(() => this.fetchBooks());
      }
    },
    deleteBook(id) {
      axios.delete(`http://localhost:3000/books/${id}`).then(() => this.fetchBooks());
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style>
</style>
