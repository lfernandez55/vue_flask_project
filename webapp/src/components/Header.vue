<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <transition name="slide" mode="out-in">
        <div id="flash" v-show="this.$store.state.general.flashMessage != ''" v-bind:style="myStyle">
          {{ this.$store.state.general.flashMessage }}
        </div>
      </transition>
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Flask App</router-link>
      </div>
      <!-- {{$store.state.general.flashMessage}}  --> 
      <!-- {{this.$store.state.general.fetchStatus}} -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/secure" active-class="active"
            ><a>Secure</a></router-link
          >
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="profile">{{ this.$store.state.auth.email }}</a>
          </li>
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="logOut">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  computed: {
    myStyle: function() {
      if (this.$store.state.general.fetchStatus == "success") {
        return {
          backgroundColor: "#33FF66",
        };
      } else {
        return {
          backgroundColor: "#FF6666",
        };
      }
    },
  },
  methods: {
    logOut: function() {
      this.$store.dispatch("setToken", "");
    },
    profile: function() {
      this.$router.replace({ name: "profile" });
    },
    saveData: function() {
      const data = {
        funds: this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks,
      };
      let headerObj = {
        headers: {
          "Content-Type": "text/plain",
          Authorization:
            "Basic " + btoa(this.$store.state.auth.token + ":" + "whatever"),
        },
      };
      console.log(data);
      this.$http
        .put("http://127.0.0.1:5000/profile", data, headerObj)
        .then((response) => {
          console.log(response);
        }),
        (error) => {
          console.log(error);
          alert("an error occurred");
        };
    },
  },
};

</script>

<style scoped>

#flash {
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  background-color: greenyellow;
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  z-index: 10;
}

</style>
