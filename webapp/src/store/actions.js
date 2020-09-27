//ToDo: Import vue and name it Vue
import Vue from 'vue'

export const loadData = ({ commit }) => {
  Vue.http.get('data.json')
    .then(response => response.json())
    .then(data => {
      if (data) {
        const stocks = data.stocks;
        const funds = data.funds;
        const stockPortfolio = data.stockPortfolio
        const portfolio = {
            stockPortfolio: stockPortfolio,
            funds: funds
        }
        commit('SET_STOCKS',stocks)
        commit('SET_PORTFOLIO',portfolio)
      }
    });
};

// export const loadUserData = ({ commit },token) => {
//   console.log("in actions.js", token)
//   let headerObj = {
//     headers: {
//       "Content-Type": "text/plain",
//       Authorization:
//         "Basic " + btoa(token + ":" + "whatever"),
//     },
//   };
//   Vue.http
//     .get("api/account", headerObj)
//     .then((response) => response.json())
//     .then((resp) => {
//       if (resp) {
//         console.log("in actions.jsxxxx", resp)
//         commit('SET_ACCOUNT',resp)
//       }
//     })
//     .catch((err) => {
//       alert("In actions.js error thrown: " + err)
//     });
// };
