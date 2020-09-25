<template>
  <div>
      <div v-for="stock in stocks" :key="stock.id">
        <app-stock :stock="stock"></app-stock>
      </div>
  </div>
</template>

<script>
import Stock from './Stock.vue'

export default {
  components: {
    appStock: Stock
  },
  computed: {
    stocks: function(){
      return this.$store.getters.stocks
    }

  }
}
</script>