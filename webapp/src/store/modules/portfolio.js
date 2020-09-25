const state = {
  funds: 10000,
  stocks: []
}

const mutations = {
  BUY_STOCK: function(state, order){
    const record = state.stocks.find(element => element.id == order.stockId);
    if (record){
      record.quantity += order.quantity;
    }else{
      let newRecord = {}
      newRecord.id = order.stockId;
      newRecord.quantity = order.quantity
      state.stocks.push(newRecord)
    }
    state.funds -= order.stockPrice * order.quantity;
  },
SELL_STOCK: function(state, order){
  const record = state.stocks.find(element => element.id == order.stockId);
  if (record){
    record.quantity -= order.quantity;
  }else{
    state.stocks.splice(state.stocks.indexOf(record), 1)
  }
  state.funds += order.stockPrice * order.quantity;
},
SET_PORTFOLIO: function(state, portfolio){
  state.funds = portfolio.funds
  portfolio.stockPortfolio ? state.stocks = portfolio.stockPortfolio : []

},
SET_FUNDS: function(state, amount){
  // used for demo purposes only in footer
  state.funds = amount
}
}



//ToDo: Create const called actions that is a data object()
//ToDo: Create sellStock that passes ({commit}, order)
//  ToDo: Use the commit method passing 'SELL_STOCK' and order
const actions = {
  sellStock: ({commit}, order) => {
      commit('SELL_STOCK', order)  // this means run the mutation method named 'increment'
      // eslint-disable-next-line no-console
      console.log("in the sellstock action method in store/modules/porfolio.js", order)
  },
  setFunds: ({commit}, amount) => {
    commit('SET_FUNDS', amount)  
    // eslint-disable-next-line no-console
    console.log("this action used for demo purposes only")
}
}

//ToDo: Create const called getters that is a data object{}
//ToDo: Inside getters object create stockPortfolio method that takes two parameters (state, getters)
//ToDo: return state.stocks.map() that is a pointer function that passes stock
//ToDo: Create const called record that is equal to getters.stocks.find(element => element.id == stock.id)
//ToDo: Return an object
  //ToDo: Set id to stock.id
  //ToDo: Set quantity to stock.quantity
  //ToDo: Set name to record.name
  //ToDo: Set price to record.price
const getters = {
  stockPortfolio: (state, getters) => {
    return state.stocks.map(stock => {
      const record = getters.stocks.find(element => element.id == stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price,
      }
    })
  },
  //luke's note:  the getterStockPortfolio goes through all of the stocks in 
  //this module.  Those stocks are an array of elements with id and quantity. The array isn't
  // the stock exchanges total list of stocks.  It's just the list of stocks that are in the
  // portfolio of the user who is using the app.
  //This method adds the stock name and stock price to each of the stock elements that are in
  //the user's portfolio.  It gets
  // the name and price by using getters.stocks to retrieve the stocks array
  // that are in the exchange.  The confusing thing is that the state has two stocks
  // variables.  One is created in stocks.js and one here in porfolio.js.  To differentiate
  // them I might call one stockExchange_stocks and personalPorfolio_stocks.  To do this
  // well one might resort to name spacing.

  //ToDo: Create funds method that passes state
  //ToDo: Return state.funds
  funds: state => {
    return state.funds
  }
}

export default {
  //ToDo: Export the const state, mutations, actions, and getters
  //state, 
  mutations, state, getters, actions
}
