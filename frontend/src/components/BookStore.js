import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInfoCircle, FaEdit, FaSearch } from "react-icons/fa"; // Import icons from React Icons
import "./BookStore.css";

const BookStore = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books")
      .then((response) => {
        console.log(response.data);
        setAllBooks(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = allBooks.filter(
    (book) =>
      book.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.bookType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1>BookHub</h1>
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <FaSearch className="search-icon" />
        <Link to="/books/new">Add Book</Link>
      </div>
      <div className="sub-header">
        <h3>Unlock a world of imagination with BookHub!!</h3>
      </div>
      <div className="book-cards">
        {filteredBooks.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-image">
              <img
                src={`http://localhost:8000/${book.imageUrl}`}
                alt={book.bookName}
              />
            </div>

            <div className="book-info">
              <h2>{book.bookName}</h2>
              <p>Type: {book.bookType}</p>
              <div className="actions">
                <Link to={`/books/${book._id}`}>
                  <button className="btn details">
                    <FaInfoCircle /> Details
                  </button>
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                  <button className="btn edit">
                    <FaEdit /> Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookStore;
