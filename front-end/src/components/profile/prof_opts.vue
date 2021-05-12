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
                                v-on:click="selected_id=opt.id,seturl(opt.path)">
                            <img class="icon" :src="require('../../assets/img/' + opt.svg + '')">
                            {{opt.title}}
                        </button>
                    </div>
                </div>
            </div>

            <div class="prof_display">
                <!-- <createProject :readonly="true" :user="name" :coWorkers="getCoWorkers" v-if="selected_id==1"/>  -->
                <prof-projects :coWorkers="getCoWorkers" :user="name" v-if="selected_id == 1"/>
                <profCoWorkers :coWorkers="getCoWorkers" v-if="selected_id == 2" />
                <profSettings v-if="selected_id == 3" />
                <Prices v-if="selected_id == 4" />
                <profLogout v-if="selected_id == 5" />
            </div>
        </div>
    </div>
</template>

<script>
    import router from "../../router/index.js";
    
    import profSettings from "./prof_settings.vue";
    import profProjects from "./prof_projects.vue";
    import Prices from "../pricing/Prices.vue";
    import profCoWorkers from "./prof_coworkers.vue";
    import profLogout from "./prof_logout.vue";


    export default {
    name: "ProfOpts",
    data() {
        // this.seturl("profSettings");
        return{
            def: 'prof_default.svg',
            selected_id: 3,
            name: "Vasilis Goulas",
            opts:[
                {id: 1, title: "Τα Projects μου", path:"myProjects", svg: "project_default.svg"},
                {id: 2, title: "Οι Συνεργάτες μου", path:"coWorkers", svg: "people.svg"},
                {id: 3, title: "Ρυθμίσεις Λογαρισμού", path:"profSettings", svg: "settings.svg"},
                {id: 4, title: "Αναβάθμιση", path:"Upgrade", svg: "upgrade.svg"},
                {id: 5, title: "Αποσύνδεση", path:"profLogout", svg: "exit.svg"},
            ],
        }
    },
    components:{
        profSettings,
        profProjects,
        Prices,
        profCoWorkers,
        profLogout,
    },
    methods:{
        mpou(opt){
            alert('url(' + this.route + opt + ')');
        },
        seturl(path){
            router.push({ name: path}).catch(()=>{});
        }
    },
    computed:{
        getCoWorkers(){
            return [
                {id: 1, name: "Christina Evaggelou"},
                {id: 2, name: "Giwrgos Raptis"},
                {id: 3, name: "Melina Papadioti"},
                {id: 4, name: "Antonis Mourat"},
                {id: 5, name: "Vasilis Mpimis"},
                {id: 6, name: "Eleni Masoura"},
                {id: 7, name: "Rafail Musaj"},
                {id: 8, name: "Chris Baziotis"},
                {id: 9, name: "Panos Perdikos"},
            ]
        }
    },
    watch: {
        $route(to) {
            if(to.name == 'myProjects')
                this.selected_id = 1;
            else if(to.name == 'coWorkers')
                this.selected_id = 2;
            else if(to.name == 'profSettings')
                this.selected_id = 3;
            else if(to.name == 'Upgrade')
                this.selected_id = 4;
            else if(to.name == 'profLogout')
                this.selected_id = 5;
        }   
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_opts.css";
</style>
