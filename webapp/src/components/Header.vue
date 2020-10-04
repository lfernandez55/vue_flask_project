<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <transition name="slide" mode="out-in">
        <div id="flash" v-show="this.$store.state.general.flashMessage != ''">
          {{this.$store.state.general.flashMessage}}
        </div>
      </transition>
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Flask App</router-link>
      </div>
      <div @click="hideMe">Hide ME</div>
       <!-- {{$store.state.general.flashMessage}}  -->
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/secure" active-class="active"
            ><a>Secure</a></router-link
          >
        </ul>
        <strong class="navbar-text navbar-right"
          >Funds: ${{ funds | currency }}
        </strong>
        <ul class="nav navbar-nav navbar-right">
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="profile">{{ this.$store.state.auth.email }}</a>
          </li>
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="logOut">Logout</a>
          </li>

          <li
            class="dropdown "
            :class="{ open: isDropdownOpen }"
            @click="isDropdownOpen = !isDropdownOpen"
          >
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >Save & Load <span class="caret"></span
            ></a>
            <ul class="dropdown-menu">
              <li><a href="#" @click="saveData">Save Data</a></li>
              <li><a href="#" @click="loadData">Load Data</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      isDropdownOpen: false,
      flashMessage: ""
    };
  },
  computed: {
    funds: function() {
      return this.$store.getters.funds;
    },
  },
  // watch: {
  //   // "$store.state.auth.flashMessage"(value) {
  //   //   if (value != ""){
  //   //     this.flashMessage = value;
  //   //     console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  //   //   }
  //   // },
  //   // $route (){
  //   //   this.$store.state.auth.flashMessage = "";
  //   //   console.log("Diddle dee, dar");
  //   // }
  // },
  methods: {
    ...mapActions({
      randomizeStocks: "randomizeStocks",
      fetchData: "loadData",
    }),
    hideMe: function() {
      this.flashMessage = ""
    },
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
      // this.$http.put('https://web2630stocktrader-d7e4e.firebaseio.com/data.json', data)
      this.$http
        .put("http://127.0.0.1:5000/profile", data, headerObj)
        .then((response) => {
          // eslint-disable-next-line no-console
          console.log(response);
        }),
        (error) => {
          // eslint-disable-next-line no-console
          console.log(error);
          alert("an error occurred");
        };
    },
    loadData: function() {
      this.fetchData();
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

  /* -moz-animation: cssAnimation 0s ease-in 5s forwards;
  -webkit-animation: cssAnimation 0s ease-in 5s forwards;
  -o-animation: cssAnimation 0s ease-in 5s forwards;
  animation: cssAnimation 0s ease-in 5s forwards;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards; */
}
/* @keyframes cssAnimation {
  to {
    width: 0;
    height: 0;
    overflow: hidden;
  }
}
@-webkit-keyframes cssAnimation {
  to {
    width: 0;
    height: 0;
    visibility: hidden;
  }
} */
</style>
