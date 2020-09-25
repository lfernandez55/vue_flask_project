<template >
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">  
          {{stock.name}} 
          <small>{{stock.price}}</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model.number="quantity"
            v-bind:class="{ danger: insufficientFunds }"
          >
        </div>
        <div class="pull-right">
          <button class="btn btn-success" @click="buyStock" v-bind:disabled="insufficientFunds || quantity <= 0 || !Number.isInteger(quantity) ">
            {{ insufficientFunds ? 'Not Enough' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.danger {
  border: 1px solid red;
}
</style>

<script>
export default {
  props: ['stock'],

  data () {
    return {
      quantity: 0
    }
  },
  computed: {
    funds: function () {
      return this.$store.getters.funds;
    },
    insufficientFunds: function () {
      return this.quantity * this.stock.price > this.funds
    }
  },
  methods: {
    buyStock: function (){
      const order = {};
      order.stockId = this.stock.id;
      order.stockPrice = this.stock.price;
      order.quantity = this.quantity;
      this.$store.dispatch('buyStock',order)
      this.quantity = 0;
    }
  }
}
</script>