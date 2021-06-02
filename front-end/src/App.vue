<template>

  <v-app id="app">

    <AppNavigation v-if="!['SignIn','SignUp','ForgotPassword'].includes($route.name)"></AppNavigation>
    
    <v-content transition="slide-x-transition" style="background-color: #9bc9bb;"> 
      <router-view></router-view>
    </v-content>   
  
    <LoadingIndicator></LoadingIndicator>

    <myFooter v-if="!['SignIn','SignUp','profile','profSettings','coWorkers','myProjects','Upgrade','ForgotPassword','Projects','Roadmap','Chart', 'Comments','Settings','History','Task-board', 'Kanban'].includes($route.name)"></myFooter>
  
  </v-app>

</template>

<script>
import AppNavigation from "./components/AppNavigation.vue"
import myFooter from "./components/homepage/footer.vue"
import LoadingIndicator from "./components/Project/Scrumboard/LoadingIndicator"
import { mapGetters } from "vuex"

export default {
  name: "App",
  components: {
      AppNavigation,
      myFooter,
      LoadingIndicator
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