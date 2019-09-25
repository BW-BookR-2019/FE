import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  axios.create({
    baseURL: 'https://ks-starthere.herokuapp.com',
    headers: {
      Authorization: token
    }
  })
}