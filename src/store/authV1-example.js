// ACTION DOSENOT PLAY ANY IMPORTANT PART HERE 
//tho EXPERTS SAYS USE MUTATION THROUGH ACTION IS BEST PRACTICE
//LETS COMPARE
// STATE === DATA
// GETTERS === COMPUTED
// ACTIONS === METHODS
// MUTATION IS USEFUL FOR TRACKING 

//EXAMPLE 1 -- WE USE ACTION WITHOUT MUTATION
//NO TRACK FOUND IN VUEX    

//EXAMPLE 1 -- WE USE ACTION WITH COMMIT MUTATION
// TRACKS FOUND IN VUEX    

const state = {
    user: localStorage.getItem('user')
}

const mutations = {
    ['login'](state) {
        state.user = localStorage.getItem('user')
    },
    ['logout'](state) {
        state.user = null
    }
}

const getters = {
    currentUser(state) {
        return state.user
    }
}

const actions = {
    //FOR EXAMPLE 2
    login({ commit }) {

        commit('login')


    },

    //FOR EXAMPLE 1
    login1() {

        state.user = localStorage.getItem('user')
    },

    //FOR EXAMPLE 2
    logout({ commit }) {
        commit('logout')
    },

    //FOR EXAMPLE 1
    logout1() {
        state.user = null
    }
}

export default {
    state,
    mutations,
    getters,
    actions
}