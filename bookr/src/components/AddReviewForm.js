import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';

const AddReviewForm = (props) => {
  let id = props.match.params.id

  const [bookData, setBookData] = useState([])
  const [bookAuthor, setBookAuthor] = useState([])
  const [bookCover, setBookCover] = useState('')

  useEffect(() => {
    axios
          .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
          .then(response => {
            console.log(response.data.volumeInfo)
            const data = response.data.volumeInfo
            setBookData(data)
            setBookAuthor(response.data.volumeInfo.authors)
            setBookCover(response.data.volumeInfo.imageLinks.small || response.data.volumeInfo.imageLinks.thumbnail)
          })
  }, [id])

  return(
    <>
      <h2>Leave a review for: </h2>
      <img src={bookCover} alt="book cover"/>
      <h3>{bookData.title}</h3>
      {bookAuthor.map(item => (
        <p key={item}> By {item}</p>
      ))}
      {/* FIELD: NAME */}
      {/* RATING */}
      {/* FIELD: TEXTBOX */}
      <button>Add Review</button>
      <button>Cancel</button>
    </>
  )
};

export default AddReviewForm;
