<template>
  <div id="login">
    <h1>Login</h1>
    <h4>{{msg}}</h4>
    <h5>
        Token: {{this.$store.state.auth.token}}
    </h5>
    
    <input type="text" v-model="input.username" placeholder="Username" />
    <input type="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
     </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        username: "lfernandez",
        password: "white",
      },
      msg:""
    };
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        let headerObj = {
          headers: {
            "Content-Type": "text/plain",
            Authorization:
              "Basic " + btoa(this.input.username + ":" + this.input.password),
          },
        };
        this.$http
          .get("http://127.0.0.1:5000/api/token", headerObj)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              console.log(data);
              if (data.token){
                    //this.$emit("authenticated", true);
                    this.$router.replace({ name: "secure" }); 
                    this.$store.dispatch('setToken',data.token)
              }
            }
          })
          .catch((err) => {
            if (err.body.error == "Unauthorized access") {
                this.msg = err.body.error
            }else{
                console.log("Error: " + err.message);
            }
          });
      } else {
        this.msg = "A username and password must be present";
        console.log("A username and password must be present");
      }
    }
  },
};
</script>

<style scoped>
#login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
h4{color: red;}
</style>
