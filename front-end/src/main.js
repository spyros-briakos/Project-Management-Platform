import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
import VeeValidate from 'vee-validate';
// import "quasar";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { faStream } from '@fortawesome/free-solid-svg-icons'
import { faChartBar } from '@fortawesome/free-regular-svg-icons'
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import Gantt from "highcharts/modules/gantt";


// import { Quasar,Notify,Dialog } from 'quasar'
// Vue.use(Quasar, {
//   plugins: {
//     Notify,
//     Dialog
//   },
//   config: {
//     notify: { position: 'center'  }
//   }
// })

import "./assets/app.scss"; 
import "./plugins";
import store from "./store";
import { client, actions } from './modules/restAPI'
// import { client, actions } from '../../rest-api-client/restAPI'

Vue.use(VeeValidate);

Gantt(Highcharts);
Vue.use(HighchartsVue);

library.add(faUserSecret, faUser, faTimesCircle, faCheckCircle, faBell, faChartPie, faChartBar, faStream)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.prototype.$client = client
Vue.prototype.$actions = actions

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

window.onscroll = function () {
  sticky_header();
};
var header = document.getElementById("header");
var holder = document.getElementById("placeholder");

var sticky = header.offsetTop;
holder.style.height = header.offsetHeight + "px";

function sticky_header() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
    holder.style.display = "block";
    holder.style.width = "100%";
  } else {
    header.classList.remove("sticky");
    holder.style.display = "none";
  }
}
