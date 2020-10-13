<template>
  <div id="admin">
    <!-- {{this.$store.state.admin.users}}  -->
    <div class="text-right top_div">
      <a class="btn btn-default btn-primary" href="">Create User</a>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Roles</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in this.$store.state.admin.users" :key="user.id">
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.roles | roleNames }}</td>

          <td>
            <!-- <router-link to="/admin/users/edit" tag="a"
              ><a>edit</a></router-link
            > -->
            <router-link :to="{ name: 'useredit', params: { id: user.id }}">edit</router-link>
          </td>

          <td><a href="user.id">delete</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {};
  },
  mounted: function() {
    // this.$store.dispatch("loadAccountData");
    this.$store.dispatch("getUsers");
    // setTimeout(()=>{this.$store.dispatch("getUsers3")},2000)
  },
  methods: {},
  filters: {
  roleNames: function (value) {
    let mymap = value.map((obj)=>{
        return obj.name;
    })
    mymap = mymap.join();
    return mymap;
  }
}
};
</script>

<style scoped>
.top_div {
  margin-top: 10px;
}
</style>
