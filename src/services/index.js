import axios from 'axios';
import Vue from 'vue'

export default () => {
  const options = {};
  options.baseURL = 'http://localhost:3000';
  options.headers = {}
  // options.headers.Authorization = Vue.$cookies.get('Authorization')

  const instance = axios.create(options);
  instance.interceptors.response.use(response => {
    return response.data;
  }, error => {
    // if (error.response && error.response.data && error.response.data.message) {
    //   EventBus.$emit('show-error-box', error.response.data.message);
    // }
    return Promise.reject(error);
  });
  return instance;
};