// import Vue from 'vue'

const state = {
  alertType: "",
  alertMsg: "",
  displayAlert: false
}


const mutations = {
    SET_FETCH_STATUS: function (state, payload) {
      console.log("in SET_FETCH_STATUS", payload)
      state.alertType = payload.status;
      state.alertMsg = payload.alertMsg;
      state.displayAlert = true;
      //setTimeout(()=>{state.alertMsg = ""; console.log("in settimeout")},3000)
      // setTimeout(()=>{state.alertType = ""; console.log("in settimeout")},3000)
    }
  }
  
  
  
  export default {
    mutations, state
  }
  