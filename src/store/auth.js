// THIS CAN WORK WITHOUT ACTION BECAUSE EACH TIME WE REFRESH PAGE STATE REINITIALIZE AND SET WITH LOCALSTORAGE VALUE
const state = {
    user: localStorage.getItem('user')
}

const getters = {
    currentUser(state) {
        return state.user
    }
}

const mutations = {
    setUser(state) {
        state.user = localStorage.getItem('user')
    },
    removeUser(state) {
        state.user = null
    }
}



// const actions = {
//     setUser({ commit }) {
//         commit('login')
//     },

//     removeUser({ commit }) {
//         commit('logout')
//     }
// }

export default {
    state,
    mutations,
    getters,
    // actions
}