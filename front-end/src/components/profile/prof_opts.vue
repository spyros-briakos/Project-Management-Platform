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
                        <button v-for="opt in this.opts" :key="opt.id" :class="{'opt_btn':true,
                                                                                'pressed': selected_id==opt.id
                                                                                }"
                            v-on:click="selected_id=opt.id">
                            {{opt.title}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="prof_display">
                <profProjects v-if="selected_id == 1" />
                <profSettings v-else-if="selected_id == 3" />            
            </div>
        </div>
    </div>
</template>

<script>
    import profSettings from "./prof_settings.vue";
    import profProjects from "./prof_projects.vue";

    export default {
    name: "ProfOpts",
    data() {
        return{
            def: 'prof_default.svg',
            selected_id: 3,
            name: "Vasilis Goulas",
            opts:[
                {id: 1, title: "Τα Projects μου"},
                {id: 2, title: "Οι Συνεργάτες μου"},
                {id: 3, title: "Ρυθμίσεις Λογαρισμού"},
                {id: 4, title: "Αναβάθμιση"},
                {id: 5, title: "Αποσύνδεση"}
            ],
        }
    },
    components:{
        profSettings,
        profProjects,
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_opts.css";
</style>
