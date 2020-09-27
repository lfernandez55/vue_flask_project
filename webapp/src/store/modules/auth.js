const state = {
    token: "",
    username: "",
    email: "",
    firstName: "",
    lastName: ""
}

const mutations = {
    SET_TOKEN: function (state, tokenString) {
        state.token = tokenString
    },
    SET_ACCOUNT: function(state, resp) {
        state.token = resp.username;
        state.email = resp.email;
        state.firstName = resp.firstname;
        state.lastName = resp.lastname;
    }
}

const actions = {
    setToken: ({ commit }, tokenStr) => {
        commit('SET_TOKEN', tokenStr)
    }
}

const getters = {
    token: state => {
        return state.token
    }
}

export default {
    mutations, state, getters, actions
}
