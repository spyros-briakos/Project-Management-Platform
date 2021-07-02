import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Prices from "../components/pricing/Prices.vue";
import Projects from "../components/Project/Projects.vue";
import Roadmap from "../components/Project/Roadmap.vue";
import History from "../components/Project/History.vue";
import Settings from "../components/Project/Settings.vue";
import Kanban from "../components/Project/Kanban.vue";
import TaskBoard from "../components/Project/Scrumboard/TaskBoard.vue";
import Chart from "../components/Project/Chart.vue";
import SignIn from "../components/Sign/SignIn.vue";
import SignUp from "../components/Sign/SignUp.vue";
import ForgotPassword from "../components/Sign/ForgotPassword.vue";
import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import "../assets/scss/vue-sidebar-menu.scss";
import HowItWorks from "../components/HowItWorks/howItWorks.vue";
import ProfOpts from "../components/profile/prof_opts.vue";
import profSettings from "../components/profile/prof_settings.vue";
import profProjects from "../components/profile/prof_projects.vue";
import profCoWorkers from "../components/profile/prof_coworkers.vue";
import profLogout from "../components/profile/prof_logout.vue";
import profUpgrade from "../components/profile/prof_upgrade.vue"
// import "custom-var.scss"

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
    redirect:"/projects/boards/SCRUM_BOARD",
    name: "Projects",
    component: Projects,
    children: [
      {
        path: "boards/:id",
        // redirect:"/projects/boards/SCRUM_BOARD",
        name: "Task-board",
        component: TaskBoard
      },
      {
        path: "roadmap",
        name: "Roadmap",
        component: Roadmap,
      },
      {
        path: "kanban",
        redirect:"/projects/boards/KANBAN_BOARD",
        name: "Kanban",
        component: Kanban,
      },
      {
        path: "chart",
        name: "Chart",
        component: Chart,
      },
      {
        path: "history",
        name: "History",
        component: History,
      },
      {
        path: "settings",
        name: "Settings",
        component: Settings,
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
    // redirect:"/profile/settings",
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
        component: profUpgrade,
      },
      {
        path: "co_workers",
        name: "coWorkers",
        component: profCoWorkers,
      },
      {
        path: "profLogout",
        name: "profLogout",
        component: profLogout,
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
