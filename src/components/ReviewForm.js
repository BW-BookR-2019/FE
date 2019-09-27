/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Rating from "./Rating";
import { useSelector, useDispatch, connect } from "react-redux";
import { getGoogleBookData, addReview, setRating } from "../actions";

const ReviewForm = ({ match, touched, errors, rating, setRating }) => {
  const id = match.params.id;

  const isFetching = useSelector(state => state.isFetching);

  // STYLING
  const useStyles = makeStyles(() => ({
    container: {
      display: "flex",
      justifyContent: "center",
      border: "2px solid #cf4e28",
      borderRadius: "1%",
      margin: "1% auto",
      width: "50%",
      padding: "3%"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      width: "50%"
    },
    formItems: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20%"
    },
    bookinfo: {
      width: "50%"
    },
    buttonContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end"
    },
    subcontainer: {
      display: "flex",
      flexDirection: "column"
    },
    link: {
      textDecoration: "none",
      color: "white"
    },
    btn: {
      textTransform: "lowercase",
      color: "white",
      borderColor: "white",
      backgroundColor: "#edb901",
      marginRight: "2%",
      "&:hover": {
        backgroundColor: "#cf4e28",
        transition: "0.3s"
      }
    },
    inputOutline: {
      backgroundColor: "white",
      borderRadius: "0.25rem",
      "&$focusedOutline $notchedOutline": {
        borderColor: "#cf4e28 !important"
      }
    },
    focusedOutline: {},
    notchedOutline: {
      border: "2px solid #edb901"
    }
  }));

  // BUILDING FORM
  const classes = useStyles();

  const dispatch = useDispatch();
  const googleBookData = useSelector(state => state.googleBookData);

  useEffect(() => {
    if (!googleBookData || googleBookData.id !== id) {
      dispatch(getGoogleBookData(id));
    }
  }, []);

  // const [rating, setRating] = useState(1);

  return (
    <>
      {googleBookData && (
        <div className="review-form" className={classes.container}>
          <div className={classes.bookinfo}>
            <h2>Leave a review for: </h2>
            <img
              src={
                googleBookData.volumeInfo.imageLinks.small ||
                googleBookData.volumeInfo.imageLinks.thumbnail
              }
              className={classes.book}
              alt="book cover"
            />
            <h3>{googleBookData.volumeInfo.title}</h3>
            {googleBookData.volumeInfo.authors.map(item => (
              <p key={item}> By {item}</p>
            ))}
          </div>
          <div className="reviewformContainer" className={classes.form}>
            <Form className={classes.formItems}>
              <Rating rating={rating} setRating={setRating} />
              <label
                className="username-container"
                className={classes.subcontainer}
              >
                username
                <Field
                  type="text"
                  name="user"
                  component={TextField}
                  variant="outlined"
                  margin="dense"
                  helperText={touched.user && errors.user && errors.user}
                  InputProps={{
                    classes: {
                      root: classes.inputOutline,
                      focused: classes.focusedOutline,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                />
              </label>

              <label
                className="review-container"
                className={classes.subcontainer}
              >
                review
                <Field
                  type="text"
                  name="review"
                  component={TextField}
                  variant="outlined"
                  margin="dense"
                  multiline={true}
                  rows={10}
                  rowsMax={10}
                  helperText={touched.review && errors.review && errors.review}
                  InputProps={{
                    classes: {
                      root: classes.inputOutline,
                      focused: classes.focusedOutline,
                      notchedOutline: classes.notchedOutline
                    }
                  }}
                />
              </label>
              <div className={classes.buttonContainer}>
                <Button
                  className={classes.btn}
                  variant="outlined"
                  size="medium"
                  type="submit"
                >
                  add review
                </Button>
                <Link className={classes.link} to={`/book-list/${id}`}>
                  <Button
                    className={classes.btn}
                    variant="outlined"
                    size="medium"
                  >
                    cancel
                  </Button>
                </Link>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

const FormikReviewForm = withFormik({
  mapPropsToValues({ user, review }) {
    return {
      user: user || "",
      review: review || ""
    };
  },
  validationSchema: Yup.object().shape({
    user: Yup.string().required("User is required"),
    review: Yup.string().required("The review is required")
  }),
  handleSubmit(values, { props }) {
    console.log(`hitting form submit`);
    console.log(props.rating)
    props.addReview({ ...values, rating: props.rating, id: props.match.params.id });
    props.history.push(`/book-list/${props.match.params.id}`);
  }
})(ReviewForm);

const mapStateToProps = state => {
  return {
    rating: state.rating
  }
}

export default connect(
  mapStateToProps,
  { addReview, setRating }
)(FormikReviewForm);
