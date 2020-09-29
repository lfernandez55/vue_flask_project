<template>
  <div class="row">
    <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
      <h1>User profile</h1>

      <form action="" method="POST" class="form" role="form">
        <div class="form-group  ">
          <label for="first_name" class="control-label">First name</label>
          <input
            class="form-control"
            id="first_name"
            name="first_name"
            required
            tabindex="10"
            type="text"
            value="Admin"
          />
        </div>
        <div class="form-group  ">
          <label for="last_name" class="control-label">Last name</label>
          <input
            class="form-control"
            id="last_name"
            name="last_name"
            required
            tabindex="20"
            type="text"
            value="Example"
          />
        </div>
        <input
          type="submit"
          name="submit"
          class="btn btn-default btn-primary"
          value="Update"
          tabindex="30"
        />
      </form>
      <!-- 

        <p><a href="/user/change-password">Change password</a></p>
    
        </div> -->
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
          .get("api/token", headerObj)
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              console.log(data);
              if (data.token) {
                //this.$emit("authenticated", true);
                this.$router.replace({ name: "secure" });
                this.$store.dispatch("setToken", data.token);
              }
            }
          })
          .catch((err) => {
            if (err.body.error == "Unauthorized access") {
              this.msg = err.body.error;
            } else {
              console.log("Error: " + err.message);
            }
          });
      } else {
        this.msg = "A username and password must be present";
        console.log("A username and password must be present");
      }
    },
  },
};
</script>

<style scoped>

</style>
