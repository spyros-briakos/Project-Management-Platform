<template>
  <span>
    <v-toolbar id="header" app color="var(--light_green)" dark>
      <router-link to="/">
        <v-toolbar-title :to="appurl" class="purple--text" data-cy="titleBtn">{{
          appTitle
        }}</v-toolbar-title>
      </router-link>
      <template v-for="(item, index) in items">
        <template v-if="index <= 1">
          <v-btn :key="index" :to="item.url" plain> {{ item.title }} </v-btn>
        </template>
        <template v-else>
          <v-btn :key="index" :to="item.url" fixed right color="#FF914D">
            {{ item.title }}
          </v-btn>
        </template>
      </template>
    </v-toolbar>
    <div class="space" id="placeholder"></div>
  </span>
</template>

<script>
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
        { title: "Πώς δουλεύει", url: "/how_it_works" },
        { title: "Τιμές", url: "/prices" },
        { title: "Σύνδεση", url: "/sign/in" },
      ],
    };
  },
};
</script>

<style>
.v-btn {
  text-transform: none !important;
}
.v-btn__content{
  color: black !important;
}
</style>
