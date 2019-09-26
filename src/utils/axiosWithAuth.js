import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: 'https://realwillbrooks-bookr.herokuapp.com/',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}