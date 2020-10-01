<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Flask App</router-link> 
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/secure" active-class="active"><a>Secure</a></router-link> 
        
        </ul>
        <strong class="navbar-text navbar-right">Funds:
          ${{ funds | currency }}
        </strong>
        <ul class="nav navbar-nav navbar-right">
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="profile">{{ this.$store.state.auth.email }}</a>
          </li>
          <li v-show="this.$store.getters.authenticated">
            <a href="#" @click="logOut">Logout</a>
          </li>

          <li class="dropdown " :class="{ open: isDropdownOpen }" @click="isDropdownOpen = !isDropdownOpen">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Save & Load <span class="caret"></span></a>
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
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      isDropdownOpen: false
    }
  },
  computed: {
    funds: function(){
      return this.$store.getters.funds
    }
  },
  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      fetchData: 'loadData'
    }),

    logOut: function(){
      this.$store.dispatch('setToken',"")
    },
    profile: function(){
      this.$router.replace({ name: "profile" });
    },
    saveData: function(){
      const data = {
        funds:  this.$store.getters.funds,
        stockPortfolio: this.$store.getters.stockPortfolio,
        stocks: this.$store.getters.stocks
      }
      let headerObj = {
        headers: {
          "Content-Type": "text/plain",
          Authorization:
            "Basic " + btoa(this.$store.state.auth.token + ":" + "whatever"),
        }
        
      };
      console.log(data)
      // this.$http.put('https://web2630stocktrader-d7e4e.firebaseio.com/data.json', data)
      this.$http.put('http://127.0.0.1:5000/profile', data, headerObj)
        .then(response =>{
          // eslint-disable-next-line no-console
          console.log(response)
        }), error => {
          // eslint-disable-next-line no-console
          console.log(error)
          alert("an error occurred")
        }
    },
    loadData: function(){
      this.fetchData()
    }
  }
}
</script>