import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from './Rating'
import clsx from 'clsx'

const ReviewForm = ({match, touched, errors}) => {
  // STYLING
  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      // flexDirection: 'column',
      border: '2px solid #cf4e28',
      // borderRadius: '1%',
      margin: '0 auto',
      width: '50%',
      // padding: '3% 1% 1% 1%'
      flexWrap: 'wrap'
    },
  //   subcontainer: {
  //     display: 'flex',
  //     justifyContent: 'center',
  //     flexDirection: 'column',
  //     textAlign: 'left',
  //     width: '60%',
  //     margin: '1% auto',
  //   },
  //   items: {
  //     margin: '3% auto',
  //     textAlign: 'center'
  //   },
  //   link: {
  //     textDecoration: 'none',
  //     color: 'white',
  //     transition: '0.5s',
  //     '&:hover': {
  //       color: '#edb901',
  //       transition: '0.3s'
  //     }
  //   },
  //   btn: {
  //     textTransform: 'lowercase',
  //     color: 'white',
  //     borderColor: 'white',
  //     backgroundColor: '#edb901',
  //     '&:hover': {
  //       backgroundColor: '#cf4e28',
  //       transition: '0.3s'
  //     }
  //   },
  //   inputOutline: {
  //     backgroundColor: 'white',
  //     borderRadius: '0.25rem',
  //     '&$focusedOutline $notchedOutline' : {
  //       borderColor: '#cf4e28 !important'
  //     },
  //   },
  //   focusedOutline: {},
  //   notchedOutline: {
  //     border: '2px solid #edb901',
  //   }
  }))

// BUILDING FORM
  const classes = useStyles();
  let id = match.params.id

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

  const handleChanges = e => {
    setReview({...review, [e.target.name]: e.target.value})
  }

  const submitForm = e => {
    e.preventDefault();
    setReview({user: '', review: '', rating: ''})
  }

  return(
    <>
      <div className='review-form' className={classes.container}>
        <h2>Leave a review for: </h2>
        <img src={bookCover} className={classes.book} alt="book cover"/>
        <h3>{bookData.title}</h3>
        {bookAuthor.map(item => (
          <p key={item}> By {item}</p>
        ))}
        <Rating />
        <Form onSubmit={submitForm}>
          <label className='username-container'>
            username
            <Field
              type='text'
              name='username'
              value={review.username}
              onChange={handleChanges}
              component={TextField}
              variant="outlined"
              margin='dense'
              helperText={(touched.username && errors.username) && errors.username}
						  InputProps={{
                classes: {
                  root: classes.inputOutline,
                  focused: classes.focusedOutline,
                  notchedOutline: classes.notchedOutline
                }
						  }}
            />
          </label>

          <label className='review-container'>
            review
            <Field
              component='textarea'
              type='text'
              name='review'
              value={review.review}
              onChange={handleChanges}
              component={TextField}
              variant="outlined"
              margin='dense'
              helperText={(touched.username && errors.username) && errors.username}
						  InputProps={{
                classes: {
                  root: classes.inputOutline,
                  focused: classes.focusedOutline,
                  notchedOutline: classes.notchedOutline
                }
						  }}
            />
          </label>

          <label className='accept-btn' className={classes.items}>
            <Link to={`/book-list/${id}`}><Button className={classes.btn} variant='outlined' size='medium' type='submit'>add review</Button></Link>
          </label>

          <label className='cancel-btn' className={classes.items}>
            <Link to={`/book-list/${id}`}><Button className={classes.btn} variant='outlined' size='medium' type='submit'>cancel</Button></Link>
          </label>
        </Form>
      </div>
    </>
  )
}

const FormikReviewForm = withFormik({
  mapPropsToValues({username, review, rating}
  ){
    return{
      username: username || '',
      review: review || '',
      rating: rating || ''
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
			.required('Username is required'),
		review: Yup.string()
      .required('The review is required'),
    rating: Yup.string()
      .required('The rating is required'),
  }),
  handleSubmit(values, {props}){

  }
})(ReviewForm);

export default FormikReviewForm;