import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu';
import auth from './auth';
import layout from './layout';
Vue.use(Vuex);

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    menu, auth, layout
  },
  state: {
    token   : localStorage.getItem('token'),
    errors  : [],
    dataroutes : []
  },
  getters: {
    isAuth: state => {
        return state.token != "null" && state.token != null;
    },
    getRoutes : state => {
        return state.dataroutes;
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_ERRORS(state, payload) {
      state.errors = payload
    },
    CLEAR_ERRORS(state) {
        state.errors = []
    },
    ASSIGN_DATAROUTES(state, payload) {
      state.dataroutes = payload;
    }
  },
  actions: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },

    SET_ERRORS(state, payload) {

    },

  },
});


export default store;