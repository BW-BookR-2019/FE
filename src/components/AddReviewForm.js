import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


import Rating from './Rating'

const AddReviewForm = (props, {touched, errors}) => {
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

  const [review, setReview] = useState({user: '', review: '', rating: ''});

  // const handleChanges = e => {
  //   setReview({...review, [e.target.name]: e.target.value})
  // }

  // const submitForm = e => {
  //   e.preventDefault();
  //   setReview({user: '', review: '', rating: ''})
  // }

  return(
    <>
      <div className='review-form'>Hello
        <Form>
          
        </Form>
      </div>
    </>
  )
  
}

export default AddReviewForm;

// {/* 
//   <h2>Leave a review for: </h2>
//   <img src={bookCover} alt="book cover"/>
//   <h3>{bookData.title}</h3>
//   {bookAuthor.map(item => (
//     <p key={item}> By {item}</p>
//   ))}
//   {/* FIELD: NAME */}
//   <Rating />
//   {/* FIELD: TEXTBOX */}
//   <button>Add Review</button>
//   <button>Cancel</button>
//  */}