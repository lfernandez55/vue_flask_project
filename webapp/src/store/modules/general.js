// import Vue from 'vue'

const state = {
  alertType: "",
  alertMsg: "",
  displayAlert: false,
  newRouteRequest: ""
}


const mutations = {
    SET_ALERT: function (state, payload) {
      console.log("in SET_ALERT", payload)
      state.alertType = payload.status;
      state.alertMsg = payload.alertMsg;
      state.displayAlert = true;
      payload.newRouteRequest ? state.newRouteRequest = payload.newRouteRequest : state.newRouteRequest = ""
      // state.newRouteRequest = payload.newRouteRequest;
      //setTimeout(()=>{state.alertMsg = ""; console.log("in settimeout")},3000)
      // setTimeout(()=>{state.alertType = ""; console.log("in settimeout")},3000)
    },
    CLEAR_NEW_ROUTE_REQ: function (state) {
      state.newRouteRequest = ""
    }

  }
  
  
  
  export default {
    mutations, state
  }
  