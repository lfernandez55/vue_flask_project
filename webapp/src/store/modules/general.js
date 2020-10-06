// import Vue from 'vue'

const state = {
  fetchStatus: "",
  flashMessage: "",
  messageTrigger: false
}


const mutations = {
    SET_FETCH_STATUS: function (state, payload) {
      console.log("in SET_FETCH_STATUS", payload)
      state.fetchStatus = payload.status;
      state.flashMessage = payload.flashMessage;
      state.messageTrigger = true;
      //setTimeout(()=>{state.flashMessage = ""; console.log("in settimeout")},3000)
      // setTimeout(()=>{state.fetchStatus = ""; console.log("in settimeout")},3000)
    }
  }
  
  
  
  export default {
    mutations, state
  }
  