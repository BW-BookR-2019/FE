// import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (credentials, history) => dispatch => {
  dispatch({ type: LOGIN_START });
  axios
    .post("https://reqres.in/api/users/", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data);
      dispatch({ type: LOGIN_SUCCESS });
      history.push("/book-list");
    })
  .catch(err => {
    console.log(err);
    // TODO: add error handling
    // dispatch({ type: LOGIN_FAILURE })
  });

  // TODO: uncomment when backend is deployed
  // axios
  //   .post(
  //     "https://jondscott21-internationschool.herokuapp.com/login",
  //     `grant_type=password&username=${credentials.email}&password=${credentials.password}`,
  //     {
  //       headers: {
  //         Authorization: `Basic ${btoa("lambda-client:lambda-secret")}`,
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       }
  //     }
  //   )
  //   .then(res => localStorage.setItem("token", res.data.access_token))
  //   .catch(err => {
  //     console.log(err)
  //     // TODO: add error handling
  //     // dispatch({ type: LOGIN_FAILURE })
  //   });
};

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (credentials, history) => dispatch => {
  dispatch({ type: REGISTER_START });
  axios
    .post("https://reqres.in/api/users/", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data);
      dispatch({ type: REGISTER_SUCCESS });
      history.push("/book-list");
    })
    .catch(err => {
      console.log(err);
      // TODO: add error handling
      // dispatch({ type: REGISTER_FAILURE })
    });
};

export const GET_START = "GET_START";
export const GET_SUCCESS = "GET_SUCCESS";
export const GET_FAILURE = "GET_FAILURE";

export const getBookList = () => dispatch => {
  // dispatch({ type: GET_START });
  // TODO: add axios get request endpoint
  // axiosWithAuth().get(`/get/endpoint/here`)
  //   .then(res => {
  //     console.log(res)
  //     dispatch({ type: GET_SUCCESS })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch({ type: GET_FAILURE })
  //   })
};

export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAILURE = "DELETE_FAILURE";

export const deleteBook = (id, history) => dispatch => {
  console.log(`book with id: ${id} deleting...`)
  // dispatch({ type: DELETE_START });
  // TODO: add axios DELETE request endpoint
  // axiosWithAuth().delete(`/delete/endpoint/here/${id}`)
  //   .then(res => {
  //     console.log(res)
  //     dispatch({ type: DELETE_SUCCESS })
  //     history.push('/book-list')
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     dispatch({ type: DELETE_FAILURE })
  //   })
};
