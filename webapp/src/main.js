//ToDo: Import vue and name it Vue
import Vue from "vue";
//ToDo: Import vue-router and name it VueRouter
import VueRouter from "vue-router";
//ToDo: Import vue-resource and name it VueResource
import VueResource from "vue-resource";

//ToDo: Import App.vue and name it App
import App from "./App.vue";
//ToDo: Import routes.js and use the {} passing routes
import { routes } from "./routes.js";
//ToDo: Import store/store.js and name it store
import { store } from "./store/store.js";

Vue.config.productionTip = false;

//ToDo Initialize VueRouter using Vue.use()
Vue.use(VueRouter);
//ToDo Initialize VueResource using Vue.use()
Vue.use(VueResource);

//Note's to self:
//Name of Firebase DB: https://web2630stocktrader-d7e4e.firebaseio.com/
//Installing three libraries:
//npm install --save vuex (for state management)
//npm install --save vue-router (vue does not have a bundled router)
//npm install --save vue-resource  (for requesting data from server)

//Vue.http.options.root = "https://web2630stocktrader-d7e4e.firebaseio.com/"
Vue.http.options.root = "http://127.0.0.1:5000";

Vue.prototype.$hostname = 'http://localhost:5000'

Vue.filter("currency", (value) => {
  return value.toLocaleString();
});

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  console.log("AAAAAAAAAAAAAAAa")
  console.log(to.meta.requiredRoles)
  console.log("BBBBBBBBBBBBBB")
  console.log(store.state.auth.roles)
  console.log("ZZZZZZZZZZZZZzzzzzzz")
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
