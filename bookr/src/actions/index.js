// import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

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
  dispatch({ type: GET_START });
  // TODO: add axios get request
};
