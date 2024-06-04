import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BookDetails.css"; // Import the CSS file for styling

const BookDetails = () => {
  const [allBooks, setAllBooks] = useState([]);
  const { id } = useParams();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books/${id}`)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const buyBookHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/books/${id}`)
      .then((response) => {
        console.log(response.data);
        setAllBooks(allBooks.filter((book) => book._id !== id));
        alert("Thanks for buying this book..Visit again!")
        navigate("/books");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>virtual library</h1>
        
        <Link to="/books">home</Link>
      </div>
      <div className="row my-3 py-2">
        <div className="col text-start">
          <h3 className="my-2"> {book.bookName}</h3>
        </div>
        <div className="col text-end">
          <button
            type="button"
            className="btn btn-danger my-2"
            onClick={() => buyBookHandler(id)}
          >
            Borrow
          </button>
        </div>
      </div>
      <div className="book-details-container">
        <div className="book-image-container">
          <img
            src={`http://localhost:8000/${book.imageUrl}`}
            alt={book.bookName}
            className="book-image-details"
          />
        </div>
        <div className="book-info-container">
          <div className="book-info-row">
            <div className="book-info-label">Type:</div>
            <div className="book-info-value">{book.bookType}</div>
          </div>
          <div className="book-info-row">
            <div className="book-info-label">Description:</div>
            <div className="book-info-value">{book.bookDescription}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
