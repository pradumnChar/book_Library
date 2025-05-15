const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addBook, getBooks, searchBooks } = require('../controllers/bookController');

router.post('/', auth, addBook);
router.get('/', auth, getBooks);
router.get('/search', auth, searchBooks);

module.exports = router