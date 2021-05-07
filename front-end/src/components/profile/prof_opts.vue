<template>
    <div>
        <div class="wrap">
            <div class="big_wrap">

                <div class="opts_wrap">
                    <div class="pict_wrap">
                        <img class="prof_pict" :src="require('../../assets/img/' + def + '')">
                        <button class="design">
                        </button>
                    </div>
                    <div class="name">
                        {{name}}
                    </div>
                    <div class="prof_opts">
                        <button v-for="opt in this.opts" :key="opt.id"
                                :class="{'opt_btn':true,
                                        'pressed': selected_id==opt.id
                                        }"
                                v-on:click="selected_id=opt.id;">
                            <!-- <router-link to="/profile/settings">profile/sets</router-link> -->
                            <img class="icon" :src="require('../../assets/img/' + opt.svg + '')">
                            {{opt.title}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="prof_display">
                <prof-projects v-if="selected_id == 1" />
                <profCoWorkers v-if="selected_id == 2" />
                <profSettings v-else-if="selected_id == 3" />
                <Prices v-else-if="selected_id == 4" />
            </div>
        </div>
        <!-- <router-view></router-view> -->
    </div>
</template>

<script>
    import profSettings from "./prof_settings.vue";
    import profProjects from "./prof_projects.vue";
    import Prices from "../pricing/Prices.vue"
    import profCoWorkers from "./prof_coworkers.vue"

    export default {
    name: "ProfOpts",
    data() {
        return{
            def: 'prof_default.svg',
            selected_id: 3,
            name: "Vasilis Goulas",
            opts:[
                {id: 1, title: "Τα Projects μου", svg: "project_default.svg"},
                {id: 2, title: "Οι Συνεργάτες μου", svg: "people.svg"},
                {id: 3, title: "Ρυθμίσεις Λογαρισμού", svg: "settings.svg"},
                {id: 4, title: "Αναβάθμιση", svg: "upgrade.svg"},
                {id: 5, title: "Αποσύνδεση", svg: "exit.svg"},
            ],
        }
    },
    components:{
        profSettings,
        profProjects,
        Prices,
        profCoWorkers,
    },
    methods:{
        mpou(opt){
            alert('url(' + this.route + opt + ')');
        }
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_opts.css";
</style>
