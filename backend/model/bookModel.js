const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: [true, "Image URL is required!!!"]
    },
    bookName: {
        type: String,
        required: [true, "Book name is needed!!!"],
        minLength: [3, "Book name must be at least 3 characters long!!!"]
    },
    bookType: {
        type: String,
        required: [true, "Please indicate type of book!!!"],
        minLength: [3, "Book type must be at least 3 characters long!!!"]
    },
    bookAuthor: {
        type: String,
        required: [true, "Please indicate type of book!!!"],
        minLength: [3, "Book type must be at least 3 characters long!!!"]
    },
    bookDescription: {
        type: String,
        required: [true, "Please describe your book!!!"],
        minLength: [3, "Book description must be at least 3 characters long!!!"]
    }
}, { timestamps: true });

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;