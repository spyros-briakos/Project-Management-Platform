<template>
    <div class="wrap_coworkers">
             
        <div class="mytitle">
            <font-awesome-icon class="icon" :icon="['fas', 'thumbtack']" />
            {{welcome_mssg + ' ' + this.coWorkers.length}}

        </div>

        <ul class="coworkers_ul">
            <li v-for="person in this.coWorkers" :key="person._id"
                v-on:click="mpou()"
                :style="{
                    'background-color' : color_roulete(),
                }">

                <font-awesome-icon class="icon" :icon="['far', 'user']"/>
                {{person.username}}

            </li>
        </ul>
    </div>

</template>

<script>
    import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { mapGetters } from "vuex"

    library.add(faThumbtack);

    
    export default {
    name: "profCoWorkers",
    data(){
        return{
            welcome_mssg: "Οι Συνεργάτες μου:",
        }
    },
    props:{
        // coWorkers: Array,
    },
    methods:{
        mpou(){
            alert('O KALYTEROS SYNARGATHS TOU KOSMOU');
            alert('GIA EMENA');
            alert('EISAI ESYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY');
        },
        color_roulete(){
            let c_arr=["red", "orange", "lightblue", "plum", "green", "purple"];
            return c_arr[Math.floor(Math.random() * c_arr.length)];
        }
    },
    computed:{
        ...mapGetters({
		    coWorkers: "coWorkers",
	    }),  
    },
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_coworkers.css";
</style>
