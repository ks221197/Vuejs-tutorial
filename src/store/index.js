import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    user: ''
  },
  getters: {
    isAuthenticated: state => state.isLoggedIn,
    user: state => state.user
  },
  mutations: {
    setUser(state, data) {
      state.user = data.user
      state.isLoggedIn = true
    },
    removeUser(state) {
      state.user = null
      state.isLoggedIn = false
    },
  },
  actions: {

  }
})