<template>
<div id="app">
    <p>{{ greeting }}</p>
    <p>{{ flaskGreeting }}</p>
    <p>authenticated: {{authenticated}}</p>
    aaaaa<div id="nav">
        <!-- <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logoutxxx</router-link>  -->
        
        <router-link  v-show="authenticated"  to="/logout" v-on:click.native="logout()" >Logout</router-link> 
    </div>dddddddd
    <router-view @authenticated="setAuthenticated" />
    <hello-world></hello-world>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    data: function(){
        return {
            greeting: 'Hello, Vue!',
            flaskGreeting: "",
            authenticated: false,
            mockAccount: {
                username: "aaa",
                password: "bbb"
            }
        }
    },
    // mounted() {
    //     if(!this.authenticated) {
    //         this.$router.replace({ name: "login" });
    //     }
    // },
    methods: {
        setAuthenticated(status) {
            this.authenticated = status;
        },
        logout() {
            this.authenticated = false;
        }
    },
    watch: {
      authenticated: function(){
        if (this.authenticated == false){
          this.$router.replace({ name: "login" });
        }
        
      }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/greeting");
        const gObject = await gResponse.json();
        this.flaskGreeting = gObject.greeting;
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>