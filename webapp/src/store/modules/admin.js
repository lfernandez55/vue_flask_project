import Vue from 'vue'

const state = {
  users: []
}

const mutations = {
  SET_USERS: function (state, resp) {
    state.users = resp
  }

}

const actions = {
  getUsers: ({ commit }, userObj) => {
      console.log("in action getUsers", userObj)
      let url = Vue.prototype.$hostname + '/api/admin/users';
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(state.token + ":" + "whatever")
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          if(resp.error){
            let payload = {
              status: resp.error,
              alertMsg: 'Darn.  Something went wrong!'
            }
            commit('SET_ALERT',payload);
          }else{
            commit('SET_USERS',resp);
          }
          
        })
        .catch((err) => {
          alert("Error: " + err.message);
          let payload = {
            status: err,
            alertMsg: 'Something went wrong'
          }
          commit('SET_ALERT',payload);
        });
  },
  getUsers2: (context) => {
    let headerObj = {
      headers: {
        "Content-Type": "text/plain",
        Authorization:
          "Basic " + btoa(state.token + ":" + "whatever"),
      },
    };
    Vue.http
      .get("api/admin/users", headerObj)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          if (data.token) {
            context.commit('SET_USERS',data);
          }
        }
      })
      .catch((err) => {
        if (err.body.error == "Unauthorized access") {
          let payload = {
            status: err,
            alertMsg: 'Darn. Unauthorized access. . .'
          }
          context.commit('SET_ALERT',payload);
        } else {
          console.log("Error: " + err.message);
          let payload = {
            status: err,
            alertMsg: 'Something went wrong'
          }
          context.commit('SET_ALERT',payload);
        }
      });
  },
//   getUsers3: ({ commit }) => {
    //below from loadaccountdata but isn't working
    getUsers3: ({ commit, rootState }) => {
        console.log("in getuser3", rootState.auth.token)
        let headerObj = {
          headers: {
            "Content-Type": "text/plain",
            Authorization:
              "Basic " + btoa(rootState.auth.token + ":" + "whatever"),
          },
        };
        Vue.http
          .get("api/admin/users", headerObj)
          .then((response) => response.json())
          .then((resp) => {
            if (resp) {
              console.log("in actions.jsxxxx", resp)
              commit('SET_USERS', resp)
            }
          })
          .catch((err) => {
            alert("In actions.js error thrown: " + err)
          });
      }
}

const getters = {
 
}

export default {
  mutations, state, getters, actions
}
