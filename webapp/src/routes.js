import Login from './components/public/Login.vue'
import Home from './components/secure/Home.vue'
import Profile from './components/profile/Profile.vue'
import Warning from './components/public/Warning.vue'

import Admin from './components/secure/Admin.vue'
import Member from './components/secure/Member.vue'
import Agent from './components/secure/Agent.vue'

import Users from './components/secure/admin/Users.vue'
import UserEdit from './components/secure/admin/UserEdit.vue'

import Roles from './components/secure/admin/Roles.vue'



export const routes = [
  {
    path: '/', component: Home, name: 'home', meta: {
      breadcrumb: [
        { name: 'Home' }
      ]
    }
  },
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/profile', component: Profile, name: 'profile', meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Profile' }
      ]
    }
  },
  // { path: '/debug', component: Debug, name: 'debug' }, 
  {
    path: '/admin', component: Admin, name: 'admin', meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Admin' }
      ],
      requiredRoles: ['admin']
    },
    redirect: {
      name: 'users'
    },
    children:[
      {
        path: 'users', component: Users, name: 'users', meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Admin', link: '/admin' },
            { name: 'Users' }
          ],
          requiredRoles: ['admin']
        }
      },
      {
        // path: 'users/edit', component: UserEdit, name: 'useredit', meta: {
        path: 'users/edit/:id', component: UserEdit, name: 'useredit', meta: { 
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Admin', link: '/admin' },
            { name: 'Users', link: '/admin/users' },
            { name: 'Edit'},
          ],
          requiredRoles: ['admin']
        }
      },
      {
        path: 'roles', component: Roles, name: 'roles', meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Admin', link: '/admin' },
            { name: 'Roles' }
          ],
          requiredRoles: ['admin']
        }
      }


    ]

  },
  { path: '/member', component: Member, name: 'member' },
  { path: '/agent', component: Agent, name: 'agent' },

  { path: '/unauthorized', component: Warning, name: 'warning' }
];


