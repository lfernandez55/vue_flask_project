<template>
  <div>
    <div v-for="stock in stocks" :key="stock.id">
      <app-stock :stock="stock"></app-stock>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Stock from './Stock.vue'

export default {
  computed: {
    ...mapGetters({stocks: 'stockPortfolio'})
  },
  components: {
    appStock: Stock
  }
}
</script>