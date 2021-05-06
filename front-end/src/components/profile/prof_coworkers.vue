<template>
    <div class="wrap_coworkers">
        <div class="mytitle">{{welcome_mssg}}</div>

        <ul class="coworkers_ul">
            <li v-for="project in projects" :key="project.id"
                v-on:click="mpou()">
                <div class="icon" :style="{
                    'border' : '4px solid ' + color_roulete(),
                }"></div>
                {{project.name}}
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
    name: "profCoWorkers",
    data(){
        return{
            welcome_mssg: "Οι Συνεργάτες σου:",
            projects:[
                {
                    id: 1,
                    name: "Christina Evaggelou",
                    
                },

                {
                    id: 2,
                    name: "Giwrgos Raptis",
                },

                {
                    id: 3,
                    name: "Melina Papadioti",
                   
                },

                {
                    id: 4,
                    name: "Antonis Mourat",
                   
                },

                {
                    id: 5,
                    name: "Vasilis Mpimis",
                   
                },

                {
                    id: 6,
                    name: "Eleni Masoura",
                   
                },

                {
                    id: 7,
                    name: "Rafail Musaj",
                   
                },

                {
                    id: 8,
                    name: "Chris Baziotis",
                   
                },

                {
                    id: 7,
                    name: "Panos Perdikos",
                   
                }
            ]
        }
    },
    methods:{
        mpou(){
            alert('on-click');
        },
        color_roulete(){
            let c_arr=["red", "orange", "blue", "plum", "green", "purple"];
            return c_arr[Math.floor(Math.random() * c_arr.length)];
        }
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_coworkers.css";
</style>
