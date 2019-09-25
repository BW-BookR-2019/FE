import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import { Form } from 'formik'

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
    color: 'black'
  },
  margin: {
    height: theme.spacing(3),
    color: 'black'
  },
}));

function valuetext(value) {
  return `${value}`;
}

const AddReviewForm = (props) => {
  const classes = useStyles();

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
      <div className={classes.root}>
      
      <div className={classes.margin} />
      <Typography id="discrete-slider-small-steps" gutterBottom>
        Rating:
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-small-steps"
        step={1}
        marks
        min={1}
        max={5}
        valueLabelDisplay="auto"
      />
      </div>
      {/* RATING */}
      <div>
        {valuetext === '5' ? console.log('5'):console.log('0')}
      </div>
      <i class="far fa-star"></i>
      <i class="fas fa-star"></i>
      {/* FIELD: TEXTBOX */}
      <Button type='submit'>Add Review</Button>
      <button>Cancel</button>
    </>
  )
};

export default AddReviewForm;
