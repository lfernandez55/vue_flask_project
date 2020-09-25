<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{stock.name}}
                    <small>Price: ${{stock.price}} | Quantity: {{stock.quantity}}</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                            <input
                            type="number"
                            class="form-control"
                            placeholder="Quantity"
                            v-model.number="quantity"
                            v-bind:class="{ danger: insufficientQuantity }"
                            >
                </div>
                <div class="pull-right">
                    <button class="btn btn-success"  @click="sellStock" v-bind:disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity) ">
                        {{ insufficientQuantity ? 'Not Enough' : 'Sell' }}
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
    import {mapActions} from 'vuex'
    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0
            }
        },
        computed: {
            insufficientQuantity: function (){
                return this.quantity > this.stock.quantity
            }
        },
        methods: {
            ...mapActions({placeSellOrder: 'sellStock'}),
            sellStock: function (){
                const order = {};
                order.stockId = this.stock.id;
                order.stockPrice = this.stock.price;
                order.quantity = this.quantity;
                this.placeSellOrder(order)
            }
        }
    }
</script>