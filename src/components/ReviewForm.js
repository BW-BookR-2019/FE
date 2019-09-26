import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from './Rating'
import { useSelector, useDispatch } from 'react-redux';
import { getGoogleBookData } from '../actions';

const ReviewForm = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const googleBookData = useSelector(state => state.googleBookData);

  useEffect(() => {
    if (googleBookData.id !== id) {
      dispatch(getGoogleBookData(id))
    }
  }, [])


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
      <div className='review-form'>
      <h2>Leave a review for: </h2>
      <img src={googleBookData.imageLinks.small ||
                googleBookData.imageLinks.thumbnail} alt="book cover"/>
      <h3>{googleBookData.title}</h3>
      {googleBookData.authors.map(item => (
        <p key={item}> By {item}</p>
      ))}
        <Rating />
        <Form onSubmit={submitForm}>
          <label className='username-container'>
            Username
            <Field
              type='text'
              name='username'
              value={review.username}
              onChange={handleChanges}
            />
          </label>

          <label className='review-container'>
            Review
            <Field
              component='textarea'
              type='text'
              name='review'
              value={review.review}
              onChange={handleChanges}
            />
          </label>

          <label className='accept-btn'>
            <Link to={`/book-list/${id}`}><Button>Add Review</Button></Link>
          </label>

          <label className='cancel-btn'>
            <Link to={`/book-list/${id}`}><Button>Cancel</Button></Link>
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