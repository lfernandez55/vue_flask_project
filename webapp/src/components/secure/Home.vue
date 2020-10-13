<template>
  <div id="home">
    <h1>Home</h1>
    <!-- <h1>Secure Area</h1>
    <p>Token: {{ this.$store.state.auth.token }}</p>
    <p>Token with getter: {{ this.$store.getters.token }}</p>
    <p>Authenticated: {{ this.$store.getters.authenticated }}</p>
    <hr> -->
    <h2>
      Welcome {{ this.$store.state.auth.firstName }}
      {{ this.$store.state.auth.lastName }}!
    </h2>
    <!-- <p>{{ this.$store.state.auth.firstName }}</p>
    <p>{{ this.$store.state.auth.lastName }}</p>
    <p>{{ this.$store.state.auth.email }}</p> -->
    <h4>Here are your roles:</h4>
    <!-- <ul class="list-group">
      <router-link v-for="role in this.$store.state.auth.roles" :key="role.id"
        tag="li" :to=role.name class="list-group-item" style="cursor: pointer"
        >{{ role.name | capitalize }}</router-link
      >
    </ul> -->
    <hr>
    <ul class="list-group ">
      <router-link v-for="role in this.$store.state.auth.roles" :key="role" 
        tag="li" :to=role class="list-group-item " style="cursor: pointer"
        >{{ role | capitalize }}</router-link
      >
    </ul>

  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userName: "",
      serverMsg: "",
    };
  },
  mounted: function() {
    if (this.$store.state.auth.token != "") {
      this.$store.dispatch("loadAccountData");
    } else {
      this.$router.replace({ name: "login" });
    }
  },
  methods: {},
  filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
};
</script>

<style scoped>
#secure {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  padding: 20px;
  margin-top: 10px;

}
li:hover{
  background-color:cornflowerblue;
}
.list-group{
      display:inline-block;
 }
</style>
