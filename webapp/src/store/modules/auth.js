import Vue from 'vue'

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
        console.log("in SET_ACCOUNT", resp)
        state.username = resp.username;
        state.email = resp.email;
        state.firstName = resp.firstname;
        state.lastName = resp.lastname;
        console.log("state:", state)
    }
}

const actions = {
    setToken: ({ commit }, tokenStr) => {
        commit('SET_TOKEN', tokenStr)
    },
    loadAccountData: ({ commit }) => {
        // var resp = {}
        // console.log("in actions auth:", state.token)
        // commit('SET_ACCOUNT', resp)
        // console.log("in actions.js", token)
        let headerObj = {
          headers: {
            "Content-Type": "text/plain",
            Authorization:
              "Basic " + btoa(state.token + ":" + "whatever"),
          },
        };
        Vue.http
        // this.$http
          .get("api/account", headerObj)
          .then((response) => response.json())
          .then((resp) => {
            if (resp) {
              console.log("in actions.jsxxxx", resp)
              commit('SET_ACCOUNT',resp)
            }
          })
          .catch((err) => {
            alert("In actions.js error thrown: " + err)
          });



    }
}

const getters = {
    token: state => {
        return state.token
    },
    authenticated: state => {
      if (state.token == ""){
        return false;
      } else {
        return true;
      }
    }
}

export default {
    mutations, state, getters, actions
}
