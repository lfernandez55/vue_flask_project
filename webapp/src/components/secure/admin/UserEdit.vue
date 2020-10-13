<template>
  <div class="row">
    <div class="col-sm-3 col-md-3 col-lg-3 col-centered"></div>
    <div class="col-sm-7 col-md-6 col-lg-5 col-centered">
      <h2>User Edit </h2>
      <form
        action=""
        method="POST"
        class="form"
        role="form"
        v-on:submit.prevent="update"
      >
        <div class="form-group  ">
          <label for="first_name" class="control-label">First name</label>
          <input
            v-model="user.firstname"
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
            v-model="user.lastname"
            class="form-control"
            id="last_name"
            name="last_name"
            required
            tabindex="20"
            type="text"
            value="Example"
          />
        </div>
        <div class="form-group  ">
          <label for="username" class="control-label">Username</label>
          <input
            v-model="user.username"
            class="form-control"
            id="username"
            name="username"
            required
            tabindex="20"
            type="text"
            value="Example"
          />
        </div>
        <div class="form-group  ">
          <label for="email" class="control-label">Email</label>
          <input
            v-model="user.email"
            class="form-control"
            id="email"
            name="email"
            required
            tabindex="20"
            type="text"
            value="Example"
          />
        </div>
        <div class="form-group  ">
          <label for="password" class="control-label">Password</label>
          <input
            v-model="user.password"
            class="form-control"
            id="password"
            name="password"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    return {
      msg: "",
      user: {},
    };
  },
  methods: {
    // update() {
    //   this.$store.dispatch("updateProfile", this.input);
    // },
  },
  mounted: function() {
    console.log("in mounted", this.$route.params.id)
    let userArray = this.$store.state.admin.users.filter((e)=>{
        if (e.id == this.$route.params.id){
            return e
        }
    })
    this.user = userArray[0]
  }
};
</script>

<style scoped>
form {
  margin: auto;
}

h4 {
  color: red;
}
</style>
