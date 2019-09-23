import { GET_START, GET_SUCCESS, GET_FAILURE } from '../actions';

const initialState = {
  bookList: {},
  isFetching: false,
  error: null,
  isLoggedIn: false
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case GET_SUCCESS:
      return {
        ...state,
        bookList: action.payload,
        isFetching: false
      }
    case GET_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false,
      }
    default: 
      return state;
  }
}