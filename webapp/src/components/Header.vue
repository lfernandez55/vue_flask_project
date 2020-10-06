<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <button @click="tog">debug</button>{{toggle}}
      <!-- <transition name="slide" mode="out-in"> -->
      <!-- <transition name="fade" mode="out-in">  -->
        <div id="flash" v-if="this.$store.state.general.messageTrigger"   v-bind:class="classObject" role="alert">
            {{ this.$store.state.general.flashMessage }}
        </div>
      <!-- </transition> -->
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
      toggle: false
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
    "$store.state.general.messageTrigger"(val) {
        if (val===true){
          setTimeout(()=>this.$store.state.general.messageTrigger=false,5000);
        } 
        
    }

  }, 
  methods: {
    logOut: function() {
      this.$store.dispatch("setToken", "");
    },
    profile: function() {
      this.$router.replace({ name: "profile" });
    },
    tog: function(){
      this.toggle = false;
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

   opacity: 0;
   animation-delay: 1s;
   -webkit-animation: arrowInOut 5s linear forwards;
   animation: arrowInOut 5s linear forwards; 

}

/* .fade-enter-active, .fade-leave-active {
  transition: opacity 1.3s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
} */




/* @-webkit-keyframes arrowInOut {
 0%,100% {opacity: 0;}
 30%, 80% {opacity: 1;}
}
@keyframes arrowInOut {
 0%,100% {opacity: 0;}
 30%, 80% {opacity: 1;}
 }
 */
@keyframes arrowInOut {
  0%   {opacity: 0;}
  30%  {opacity: 1;}
  80%  {opacity: 1;}
  100% {opacity: 0;}
} 

</style>
