import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';
import store from './store/store';
import User from '@/pages/app/master/user';
import Usergroup from '@/pages/app/master/usergroup';

Vue.use(Router);

var routes = [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/error',
        name: 'Error',
        component: ErrorPage,
        meta: { requiresAuth: true }
      },
      {
        path: '/app',
        name: 'Layout',
        component: Layout,
        children: [
          {
            path: 'dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: { requiresAuth: true }
          },
          {
            path: '/app/master/user',
            name: 'User',
            // component:  () => import("@/pages/app/master/user"),
            component : User,
            meta: { requiresAuth: true }
          },
          {
            path: '/app/master/usergroup',
            name: 'User Group',
            component : Usergroup,
            meta: { requiresAuth: true }
          }
        ],
      },
      {
        path: '*',
        name: 'Layout',
        component: Layout,
        meta: { requiresAuth: true }
      },
  ];

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.isAuth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth) {
      next();
    } else {
      next({ name: 'Login' });  
    }
  } else {
    next();
  }
});

export default router