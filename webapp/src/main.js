import Vue from "vue";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import App from "./App.vue";
import { routes } from "./routes.js";
import { store } from "./store/store.js";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

// Note: The following dependencies will be installed automatically when 
// npm install is run because they are listed as dependencies in package.json
// however, initially they were installed manually like so: 
//npm install --save vuex (for state management)
//npm install --save vue-router (vue does not have a bundled router)
//npm install --save vue-resource  (for requesting data from server)

// both of these are used.  The first by vue resource, the second by all fetch
// statements in actions
Vue.http.options.root = "http://127.0.0.1:5000";
Vue.prototype.$hostname = 'http://localhost:5000'

Vue.filter("currency", (value) => {
  return value.toLocaleString();
});

const router = new VueRouter({
  mode: "history",
  routes,
});

// this checks the router meta each time the route changes and performs auth checks
router.beforeEach((to, from, next) => {
  // console.log('beforeEach', to, from, next)
  if (to.meta.requiredRoles){
    const found = to.meta.requiredRoles.some(r=> store.state.auth.roles.includes(r))
    if ( found == true){
      next()
    }else{
      next({ name: 'warning' })
    }
  }else{
    next()
  }
})


new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
