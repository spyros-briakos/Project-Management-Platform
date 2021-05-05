<template>
    <div class="wrap_projects">
        <div class="mytitle">{{welcome_mssg}}</div>
        <button class="create_btn" v-on:click="mpou()">{{btn_mssg}}</button>
        
        <ul class="projects_ul">
            <li v-for="project in projects" :key="project.id"
                v-on:click="mpou()">
                <div class="icon" :style="{
                    'background-color' : color_roulete(),
                }"></div>
                {{project.title}}
            </li>
        </ul>
    </div>

</template>

<script>
    export default {
    name: "profProjects",
    data(){
        return{
            welcome_mssg: "Όλα σου τα Projects:",
            btn_mssg: "Δημιουργία Project",
            projects:[
                {
                    id: 1,
                    title: "Deploy PPO, A2C model",
                    
                },

                {
                    id: 2,
                    title: "CNN's Implementation",
                },

                {
                    id: 3,
                    title: "Mini JS Compiler",
                   
                },

                {
                    id: 4,
                    title: "LSH HyperCube Algorithms",
                   
                },

                {
                    id: 5,
                    title: "Variational Autoencoders",
                   
                },

                {
                    id: 6,
                    title: "Redesign Eudoxus Website",
                   
                },

                {
                    id: 7,
                    title: "Best DI Team Implementation",
                   
                }
            ]
        }
    },
    methods:{
        mpou(){
            alert("on-click");
        },
        color_roulete(){
            let c_arr=["red", "orange", "blue", "yellow", "plum", "green", "purple"];
            return c_arr[Math.floor(Math.random() * c_arr.length)];
        }
    }
};
</script>

<style scoped>
    @import "../../assets/css/prof_projects.css";
</style>
