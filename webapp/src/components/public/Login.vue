<template>
  <div id="login">
    <h1>Loginz {{ input.username }}</h1>
    <input type="text" v-model="input.username" placeholder="Username" />
    <input type="password" v-model="input.password" placeholder="Password" />
    <button type="button" v-on:click="login()">Login</button>
    <button type="button" v-on:click="login2()">Login2</button>
    <button type="button" v-on:click="login3()">Login3 (fetch)</button>
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
    };
  },
  methods: {
    login() {
      console.log("aaaa");
      console.log(this.input.username);
      console.log("xxx");
      // this.$router.replace({ name: "secure" });
      if (this.input.username != "" && this.input.password != "") {
        if (
          this.input.username == this.$parent.mockAccount.username &&
          this.input.password == this.$parent.mockAccount.password
        ) {
          this.$emit("authenticated", true);
          //this.$router.replace({ name: "secure" });
        } else {
          console.log("The username and / or password is incorrect");
        }
      } else {
        console.log("A username and password must be present");
      }
    },
    login2() {
      //   const postData = {
      //     username: this.input.username,
      //     password: this.input.password,
      //   };
      //   this.$http
      //     .post("/api/token", postData)
      //     .then((response) => response.json())
      //     .then((data) => {
      //       if (data) {
      //         console.log(data);
      //       }
      //       // commit('SET_STOCKS',stocks)
      //       // commit('SET_PORTFOLIO',portfolio)
      //     });

     // ----------------------------------------------------------------------

        let encryptedtVar = btoa(this.input.username + ":" + this.input.password);
        console.log(encryptedtVar);
        let getData =
          "{ headers: {'Content-Type': 'text/plain','Authorization': 'Basic " +
          encryptedtVar +
          "' } }";
        // let xxxgetData = {params: {foo: 'bar'}, headers: {'X-Custom': '...'}}

        let headerObj = {
            headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Basic ' + btoa(this.input.username + ":" + this.input.password)
            }
        }

        console.log("aaaaa");
        console.log(getData);
        console.log("bbbbbbbb");
        this.$http
        .get("http://127.0.0.1:5000/api/token", headerObj)
        //   .get("http://127.0.0.1:5000/greeting", headerObj)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              console.log(data);
            }
          });
    //  -----------------------------------------------------------------------------


    },
    login3(){
      let myCode = btoa(this.input.username + ':' + this.input.password);
      fetch('http://127.0.0.1:5000/api/token', {
        method: 'GET'
        ,
        headers: {
            'Content-Type': 'text/plain',
            'Authorization': 'Basic ' + myCode,
        }
      })
        .then((response) => {
          return response.json();
        })
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => {
          // Code called when an error occurs during the request
          alert("Error: " + err.message);
        });


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
</style>
