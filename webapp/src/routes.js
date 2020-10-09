import Login from './components/public/Login.vue'
import Home from './components/secure/Home.vue'
import Profile from './components/profile/Profile.vue'
import Debug from './components/public/Debug.vue'

export const routes = [
  {path: '/', component: Home, name: 'home',meta: {
    breadcrumb: [
      { name: 'Home' }
    ]
  }},
   {path: '/login', component: Login, name: 'login'},
  {path: '/profile', component: Profile, name: 'profile',      meta: {
    breadcrumb: [
      { name: 'Home', link: '/' },
      { name: 'Profile' }
    ]
  }},
  {path: '/debug', component: Debug, name: 'debug'}
];


// export const routes = [
//   {path: '/', component: Login, name: 'login',meta: {
//     breadcrumb: [
//       { name: 'Home' }
//     ]
//   }},
//   {path: '/portfolio', component: Portfolio, name: 'portfolio'},
//   {path: '/stocks', component: Stocks, name: 'stocks'},
//   {path: '/login', component: Login, name: 'login'},
//   {path: '/secure', component: Secure, name: 'secure',      meta: {
//     breadcrumb: [
//       { name: 'Home', link: '/' },
//       { name: 'Secure' }
//     ]
//   }},
//   {path: '/profile', component: Profile, name: 'profile',      meta: {
//     breadcrumb: [
//       { name: 'Home', link: '/' },
//       { name: 'Profile' }
//     ]
//   }},
//   {path: '/debug', component: Debug, name: 'debug'}
// ];