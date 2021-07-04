<template>
  <span>
    <v-toolbar id="header" app color="#FAFFFF" dark>
    <!-- <v-toolbar id="header" app color="var(--light_green)" dark> -->
      <router-link to="/">
        <v-toolbar-title :to="appurl" class="purple--text" data-cy="titleBtn">
          {{ appTitle }}
        </v-toolbar-title>
      </router-link>
      <template v-for="(item, index) in items">
        <template v-if="index <= 3" >
          <v-btn :key="index" :to="item.url" :style="{'display': hide_opts(item.title) ? 'none' : ''}" plain> {{ item.title }} </v-btn>
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
          { title: "Projects", url: "/projects" },
          { title: "Profile", url: "/profile" },
          { title: "Πώς δουλεύει", url: "/how_it_works" },
          { title: "Τιμές", url: "/prices" },
          { title: "Σύνδεση", url: "/sign/in" },
        ],
      };
    },
    computed:{
      ...mapGetters({
        isLogedIn: "isLogedIn",
      }),
    },
    methods:{
      hide_opts(val){
        let to_hide = ['Projects', 'Profile'];
        let to_hide2 = ['How_It_Works', 'Prices'];
        if(to_hide.includes(val) && !this.isLogedIn)
          return true;
        if(to_hide2.includes(val) && this.isLogedIn)
          return true;
        return false;
      },
    hide_sign(){
      if(this.isLogedIn)
        return true;
      else
        return false;
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
