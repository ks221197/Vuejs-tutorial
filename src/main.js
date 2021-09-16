import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store/index'
import * as VeeValidate from "vee-validate";
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(VeeValidate);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(VueCookies)
new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
