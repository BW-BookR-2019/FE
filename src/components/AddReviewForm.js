import React from 'react';
import { Link } from 'react-router-dom';
// import {BookPage} from '../components/BookPage'

const AddReviewForm = (props) => {
  return (
    <div>
      <h1>Leave a review for {props.info}</h1>
      <h5>Review: (book.id)</h5>
      <p>What did you think?</p>
      <form>
        <textarea name='review' id='review' cols='30' rows='10'></textarea>
        <Link to='/book-list/:id'>
          <button type='submit'>Submit</button>
        </Link>
        <Link to='/book-list/:id'>
          <button type='button'>Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default AddReviewForm;
