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
    },
    SET_FOO: function(state, resp) {
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
              commit('SET_ACCOUNT',resp)
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
      // console.log("dddd", userObj)
      // let postObj = {
      //   // params: {
      //     firstName: userObj.firstname,
      //     lastName: userObj.lastname
      //   // }
      // }
      // let headerObj = {
      //   headers: {
      //     "Content-Type": "text/plain",
      //     Authorization:
      //       "Basic " + btoa(state.token + ":" + "whatever"),
      //   },
      // };
      // console.log("postObj",postObj);
      // Vue.http
      //   // .put('https://web2630stocktrader-d7e4e.firebaseio.com/data.json', postObj)
      //   // .post("api/profile", postObj, headerObj)
      //   .put("api/profile", postObj, headerObj)
      //   // .get("api/profile",headerObj)
      //   .then((response) => response.json())
      //   .then((resp) => {
      //     if (resp) {
      //       console.log("in actions.updateProfile", resp)
      //       commit('SET_FOO',resp)
      //     }
      //   })
      //   .catch((err) => {
      //     alert("In actions.js error thrown: " + err)
      //   });
      console.log("UserObj", userObj);
      const data = {
        funds:  "aaa",
        stockPortfolio: "bbbb",
        stocks: "cccc"
      }
      let headerObj = {
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        headers: {
          "Content-Type": "text/plain",
          Authorization:
            "Basic " + btoa(state.token + ":" + "whatever"),
        },
      };
      console.log(data)

      // this.$http.put('https://web2630stocktrader-d7e4e.firebaseio.com/data.json', data)
      //Vue.http.put('http://127.0.0.1:5000/profile',  JSON.stringify(data), headerObj)
      Vue.http.put('http://127.0.0.1:5000/profile',  headerObj)
        .then(response =>{
          // eslint-disable-next-line no-console
          console.log(response)
          commit('SET_FOO',response)
        }), error => {
          // eslint-disable-next-line no-console
          console.log(error)
          alert("an error occurred")
        }
  },
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
