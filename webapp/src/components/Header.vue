<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- <transition name="slide" mode="out-in"> -->
      <transition 
      enter-active-class="animate__animated animate__fadeIn animate__slow"
      leave-active-class="animate__animated animate__fadeOut animate__slow"
      >  
        <div id="flash" v-show="this.$store.state.general.flashMessage != ''"   v-bind:class="classObject" role="alert">
            <!-- {{ this.$store.state.general.flashMessage }} -->
            {{msg}}
        </div>
      </transition>
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Flask App</router-link>
      </div>
      <!-- {{$store.state.general.flashMessage}}
      {{this.$store.state.general.fetchStatus}} -->
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
      msg: ""
    };
  },
  computed: {
    classObject: function () {
      return {
        'alert': true,
        'alert-success': this.$store.state.general.fetchStatus == "success",
        'alert-danger': this.$store.state.general.fetchStatus == "danger" ||
        (this.$store.state.general.fetchStatus != "success" 
        && this.$store.state.general.fetchStatus != "danger" 
        && this.$store.state.general.fetchStatus != "info"),
        'alert-info': this.$store.state.general.fetchStatus == "info"
      }
    }
  },
  // this is needed for the fade effect
  watch: {
    "$store.state.general.flashMessage"(newVar ) {
              if (newVar == ""){
                setTimeout(function(){
                    this.msg=newVar;
                },1000);
              }
              else{
                this.msg=newVar;
              }
    },
  }, 
  methods: {
    logOut: function() {
      this.$store.dispatch("setToken", "");
    },
    profile: function() {
      this.$router.replace({ name: "profile" });
    }
  },
};

</script>

<style scoped>

#flash {
  text-align: center;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
  /* background-color: greenyellow;
  border-radius: 10px; */
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  z-index: 10;

}

</style>
