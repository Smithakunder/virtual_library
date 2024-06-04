import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './EditBook.css';

const EditBook = () => {
  const { id } = useParams();
  const [bookName, setBookName] = useState("");
  const [bookType, setBookType] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [image, setImage] = useState(null);  // New state for image

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/books/${id}`)
      .then((response) => {
        console.log(response.data);
        setBookName(response.data.bookName);
        setBookType(response.data.bookType);
        setBookAuthor(response.data.bookAuthor);
        setBookDescription(response.data.bookDescription);
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [id, navigate]);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bookName', bookName);
    formData.append('bookType', bookType);
    formData.append('bookAuthor', bookAuthor);
    formData.append('bookDescription', bookDescription);
    if (image) {
      formData.append('image', image);  // Append image to form data
    }

    axios.put(`http://localhost:8000/api/books/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log(response.data);
        navigate(`/books/${response.data._id}`);
        alert("Updated Successfully!")
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Pet Shelter</h1>
        <p>
          <Link to="/books">Home</Link>
        </p>
      </div>
      <div className="sub-header">
        <h3>Edit {bookName}</h3>
      </div>

      <form className="form" onSubmit={onUpdateHandler}>
        <div className="form-group">
          <label htmlFor="bookName">Book Name</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          {errors.bookName && <span>{errors.bookName.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bookType">Book Type</label>
          <input
            type="text"
            id="bookType"
            name="bookType"
            value={bookType}
            onChange={(e) => setBookType(e.target.value)}
          />
          {errors.bookType && <span>{errors.bookType.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bookAuthor">Book Author</label>
          <input
            type="text"
            id="bookAuthor"
            name="bookAuthor"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
          {errors.bookAuthor && <span>{errors.bookAuthor.message}</span>}
        </div>


        <div className="form-group">
          <label htmlFor="bookDescription">Book Description</label>
          <textarea
            id="bookDescription"
            name="bookDescription"
            value={bookDescription}
            onChange={(e) => setBookDescription(e.target.value)}
          />
          {errors.bookDescription && <span>{errors.bookDescription.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Book Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}  // Update image state
          />
          {errors.image && <span>{errors.image.message}</span>}
        </div>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
