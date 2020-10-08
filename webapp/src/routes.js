// import Home from './components/Home.vue'
import Portfolio from './components/portfolio/Portfolio.vue'
import Stocks from './components/stocks/Stocks.vue'
import Login from './components/public/Login.vue'
import Secure from './components/secure/Secure.vue'
import Profile from './components/profile/Profile.vue'
import Debug from './components/public/Debug.vue'

export const routes = [
  {path: '/', component: Login, name: 'login',meta: {
    breadcrumb: [
      { name: 'Home' }
    ]
  }},
  {path: '/portfolio', component: Portfolio, name: 'portfolio'},
  {path: '/stocks', component: Stocks, name: 'stocks'},
  {path: '/login', component: Login, name: 'login'},
  {path: '/secure', component: Secure, name: 'secure',      meta: {
    breadcrumb: [
      { name: 'Home', link: '/' },
      { name: 'Secure' }
    ]
  }},
  {path: '/profile', component: Profile, name: 'profile',      meta: {
    breadcrumb: [
      { name: 'Home', link: '/' },
      { name: 'Profile' }
    ]
  }},
  {path: '/debug', component: Debug, name: 'debug'}
];