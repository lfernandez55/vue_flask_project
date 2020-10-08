<template>
  <div id="secure">
    <!-- <h1>Secure Area</h1>
    <p>Token: {{ this.$store.state.auth.token }}</p>
    <p>Token with getter: {{ this.$store.getters.token }}</p>
    <p>Authenticated: {{ this.$store.getters.authenticated }}</p>
    <hr> -->
    <h2>Welcome {{ this.$store.state.auth.firstName }} {{ this.$store.state.auth.lastName }}!</h2>
    <!-- <p>{{ this.$store.state.auth.firstName }}</p>
    <p>{{ this.$store.state.auth.lastName }}</p>
    <p>{{ this.$store.state.auth.email }}</p> -->
  </div>
</template>

<script>
export default {
  name: "Secure",
  data() {
    return {
      userName: "",
      serverMsg: "",
    };
  },
  mounted: function() {
    if (this.$store.state.auth.token != ""){
      this.$store.dispatch('loadAccountData')
    }else{
      this.$router.replace({ name: "login" });
    }
    
  },
  methods: {

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
