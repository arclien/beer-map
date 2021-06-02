import Vue from 'vue';
import VueRouter from 'vue-router';
import MapView from '@/views/Map/MapView.vue';

Vue.config.productionTip = false;
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
    ? '/beer-map/'
    : '/',
  routes: [
    {
      path: '/',
      component: MapView,
    },
  ],
});
