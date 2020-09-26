const state = {
    token: ""
}

const mutations = {
    SET_TOKEN: function (state, tokenString) {
        state.token = tokenString
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
