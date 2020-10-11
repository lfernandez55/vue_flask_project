<template>
  <div id="admin">
    <h1>Users Component</h1>
    <!-- {{this.$store.state.admin.users}} -->
    <ul class="list-group">
      <li v-for="user in this.$store.state.admin.users" :key="user.id">
          {{ user.firstname }} {{ user.lastname }} {{ user.email }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
    };
  },
  mounted: function() {
    // this.$store.dispatch("loadAccountData");
    this.$store.dispatch("getUsers");
    // setTimeout(()=>{this.$store.dispatch("getUsers3")},2000)
  },
  methods: {},
};
</script>

<style scoped>

</style>