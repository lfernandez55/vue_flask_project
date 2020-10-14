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
    getUsers: (context) => {
        let url = Vue.prototype.$hostname + '/api/admin/users';
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa(context.rootState.auth.token + ":" + "whatever")
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((resp) => {
                if (resp.error) {
                    let payload = {
                        status: resp.error,
                        alertMsg: 'Darn.  Something went wrong while getting users!'
                    }
                    context.commit('SET_ALERT', payload);
                } else {
                    context.commit('SET_USERS', resp);
                }

            })
            .catch((err) => {
                alert("Error: " + err.message);
                let payload = {
                    status: err,
                    alertMsg: 'Something went wrong while getting users'
                }
                context.commit('SET_ALERT', payload);
            });
    },
    //the below is just like the above only using vue resource instead of fetch
    // getUsers: (context) => {
    //     console.log("in getuser3", context.rootState.auth.token)
    //     let headerObj = {
    //         headers: {
    //             "Content-Type": "text/plain",
    //             Authorization:
    //                 "Basic " + btoa(context.rootState.auth.token + ":" + "whatever"),
    //         },
    //     };
    //     Vue.http
    //         .get("api/admin/users", headerObj)
    //         .then((response) => response.json())
    //         .then((resp) => {
    //             if (resp) {
    //                 console.log("in actions.jsxxxx", resp)
    //                 context.commit('SET_USERS', resp)
    //             }
    //         })
    //         .catch((err) => {
    //             alert("In actions.js error thrown: " + err)
    //         });
    // }
    
}

const getters = {

}

export default {
    mutations, state, getters, actions
}
