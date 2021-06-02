import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faChevronDown,
  faChevronUp,
  faSearchPlus,
  faSearchMinus,
  faLocationArrow,
  faSearchLocation,
  faCheck,
  faHistory,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';

library.add(
  faChevronDown,
  faChevronUp,
  faSearchPlus,
  faSearchMinus,
  faLocationArrow,
  faSearchLocation,
  faCheck,
  faHistory,
  faTimes,
);

// fontawesome아이콘을 Vue탬플릿에 사용할 수 있게 등록해 줍니다.
Vue.component('FontAwesomeIcon', FontAwesomeIcon);
