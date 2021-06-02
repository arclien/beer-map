import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronDown, faChevronUp, faSearchPlus, faSearchMinus, faLocationArrow, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import vmodal from 'vue-js-modal';
import App from './App.vue';
import { router } from '@/routes';
import { store } from '@/store';

Vue.config.productionTip = false;

Vue.use(vmodal, { dialog: true });

library.add(faChevronDown, faChevronUp, faSearchPlus, faSearchMinus, faLocationArrow, faCheck);

// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다.
Vue.component('FontAwesomeIcon', FontAwesomeIcon);

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
