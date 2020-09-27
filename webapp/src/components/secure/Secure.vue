<template>
  <div id="secure">
    <h1>Secure Area</h1>
    <p>Token: {{ this.$store.state.auth.token }}</p>
    <p>Token with getter: {{ this.$store.getters.token }}</p>
    <p>Message from server: {{serverMsg}}</p>
    <p>{{ this.$store.state.auth.email }}</p>
    <button @click="loadUserAccountData()">Load User Account Data</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "Secure",
  data() {
    return {
      userName: "",
      serverMsg: "",
    };
  },
  mounted: function() {
    // this.getData();
    this.loadUserAccountData();
  },
  methods: {
    ...mapActions({
      loadUserInfo: 'loadUserData'
    }),
    // getData() {
    //   let headerObj = {
    //     headers: {
    //       "Content-Type": "text/plain",
    //       Authorization:
    //         "Basic " + btoa(this.$store.state.auth.token + ":" + "whatever"),
    //     },
    //   };
    //   this.$http
    //     .get("api/resource", headerObj)
    //     .then((response) => response.json())
    //     .then((resp) => {
    //       if (resp) {
    //         console.log(resp);
    //         this.serverMsg = resp.data;
    //       }
    //     })
    //     .catch((err) => {
    //       if (err.body.error == "Unauthorized access") {
    //         this.msg = err.body.error;
    //       } else {
    //         console.log("Error: " + err.message);
    //       }
    //     });
    // },
    loadUserAccountData(){
        this.loadUserInfo(this.$store.state.auth.token);
    }
  },
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;
}
</style>
