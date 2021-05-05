<template>

  <v-app id="app">
    
    <app-navigation v-if="!['SignIn','SignUp','ForgotPassword'].includes($route.name)"></app-navigation>
    
    <v-content transition="slide-x-transition"> 
      <router-view></router-view>
    </v-content>
    
    <myFooter v-if="!['SignIn','SignUp','ForgotPassword','Profile'].includes($route.name)"></myFooter>

  </v-app>  

</template>

<script>
import AppNavigation from "./components/AppNavigation.vue";
import myFooter from './components/homepage/footer.vue'

export default {
  name: "App",
  components: {
      AppNavigation,
      myFooter
  }
};
</script>

<style>
  .v-main__wrap.v-content__wrap{
    position:static;
  }
  @import url(/assets/css/main.css);
</style>

