const Book= require('../model/bookModel');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    getAllBooks: (request, response) => {
        Book.find()
            .sort({ bookType: 1 })
            .then((allBooks) => {
                console.log(allBooks);
                response.json(allBooks);
            })
            .catch((err) => {
                console.log("Something went wrong with getAllBooks");
                response.json({ message: "Something went wrong with getAllBooks", error: err });
            });
    },

    getOneBook: (request, response) => {
        Book.findOne({ _id: request.params.id })
            .then((oneBook) => {
                console.log(oneBook);
                response.json(oneBook);
            })
            .catch((err) => {
                console.log("Something went wrong with getOneBook");
                response.json({ message: "Something went wrong with getOneBook", error: err });
            });
    },

    createBook: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { bookName, bookType,bookAuthor, bookDescription} = request.body;
            const newBook = {
                bookName,
                bookType,
                bookAuthor,
                bookDescription,
                imageUrl: request.file ? 'uploads/' + request.file.filename : null // Save the relative path of the uploaded image
            };

            Book.create(newBook)
                .then((book) => {
                    console.log(book);
                    response.json(book);
                })
                .catch((err) => {
                    console.log("Something went wrong with createBook");
                    response.status(400).json(err);
                });
        });
    },

    updateBook: (request, response) => {
        upload.single('image')(request, response, (err) => {
            if (err) {
                console.log("Something went wrong with file upload");
                return response.status(500).json({ message: "Something went wrong with file upload", error: err });
            }

            const { bookName, bookType,bookAuthor, bookDescription } = request.body;
            const updateData = {
                bookName,
                bookType,
                bookAuthor,
                bookDescription
            };

            if (request.file) {
                updateData.imageUrl = 'uploads/' + request.file.filename;
            }

            Book.findOneAndUpdate(
                { _id: request.params.id },
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            )
                .then((updateBook) => {
                    console.log(updateBook);
                    response.json(updateBook);
                    console.log("successfully updated book!");
                })
                .catch((err) => {
                    console.log("Something went wrong with updateBook");
                    response.status(400).json(err);
                });
        });
    },

    deleteBook: (request, response) => {
        Book.deleteOne({ _id: request.params.id })
            .then((deleteBook) => {
                console.log(deleteBook);
                response.json(deleteBook);
            })
            .catch((err) => {
                console.log("Something went wrong with deleteBook");
                response.json({ message: "Something went wrong with deleteBook", error: err });
            });
    }
};