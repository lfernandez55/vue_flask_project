<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- <transition name="slide" mode="out-in"> -->
      <transition name="fade" > 
        <div id="flash" v-if="this.$store.state.general.displayAlert"   v-bind:class="classObject" role="alert">
            {{ this.$store.state.general.alertMsg }}
        </div>
      </transition>
      <div class="navbar-header">
        <router-link to="/" class="navbar-brand">Vue-Flask App</router-link>
      </div>
      <!-- {{$store.state.general.alertMsg}}
      {{this.$store.state.general.alertType}} -->
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
      toggle: false
    };
  },
  computed: {
    classObject: function () {
      return {
        'alert': true,
        'alert-success': this.$store.state.general.alertType == "success",
        'alert-danger': this.$store.state.general.alertType == "danger" ||
        (this.$store.state.general.alertType != "success" 
        && this.$store.state.general.alertType != "danger" 
        && this.$store.state.general.alertType != "info"),
        'alert-info': this.$store.state.general.alertType == "info"
      }
    }
  },
  // this is needed for the fade effect
  watch: {
    "$store.state.general.displayAlert"(val) {
        if (val===true){
          setTimeout(()=>this.$store.state.general.displayAlert=false,5000);
        } 
        
    }
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
  position: absolute;
  left: 0;
  right: 0;
  top: 40px;
  z-index: 10;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
