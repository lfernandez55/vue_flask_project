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
  SET_ACCOUNT: function (state, resp) {
    console.log("in SET_ACCOUNT", resp)
    state.username = resp.username;
    state.email = resp.email;
    state.firstName = resp.firstname;
    state.lastName = resp.lastname;
    console.log("state:", state)
  },
  SET_FOO: function (state, resp) {
    console.log("in SET_FOO", resp)

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
          commit('SET_ACCOUNT', resp)
        }
      })
      .catch((err) => {
        alert("In actions.js error thrown: " + err)
      });
  },
  // buyStock: ({ commit }, order) => {
  //   commit('BUY_STOCK', order);
  // }
  updateProfile: ({ commit }, userObj) => {
    console.log("in updateProfile", userObj)
    let url = 'http://127.0.0.1:5000/api/profile';
    let data = {
      firstname: userObj.firstname,
      lastname: userObj.lastname
    };
    console.log(data)
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(state.token + ":" + "whatever")
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        console.log(resp);
        commit('SET_ACCOUNT',resp)
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  },
}

const getters = {
  token: state => {
    return state.token
  },
  authenticated: state => {
    if (state.token == "") {
      return false;
    } else {
      return true;
    }
  }
}

export default {
  mutations, state, getters, actions
}
