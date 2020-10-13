// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

import store from './store/store';
import router from './Routes';
import App from './App';  
import layoutMixin from './mixins/layout';
import Toasted from 'vue-toasted';
import Multiselect from 'vue-multiselect';

Vue.use(BootstrapVue);

Vue.mixin(layoutMixin);

Vue.config.productionTip = false;

Vue.use(Toasted, {duration: 5000});

Vue.component('multiselect', Multiselect);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
