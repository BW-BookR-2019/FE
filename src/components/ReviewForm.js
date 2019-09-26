import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from './Rating'
import { useSelector, useDispatch, connect } from 'react-redux';
import { getGoogleBookData, addReview } from '../actions';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const ReviewForm = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const googleBookData = useSelector(state => state.googleBookData);

  useEffect(() => {
    if (googleBookData && googleBookData.id !== id) {
      dispatch(getGoogleBookData(id))
    }
  }, [])

  return(
    <>
      {googleBookData && <div className='review-form'>
      <h2>Leave a review for: </h2>
      <img src={googleBookData.volumeInfo.imageLinks.small ||
                googleBookData.volumeInfo.imageLinks.thumbnail} alt="book cover"/>
      <h3>{googleBookData.volumeInfo.title}</h3>
      {googleBookData.volumeInfo.authors.map(item => (
        <p key={item}> By {item}</p>
      ))}
        <Rating />
        <Form >
          <label className='username-container'>
            Username
            <Field
              type='text'
              name='user'
            />
          </label>

          <label className='review-container'>
            Review
            <Field
              component='textarea'
              type='text'
              name='review'
            />
          </label>

          <label className='accept-btn'>
            <Button type="submit">Add Review</Button>
          </label>

          <label className='cancel-btn'>
            <Link to={`/book-list/${id}`}><Button>Cancel</Button></Link>
          </label>
        </Form>
      </div>}
    </>
  )
}

const FormikReviewForm = withFormik({
  mapPropsToValues({user, review}
  ){
    return{
      user: user || '',
      review: review || '',
      // rating: rating || ''
    }
  },
  validationSchema: Yup.object().shape({
    user: Yup.string()
			.required('User is required'),
		review: Yup.string()
      .required('The review is required'),
    // rating: Yup.string()
    //   .required('The rating is required'),
  }),
  handleSubmit(values, { props }){
    props.addReview({ ...values, id: Date.now(), rating: 1 });
    props.history.push(`/book-list/${props.match.params.id}`);
  }
})(ReviewForm);

export default connect(null, { addReview })(FormikReviewForm);