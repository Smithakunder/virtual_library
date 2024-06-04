const BookController = require('../controller/bookController');

module.exports = (app) => {
    app.get('/api/books', BookController.getAllBooks);
    app.post('/api/books', BookController.createBook);
    app.get('/api/books/:id', BookController.getOneBook);
    app.put('/api/books/:id', BookController.updateBook);
    app.delete('/api/books/:id', BookController.deleteBook);
};