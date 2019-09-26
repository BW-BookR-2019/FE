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
  isLoggedIn: false,
  dummyReviews: [
    {
      user: " Maria R.",
      review:
        "I just want to say thank you for providing college books at affordable prices. We all know not all, but most college students are on their own and have to work and study. By you selling books almost 50% off from what college book stores want, you help students like me, succeed and have a career. Thank you again.",
      rating: 5
    },
    {
      user: "Chris B.",
      review:
        "This read was engaging and quickly grabbed my attention from the first chapter.",
      rating: 3.5
    },
    {
      user: "Jennie T.",
      review:
        "A quick note to let you know I rec'd my book -- great condition, fast shipping. Thanks so much! I'm happy to leave positive feedback. Thanks again.",
      rating: 4.5
    }
  ]
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
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        bookList: []
      };
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
              reviews: [...book.reviews, action.payload.review]
            };
          } else {
            return book;
          }
        })
      };
    case GET_GOOGLE_BOOK_DATA_SUCCESS:
      return {
        ...state,
        googleBookData: action.payload,
        isFetching: false
      };
    default:
      return state;
  }
};
