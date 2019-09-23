import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token')

  axios.create({
    baseURL: '', //TODO: add base endpoint url
    headers: {
      Authorization: token
    }
  })
}