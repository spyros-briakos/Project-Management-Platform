<template>
    <div class="wrap_projects">
        <div class="mytitle">
            <font-awesome-icon class="icon" :icon="['fas', 'thumbtack']" />
            {{welcome_mssg}}
        </div>
        <button class="create_btn" v-on:click="mpou()">{{btn_mssg}}</button>
        
        <ul class="projects_ul">
            <li v-for="project in projects" :key="project.id"
                v-on:click="mpou()">
                <div class="icon" :style="{
                    'background-color' : color_roulete(),
                }"></div>
                <div class="projectTitle">
                    {{project.title}}
                </div>
                <div class="partners_box">
                    <div class="partner" v-for="partner in project.partners" :key="partner">
                        <font-awesome-icon class="icon" :icon="['far', 'user']"
                            :style="{
                                'background-color' : color_roulete(),
                            }">
                        </font-awesome-icon>

                        <div class="fullname">
                            {{partner}}
                        </div>
                        
                        <div class="mytxt">
                            {{partner[0]}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    <router-view></router-view>
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
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 2,
                    title: "CNN's Implementation",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 3,
                    title: "Mini JS Compiler",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 4,
                    title: "LSH HyperCube Algorithms",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 5,
                    title: "Variational Autoencoders",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 6,
                    title: "Redesign Eudoxus Website",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
                },

                {
                    id: 7,
                    title: "Best DI Team Implementation",
                    partners: [
                        'Mike','Spyros','Dion','Andreas','Mery','Aleksandra',
                    ],
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
