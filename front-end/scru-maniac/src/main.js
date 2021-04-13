import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/main.css";
// import "./quasar";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
<<<<<<< HEAD

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
=======
>>>>>>> 9e23eaae4a2510c0a754aae98b929fb943051001
