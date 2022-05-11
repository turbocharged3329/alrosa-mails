import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import VueFileAgent from 'vue-file-agent';
// eslint-disable-next-line no-unused-vars
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css';
import moment from 'moment';

Vue.prototype.moment = moment

Vue.use(VueFileAgent);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')
