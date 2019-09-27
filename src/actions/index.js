import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

export const REQUEST_START = "REQUEST_START";
export const REQUEST_FAILURE = "REQUEST_FAILURE";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (credentials, history) => dispatch => {
  dispatch({ type: REQUEST_START });
  axios
    .post(
      "https://realwillbrooks-bookr.herokuapp.com/login",
      `grant_type=password&username=${credentials.username}&password=${credentials.password}`,
      {
        headers: {
          Authorization: `Basic ${btoa("beardown:downbear")}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.access_token);
      dispatch({ type: LOGIN_SUCCESS });
      history.push("/book-list");
    })
    .catch(err => {
      console.log(err.response);
      // TODO: add error handling
      dispatch({ type: LOGIN_FAILURE })
    });
};

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (credentials, history) => dispatch => {
  dispatch({ type: REQUEST_START });
  axios
    .post('https://realwillbrooks-bookr.herokuapp.com/createnewuser', credentials)
    .then(res => {
      dispatch({ type: REGISTER_SUCCESS });
      history.push("/login");
      console.log(res)
    })
    .catch(err => {
      console.log(err.response);
      // TODO: add error handling
      dispatch({ type: REGISTER_FAILURE })
    });
};

export const GET_SUCCESS = "GET_SUCCESS";

// export const getBookList = () => dispatch => {
//   // dispatch({ type: REQUEST_START });
//   // TODO: add axios get request endpoint
//   axiosWithAuth()
//     .get(`/books/endpoint/here`)
//     .then(res => {
//       console.log(res);
//       // dispatch({ type: GET_SUCCESS, payload: res.data })
//     })
//     .catch(err => {
//       console.log(err);
//       // dispatch({ type: REQUEST_FAILURE, payload: err.response })
//     });
// };

export const DELETE_SUCCESS = "DELETE_SUCCESS";

export const deleteBook = (id, history) => dispatch => {
  console.log(`book with id: ${id} deleting...`);
  // dispatch({ type: REQUEST_START });
  // TODO: add axios DELETE request endpoint
  // axiosWithAuth().delete(`/delete/endpoint/here/${id}`)
  //   .then(res => {
  //     console.log(res)
  //     dispatch({ type: DELETE_SUCCESS })
  //     history.push('/book-list')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch({ type: REQUEST_FAILURE })
  //   })
};

export const LOGOUT = "LOGOUT";

export const logout = () => {
  console.log(`loggin out...`);
  localStorage.clear();
  return { type: LOGOUT };
};

export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
// // id, history, 
// export const addReview = (review) => dispatch => {
//   console.log(`adding review...`);

//   // dispatch({ type: REQUEST_START });
//   // TODO: add axios POST request endpoint
//   // axiosWithAuth().post(`/review/review`, review)
//   axiosWithAuth().get('/users/user/name/blue')
//     .then(res => {
//       console.log(res)
//       // dispatch({ type: ADD_REVIEW_SUCCESS, payload: { id: id, review: review} })
//       // history.push(`/book-list/${id}`)
//       return axiosWithAuth().post('/review/review', {...review, user: res.data})
//     })
//     .then(res => {
//       console.log(res)
//     })
//     .catch(err => {
//       console.log(err.response)
//       // dispatch({ type: REQUEST_FAILURE, payload: err.response })
//     })
// };

export const addReview = (review) => {
  return ({ type: ADD_REVIEW_SUCCESS, payload: review })
}

export const GET_GOOGLE_BOOK_DATA_SUCCESS = "GET_GOOGLE_BOOK_DATA_SUCCESS";

export const getGoogleBookData = id => dispatch => {
  dispatch({ type: REQUEST_START })
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
    .then(res => {
      console.log(res.data.detail);
      // const data = response.data.volumeInfo;
      // setBookData(data);
      // setBookAuthor(response.data.volumeInfo.authors);
      // setBookCover(
      //   response.data.volumeInfo.imageLinks.small ||
      //     response.data.volumeInfo.imageLinks.thumbnail
      // );
      dispatch({ type: GET_GOOGLE_BOOK_DATA_SUCCESS, payload: { volumeInfo: res.data.volumeInfo, id: res.data.id, saleInfo: res.data.saleInfo } })
    })
    .catch(err => console.log(err))
};

export const SET_RATING = 'SET_RATING';

export const setRating = (rating) => {
  return ({ type: SET_RATING, payload: rating })
}
