import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_START,
  GET_SUCCESS,
  GET_FAILURE,
  DELETE_START,
  DELETE_SUCCESS,
  DELETE_FAILURE,
  LOGOUT,
  logout
} from "../actions";

const initialState = {
  bookList: [],
  isFetching: false,
  error: null,
  isLoggedIn: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true
      }
      case REGISTER_START:
        return {
          ...state,
          isFetching: true,
          error: null
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isFetching: false,
          isLoggedIn: true
        }
    case GET_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case GET_SUCCESS:
      return {
        ...state,
        bookList: action.payload,
        isFetching: false
      };
    case GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case DELETE_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case DELETE_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        bookList: []
      }
    default:
      return state;
  }
};
