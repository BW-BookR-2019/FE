import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  axios.create({
    baseURL: 'https://jondscott21-internationschool.herokuapp.com',
    headers: {
      Authorization: token
    }
  })
}