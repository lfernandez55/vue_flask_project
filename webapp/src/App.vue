<template>
  <div class="container">
    <app-header />
    <div class="row">
      <div class="col-xs-12">
        <transition name="slide" mode="out-in">
          <router-view ></router-view>
        </transition>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    appHeader: Header,
    appFooter: Footer,
  },
  watch: {
    //see https://stackoverflow.com/questions/54870454/watching-a-vuex-store
    '$store.state.auth.token'(value) {
      if (value == ""){
        this.$router.replace({ name: "login" });
      } else {
        this.$router.replace({ name: "home" });
      }
      },
    '$store.state.general.newRouteRequest'(value) {
      if (value != ""){
        this.$router.replace({ name: value});
        this.$store.commit('CLEAR_NEW_ROUTE_REQ')
      }
      },
  }
};
</script>

<style>
body {
  padding: 30px;
}

.slide-enter {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in 1s ease-out forwards;
  transition: opacity 0.5s;
}

@keyframes slide-in {
  from {
    transform: translateY(-20px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
