<template>
  <span>
    <!-- <v-toolbar id="header" app color="#FAFFFF" dark> -->
    <v-toolbar id="header" color="#FAFFFF" dark>
    <!-- <v-toolbar id="header" app color="var(--light_green)" dark> -->
      <router-link  v-if="!isLogedIn" to="/">
        <v-toolbar-title :to="appurl" class="purple--text" data-cy="titleBtn">
          {{ appTitle }}
        </v-toolbar-title>
      </router-link>
      <router-link v-else to="/profile">
        <v-toolbar-title :to="appurl" class="purple--text" data-cy="titleBtn">
          {{ appTitle }}
        </v-toolbar-title>
      </router-link>
      <template v-for="(item, index) in items">
        <template v-if="index <= 3" >
          <v-btn :key="index" :to="item.url" :style="{'display': hide_opts(item.title) ? 'none' : '', 'pointer-events': disable_project(item.title) ? 'none' : ''}" plain> {{ item.title }} </v-btn>
        </template>
        <template v-else>
          <v-btn :key="index" :to="item.url" :style="{'display': hide_sign() ? 'none' : ''}" fixed right color="#FF914D">
            {{ item.title }}
          </v-btn>
        </template>
      </template>
    </v-toolbar>
    <div class="space" id="placeholder"></div>
    </span>
</template>

<script>

  import {mapGetters} from "vuex";

  export default {
    name: "AppNavigation",
    data() {
      return {
        appTitle: "ScruManiac",
        appurl: "/",
        drawer: false,
        outlined: true,
        plain: true,
        fixed: true,
        right: true,

        items: [
          { title: "Profile", url: "/profile" },
          { title: "Project", url: "/projects" },
          { title: "Πώς δουλεύει", url: "/how_it_works" },
          { title: "Τιμές", url: "/prices" },
          { title: "Σύνδεση", url: "/sign/in" },
        ],
      };
    },
    computed:{
      ...mapGetters({
        isLogedIn: "isLogedIn",
        project: "project"
      }),
    },
    methods:{
      hide_opts(val){
        let hide_beforelogedIn = ['Project', 'Profile'];
        let hide_onlogedIn = ['Πώς δουλεύει', 'Τιμές'];
        if ((hide_beforelogedIn.includes(val) && !this.isLogedIn) || (hide_onlogedIn.includes(val) && this.isLogedIn))
          return true;
        return false;
      },
      hide_sign(){
        if(this.isLogedIn)
          return true;
        else
          return false;
      },
      disable_project(title) {
        return title === 'Project' && (!this.project || !this.project._id)
      }
    }
  };
</script>

<style>
.v-btn {
  text-transform: none !important;
}
.v-btn__content{
  color: #000000 !important;
}
</style>
