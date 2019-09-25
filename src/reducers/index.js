import {
  REQUEST_START,
  REQUEST_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  GET_SUCCESS,
  DELETE_SUCCESS,
  ADD_REVIEW_SUCCESS,
  GET_GOOGLE_BOOK_DATA_SUCCESS
} from "../actions";

const initialState = {
  bookList: [],
  googleBookData: null,
  isFetching: false,
  error: null,
  isLoggedIn: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_START:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoggedIn: true
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        bookList: []
      }
    case GET_SUCCESS:
      return {
        ...state,
        bookList: action.payload,
        isFetching: false
      };
    case DELETE_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        bookList: state.bookList.map(book => {
          if (book.id === action.payload.id) {
            return {
              ...book,
              reviews: [
                ...book.reviews,
                action.payload.review
              ]
            }
          } else {
            return book
          }
        })
      }
    case GET_GOOGLE_BOOK_DATA_SUCCESS:
      return {
        ...state,
        googleBookData: action.payload,
        isFetching: false
      }
    default:
      return state;
  }
};
