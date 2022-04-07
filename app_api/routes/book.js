const express = require('express');
const router = express.Router();
const cltrbook = require('../controllers/book');

router
    .route('/books')
    .get(cltrbook.getBook)
    .post(cltrbook.CreateBook);

router
    .route('/books/:bookid')
    .get(cltrbook.getSingleBook)
    .put(cltrbook.updateBook)
    .delete(cltrbook.deleteBook);

module.exports = router;