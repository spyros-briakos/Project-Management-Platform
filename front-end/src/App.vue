<template>

  <v-app id="app">

    <app-navigation v-if="!['SignIn','SignUp','ForgotPassword'].includes($route.name)"></app-navigation>
    
    <AppHeader v-if="['dashboard','task-board'].includes($route.name)"></AppHeader>
     
    <!-- <transition name="page" mode="out-in" v-if="['dashboard','task-board'].includes($route.name)">
      <router-view></router-view>
    </transition> 

    <v-content transition="slide-x-transition" v-if="!['dashboard','task-board'].includes($route.name)"> 
      <router-view></router-view>
    </v-content>   -->

    <v-content transition="slide-x-transition"> 
      <router-view></router-view>
    </v-content>   
  
    <AppLoadingIndicator v-if="['dashboard','task-board'].includes($route.name)"></AppLoadingIndicator>

    <myFooter v-if="!['SignIn','SignUp','profile','profSettings','coWorkers','myProjects','Upgrade','ForgotPassword','Projects','Roadmap','Chart', 'Comments','History', 'dashboard','task-board', 'Kanban'].includes($route.name)"></myFooter>
  
  </v-app>

</template>

<script>
import AppNavigation from "./components/AppNavigation.vue"
import myFooter from "./components/homepage/footer.vue"
import AppHeader from "./components/Project/Scrumboard/AppHeader"
import AppLoadingIndicator from "./components/Project/Scrumboard/AppLoadingIndicator"
import { mapGetters } from "vuex"

export default {
  name: "App",
  components: {
      AppNavigation,
      myFooter,
      AppHeader,
      AppLoadingIndicator
  },  
  beforeCreate() {
    this.$store.dispatch("fetchData")
  },
  computed: {
    ...mapGetters({
      isLoading: "isLoading"
    })
  }

};
</script>

<style>
  .v-main__wrap.v-content__wrap{
    position:static;
  }
  @import url(/assets/css/main.css);

body {
  background-color: rgba(72, 163, 184, 0.05) !important;
}
/* .page {
  height: 1000px;
} */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

