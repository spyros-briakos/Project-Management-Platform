<template>
    <div>
        <div class="wrap">
            <div class="opts_wrap">
                <div class="pict_wrap">
                    <img class="prof_pict" :src="require('../../assets/img/' + def + '')">
                    <button class="design"></button>
                </div>
                <div class="name">
                    {{name}}
                </div>
                <div class="prof_opts">
                    <div class="opt" v-for="opt in this.opts" :key="opt.id">
                        <button class="opt_btn"
                            v-on:click="selected_id=opt.id"
                            :style="{
                                'border': selected_id == opt.id ? '2px solid black' : 'none',
                                'font-weight': selected_id == opt.id ? '600' : '400',
                            }">
                            {{opt.title}}
                        </button>
                    </div>
                </div>
            </div>
            <div class="prof_display">
                <profSettings v-if="selected_id == 3" />            
            </div>
        </div>
    </div>
</template>

<script>
    import profSettings from "./prof_settings.vue";
    
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
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_opts.css";
</style>
