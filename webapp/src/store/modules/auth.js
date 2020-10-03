import Vue from 'vue'

const state = {
  token: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  fetchStatus: "",
  flashMessage: ""
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
  },
  SET_FETCH_STATUS: function (state, payload) {
    console.log("in SET_FETCH_STATUS", payload)
    state.fetchStatus = payload.status;
    state.flashMessage = payload.flashMessage;
    setTimeout(()=>{state.flashMessage = ""; console.log("in settimeout")},3000)
  }
}

const actions = {
  setToken: ({ commit }, tokenStr) => {
    commit('SET_TOKEN', tokenStr)
  },
  loadAccountData: ({ commit }) => {
    let headerObj = {
      headers: {
        "Content-Type": "text/plain",
        Authorization:
          "Basic " + btoa(state.token + ":" + "whatever"),
      },
    };
    // here we use vue-resource. below we use standard fetch
    // (IMO standard fetch is better)
    Vue.http
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
      let url = Vue.prototype.$hostname + '/api/profile';
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
          console.log(Vue.prototype.$hostname)
          commit('SET_ACCOUNT',resp);
          resp.foo = "success";
          if(resp.error){
            let payload = {
              status: resp.error,
              flashMessage: 'Darn.  Something went wrong!'
            }
            commit('SET_FETCH_STATUS',payload);
          }else{
            let payload = {
              status: 'success',
              flashMessage: 'Profile updated!'
            }
            commit('SET_FETCH_STATUS',payload);
          }
          
        })
        .catch((err) => {
          alert("Error: " + err.message);
          let payload = {
            status: err,
            flashMessage: 'Something went wrong'
          }
          commit('SET_FETCH_STATUS',payload);
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
