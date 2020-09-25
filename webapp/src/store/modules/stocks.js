import stocksImport from '../../data/stocks';

const state = {stocks:[]}

const mutations ={
  SET_STOCKS: function(state, stocks){
    state.stocks=stocks;
  },
  RND_STOCKS: function(state){
    state.stocks.forEach((stock)=>{
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5))
    })
  },
  BUY_STOCKx: function(state, order){
    const record = state.stocks.find(element => element.id == order.stockId);
    if (record){
      record.quantity += order.quantity;
    }else{
      let newRecord = {}
      newRecord.id = order.stockId;
      newRecord.quantity = order.quantity
      state.stocks.push(newRecord)
    }
  }
}

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK', order);
  },
  initStocks: ({ commit }) => {
    commit('SET_STOCKS', stocksImport);
  },
  randomizeStocks: ({ commit }) => {
    commit('RND_STOCKS');
  },

};

const getters = {
  stocks: (state)=>{
    return state.stocks
  }
}

export default {
  state, mutations, actions, getters
};
