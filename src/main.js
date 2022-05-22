import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import VueFileAgent from 'vue-file-agent';
// eslint-disable-next-line no-unused-vars
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import moment from 'moment';
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import VueIframe from 'vue-iframes'
import 'bootstrap/dist/css/bootstrap.css';
import { VueSpinners } from '@saeris/vue-spinners'

Vue.prototype.moment = moment

Vue.use(VueIframe)
Vue.use(VueSpinners)
Vue.use(VueFileAgent);
Vue.use(VModal)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
