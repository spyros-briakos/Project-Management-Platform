import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Prices from "../components/pricing/Prices.vue";
import Projects from "../components/Project/Projects.vue";
import Roadmap from "../components/Project/Roadmap.vue";
import Comments from "../components/Project/Comments.vue";
import History from "../components/Project/History.vue";
import Kanban from "../components/Project/Kanban.vue";
import Scrumboard from "../components/Project/Scrumboard.vue";
import Chart from "../components/Project/Chart.vue";
import SignIn from "../components/Sign/SignIn.vue";
import SignUp from "../components/Sign/SignUp.vue";
import ForgotPassword from "../components/Sign/ForgotPassword.vue";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "../assets/scss/vue-sidebar-menu.scss";
// import "custom-var.scss"
import HowItWorks from "../components/HowItWorks/howItWorks.vue";
import ProfOpts from "../components/profile/prof_opts.vue";
    import profSettings from "../components/profile/prof_settings.vue";
    import profProjects from "../components/profile/prof_projects.vue";
    import profCoWorkers from "../components/profile/prof_coworkers.vue";


Vue.use(VueRouter);
Vue.use(VueSidebarMenu);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/how_it_works",
    name: "How_It_Works",
    component: HowItWorks,
  },
  {
    path: "/prices",
    name: "Prices",
    component: Prices,
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects,
    children: [
      {
        path: "scrumboard",
        name: "Scrumboard",
        component: Scrumboard,
      },
      {
        path: "roadmap",
        name: "Roadmap",
        component: Roadmap,
      },
      {
        path: "kanban",
        name: "Kanban",
        component: Kanban,
      },
      {
        path: "chart",
        name: "Chart",
        component: Chart,
      },
      {
        path: "comments",
        name: "Comments",
        component: Comments,
      },
      {
        path: "history",
        name: "History",
        component: History,
      },
    ],
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
  {
    path: "/profile",
    name: "profile",
    component: ProfOpts,
    children:[
      {
        path: "settings",
        name: "profSettings",
        component: profSettings,
      },
      {
        path: "myProjects",
        name: "myProjects",
        component: profProjects,
      },
      {
        path: "upgrade",
        name: "Upgrade",
        component: Prices,
      },
      {
        path: "co_workers",
        name: "coWorkers",
        component: profCoWorkers,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
