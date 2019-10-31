import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import lodash from './mixins/lodash';
import * as VueGoogleMaps from 'vue2-google-maps';
import moment from 'moment'

Vue.config.productionTip = false;
const mixins = [lodash];
mixins.forEach((mixin) => Vue.mixin(mixin));

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_KEY_API,
    libraries: 'places',
  },
});
Vue.use(moment)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
