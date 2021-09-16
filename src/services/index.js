import axios from 'axios';

export default () => {
  const options = {};
  options.baseURL = 'http://localhost:3000';
  options.headers={}
  options.headers.Authorization = localStorage.getItem('token')

  const instance = axios.create(options);
  instance.interceptors.response.use(response => {
    return response.data;
  }, error => {
    return Promise.reject(error);
  });
  return instance;
};