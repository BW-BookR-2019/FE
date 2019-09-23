export const GET_START = 'GET_START';
export const GET_SUCCESS = 'GET_SUCCESS';
export const GET_FAILURE = 'GET_FAILURE';

export const getBookList = () => dispatch => {
  dispatch({ type: GET_START });
  // TODO: add axios get request
}