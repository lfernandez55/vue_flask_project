<template>
  <div class="container">
    <app-header />
    <div class="row">
      <div class="col-xs-12">
        Authenticated: {{ authenticated }}
        <transition name="slide" mode="out-in">
          <router-view @authenticated="setAuthenticated"></router-view>
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
  created: function() {
    this.$store.dispatch("initStocks");
    this.$store.state.foo = "goo";
  },
  data: function() {
    return {
      authenticated: false,
      mockAccount: {
        username: "aaa",
        password: "bbb",
      },
    };
  },
  methods: {
    setAuthenticated(status) {
      this.authenticated = status;
    },
    logout() {
      this.authenticated = false;
    },
  },
  watch: {
    authenticated: function() {
      if (this.authenticated == false) {
        this.$router.replace({ name: "login" });
      } else {
        this.$router.replace({ name: "secure" });
      }
    },
  },
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
