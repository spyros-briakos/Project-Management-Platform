import Vue from "vue";
import VueRouter from "vue-router";
import HomeBody from "../components/Home.vue";
import Prices from "../components/pricing/Prices.vue";
import How_it_works from "../components/How_it_works.vue";
import SignIn from "../components/Sign/SignIn.vue";
import SignUp from "../components/Sign/SignUp.vue";
import ForgotPassword from "../components/Sign/ForgotPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeBody,
  },
  {
    path: "/how_it_works",
    name: "How it works",
    component: How_it_works,
  },
  {
    path: "/Prices",
    name: "Prices",
    component: Prices,
  },
  {
    path: "/sign/in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign/up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/sign/forgot",
    name: "ForgotPassword",
    component: ForgotPassword,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;