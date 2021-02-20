import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import "./assets/basic.less"

import vueJustgage from 'vue-justgage';
Vue.use(vueJustgage);

//粘贴板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

/*iView*/
import "./assets/iview.css"
//import "iview/dist/styles/iview.css"
import iView from 'iview'
// import "./assets/my-theme/index.less"
Vue.use(iView)
Vue.prototype.$Message.config({
    duration: 2.5
});
/*axios*/
import https from './util/https.js'
Vue.prototype.$https = https;

/*svg.js*/
import svg from 'svg.js'
Vue.prototype.$svg = svg;

// lodasj.s
import _ from 'lodash'
Vue.prototype._ = _

import util from './util/util.js';
Vue.prototype.$util = util;
import api from './util/api.js';
Vue.prototype.$api = api;
import storage from './util/web-storage.js';
Vue.prototype.$storage = storage;

/*mock*/
//require('./mock');

/*echarts*/
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
