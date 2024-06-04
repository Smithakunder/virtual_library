import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './NewBook.css';

const NewBook = () => {
    const [bookName, setBookName] = useState("");
    const [bookType, setBookType] = useState("");
    const [bookAuthor, setBookAuthor] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('bookName', bookName);
            formData.append('bookType', bookType);
            formData.append('bookAuthor', bookAuthor);
            formData.append('bookDescription', bookDescription);
           

            const response = await axios.post("http://localhost:8000/api/books", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            console.log(response.data);
            alert("Book added successfully!")
            navigate("/books");
        } catch (err) {
            console.error(err);
            setErrors(err.response.data.errors);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>virtual library</h1>
                <Link to="/books">Home</Link>
            </div>
            <div className="sub-header">
                <h3>Looking for a good book?</h3>
            </div>
            <form className="form" onSubmit={onSubmitHandler}>
                <label htmlFor="bookName">Book Name:</label>
                <input
                    type="text"
                    id="bookName"
                    name="bookName"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
                {errors.bookName ? <span>{errors.bookName.message}</span> : null}

                <label htmlFor="bookType">Book Type:</label>
                <input
                    type="text"
                    id="bookType"
                    name="bookType"
                    value={bookType}
                    onChange={(e) => setBookType(e.target.value)}
                />
                {errors.bookType ? <span>{errors.bookType.message}</span> : null}

                <label htmlFor="bookAuthor">Book Author:</label>
                <input
                    type="text"
                    id="bookAuthor"
                    name="bookAuthor"
                    value={bookAuthor}
                    onChange={(e) => setBookAuthor(e.target.value)}
                />
                {errors.bookAuthor ? <span>{errors.bookAuthor.message}</span> : null}


                <label htmlFor="bookDescription">Book Description:</label>
                <textarea
                    id="bookDescription"
                    name="bookDescription"
                    value={bookDescription}
                    onChange={(e) => setBookDescription(e.target.value)}
                />
                {errors.bookDescription ? <span>{errors.bookDescription.message}</span> : null}

                <label htmlFor="image">Upload Image:</label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {errors.image ? <span>{errors.image.message}</span> : null}

                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default NewBook;
