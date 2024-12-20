const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'book_app',
  password: '123',
  port: 5432,
});

// Routes

// Get all books
app.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search books by title
app.get('/books/search', async (req, res) => {
  const { title } = req.query;
  try {
    const result = await pool.query('SELECT * FROM books WHERE title ILIKE $1', [`%${title}%`]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
app.post('/books', async (req, res) => {
  const { title, author, release_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO books (title, author, release_date) VALUES ($1, $2, $3) RETURNING *',
      [title, author, release_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a book
app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, release_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE books SET title = $1, author = $2, release_date = $3 WHERE id = $4 RETURNING *',
      [title, author, release_date, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a book
app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
