<template>
    <span>
        <v-toolbar app color="#7dc2ad" dark>
            <router-link to="/">
                <v-toolbar-title class= "purple--text" data-cy="titleBtn">{{
                    appTitle
                }}</v-toolbar-title>
            </router-link>
            <template v-for="(item,index) in items">
                <template v-if="index <= 1">
                    <v-btn :key="index" :to="item.url" plain> {{ item.title }} </v-btn>
                </template>
                <template v-else>
                    <v-btn :key="index" :to="item.url" fixed right color=#FF914D> {{ item.title }} </v-btn>
                </template>
            </template>
        </v-toolbar>
    </span> 
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            appTitle: 'ScruManiac',
            drawer: false,
            outlined: true,
            plain: true,
            fixed: true, 
            right:true,
            
            items: [
                { title: 'Πώς δουλέυει', url: '/how_it_works' },
                { title: 'Τιμές', url: '/prices' },
                { title: 'Σύνδεση', url: '/signin'}
            ]
        };
    }
};
</script>

<style>
a {
    color: white;
    text-decoration: none;
}
.v-btn {
  text-transform:none !important;
}
</style>