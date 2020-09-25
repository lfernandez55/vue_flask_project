<template>
  <nav class="navbar navbar-default" >
    <div class="container-fluid">
        <h5>Access and Change Funds Thru Various Methods (Demo Purposes Only):</h5>
        <a href="#" @click="accessState">Access State Directly (see console)</a> | 
        <a href="#" @click="accessStateGetter">Access State Thru Getter (see console)</a> | 
        <a href="#" @click="changeState">Change State Directly </a> |
        <a href="#" @click="changeStateMutation">Change State Thru Mutation</a> |
        <a href="#" @click="changeStateAction">Change State Thru Action</a>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    funds: function(){
      return this.$store.getters.funds
    }
  },
  methods: {
    accessState: function(){
      // eslint-disable-next-line no-console
      console.log(this.$store.state.stocks);
      // eslint-disable-next-line no-console
      console.log(this.$store.state.portfolio.funds);
    },
    accessStateGetter: function(){
        // eslint-disable-next-line no-console
        console.log("method a", this.$store.getters.funds)
        // the below approach does not work
        // eslint-disable-next-line no-console
        // console.log("method b:", this.$store.getters.portfolio.funds)
    },
    changeState: function(){
      // eslint-disable-next-line no-console
      console.log("Funds changed to 4951 ");
      // eslint-disable-next-line no-console
      this.$store.state.portfolio.funds = 4951;
    },
    changeStateMutation: function(){
        this.$store.commit('SET_FUNDS', 5678)
    },
    changeStateAction: function(){
        this.$store.dispatch('setFunds',1234)
    }
  }
}
</script>
<style scoped>
nav{
    margin-top: 100px;
}
div{
    text-align: center;
}
</style>