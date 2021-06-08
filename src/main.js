import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import vmodal from 'vue-js-modal';
import App from './App.vue';
import { router } from '@/routes';
import { store } from '@/store';
import '@/fontAwesome';

Vue.config.productionTip = false;

Vue.use(vmodal, { dialog: true });
Vue.use(VueCompositionApi);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
