<template>
  <div id="login">
    <div class="row">
      <div class="col-sm-3 col-md-3 col-lg-3 col-centered"></div>
      <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
        <h2>Login</h2>

        <h4>{{ msg }}</h4>
        <div class="form-group  ">
          <label for="login" class="control-label">Login name</label>

          <input
            class="form-control"
            id="login"
            type="text"
            v-model="input.username"
            placeholder="Username"
          />
        </div>
        <div class="form-group  ">
          <label for="password" id="password" class="control-label"
            >Password</label
          >

          <input
            class="form-control"
            type="password"
            v-model="input.password"
            placeholder="Password"
          />
        </div>

        <button
          class="btn btn-default btn-primary"
          type="button"
          v-on:click="login()"
        >
          Login
        </button>
      </div>
    </div>
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
      msg: "",
    };
  },
  watch: {
    "$store.state.auth.token"(value) {
      if (value != "") {
        // this.$store.state.general.fetchStatus = "";
        this.$router.replace({ name: "secure" });
      }
    },
  },
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        this.$store.dispatch("login", this.input);
        // let headerObj = {
        //   headers: {
        //     "Content-Type": "text/plain",
        //     Authorization:
        //       "Basic " + btoa(this.input.username + ":" + this.input.password),
        //   },
        // };
        // this.$http
        //   .get("api/token", headerObj)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     if (data) {
        //       console.log(data);
        //       if (data.token) {
        //         //this.$emit("authenticated", true);
        //         this.$router.replace({ name: "secure" });
        //         this.$store.dispatch("setToken", data.token);
        //       }
        //     }
        //   })
        //   .catch((err) => {
        //     if (err.body.error == "Unauthorized access") {
        //       this.msg = err.body.error;
        //     } else {
        //       console.log("Error: " + err.message);
        //     }
        //   });
      } else {
        this.msg = "A username and password must be present";
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<style scoped>
/* #login {
  width: 500px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
}
h4 {
  color: red;
} */
</style>
