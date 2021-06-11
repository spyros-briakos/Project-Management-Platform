<template>
    <div class="wrap_projects">   
        <div v-if="create_prj==1" class="overlay"></div>
        <div class="create_prj" v-if="create_prj==1">
            <createProject :coWorkers="coWorkers" :user="user" />
            <button class="close_form" v-on:click="create_prj=0">
                <font-awesome-icon class="icon" :icon="['far', 'times-circle']"/>
            </button>
        </div>

        <div class="mytitle">
            <font-awesome-icon class="icon" :icon="['fas', 'thumbtack']"
                :style="{'opacity': create_prj==1 ? '0.6' : ''}"/>
            {{welcome_mssg}}
        </div>
        <button class="create_btn" v-on:click="create_prj=1,selected_prj=-1">{{btn_mssg}}</button>

        <ul class="projects_ul">

            <li v-for="invite in invites" :key="invite.title" :class="{ 'selectedProject' : selected_prj == invite.title}"
                :style="{'opacity': 1}"
                @mouseover="mouse_on(invite.title)"
                @mouseleave="invites_mouse_over=''">

                <div :class="{'projectTitle': true, 'selectedProject' : selected_prj == invite.title}">
                    <font-awesome-icon class="icon" :icon="!invite.icon ? invite.icon=icon_roulete() : invite.icon"
                        :style="{
                            'color' : !invite.color ? invite.color=color_roulete() : invite.color,
                        }"
                    />
                    {{'Πρόσκληση: ' + invite.title}}
                </div>

                <div v-if="!invite.seen" class="notify"></div>
                <font-awesome-icon
                    :class="{'icon_arrow': true, 'rotate': selected_prj == invite.title}"
                    :icon="['fas', 'chevron-right']"
                    @click="selected_prj==invite.title ? selected_prj=-1 : selected_prj=invite.title;"
                    >
                </font-awesome-icon>

                <div :class="{'partners_box': true, 'show_box': selected_prj==invite.title}"
                    :style="{
                        'flex-flow': 'row',
                        'align-items': 'center',
                    }">
                    <div class="prof_progress">
                        {{'Από: ' + invite.from + ' ' + invite.date }}
                    </div>

                    <div class="vert_div"></div>

                    <div class="wrap_partners">
                        <button v-on:click="accept_inv(invite.title)"> 
                            Αποδοχή
                            <font-awesome-icon class="accept" :icon="['far', 'check-circle']"/> 
                        </button>
                        <button v-on:click="reject_inv(invite.title)">
                            Απόρριψη
                            <font-awesome-icon class="ignore" :icon="['far', 'times-circle']"/>
                        </button>
                    </div>
                </div>
            </li>

            <li v-for="project in projects" :key="project._id" :class="{ 'selectedProject' : selected_prj == project._id}">
                
                <div :class="{'projectTitle': true}">
                    <font-awesome-icon class="icon" :icon="!project.icon ? project.icon=icon_roulete() : project.icon"
                    :style="{
                            'color' : !project.color ? project.color=color_roulete() : project.color,
                        }"
                    />
                    {{project.name}}
                </div>

                <font-awesome-icon
                    :class="{'icon_arrow': true, 'rotate': selected_prj == project._id}"
                    :icon="['fas', 'chevron-right']"
                    @click="selected_prj==project._id ? selected_prj=-1 : selected_prj=project._id;"
                    >
                </font-awesome-icon>
                
                <div :class="{'partners_box': true, 'show_box': selected_prj==project._id}">
                    
                    <div class="prof_progress">
                        Κατάσταση:&#9;
                        <v-progress-circular style="margin-left:5px"
                                :rotate="-45"
                                :size="50"
                                :width="4"
                                :value="project.status"
                                color="teal"
                        >
                            {{project.status }}
                        </v-progress-circular>
                    </div>
                    <div class="vert_div"></div>
                    
                    <div class="wrap_partners">
                        <div class="partner" v-for="partner in project.members" :key="project.name+'_'+partner._id">
                            <font-awesome-icon class="icon" :icon="['far', 'user']"
                                :style="{
                                    'background-color' : color_roulete(),
                                }">
                            </font-awesome-icon>

                            <div class="fullname">
                                {{partner.username}}
                            </div>

                            <div class="mytxt">
                                {{partner[0]}}
                            </div>
                        </div>
                    </div>
                </div>
            </li>            
        </ul>
    </div>
</template>

<script>

    import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { mapActions, mapGetters } from "vuex"
    library.add(faChevronRight);

    import createProject from "../create.vue"

    export default {
    name: "profProjects",
    data(){
        return{
            welcome_mssg: "Όλα μου τα Projects:",
            btn_mssg: "Δημιουργία Project",
            create_prj: 0,
            selected_prj: -1,
            invites_mouse_over: '',
            
        }
    },
    created() {
        this.getProjects()        
    },
    methods:{
        ...mapActions(["getProjects"]),
        mpou(){
            alert("on-click");
        },
        color_roulete(){
            let c_arr=["red", "orange", "blue", "darkyellow", "plum", "green", "purple"];
            return c_arr[Math.floor(Math.random() * c_arr.length)];
        },
        icon_roulete(){
            let i_arr=[['fas', 'stream'], ['far', 'chart-bar'], ['fas', 'chart-pie']];
            return i_arr[Math.floor(Math.random() * i_arr.length)];
        }
        ,
        accept_inv(name){
            alert("Accepted: " + name);
        },
        reject_inv(name){
            alert("Rejected: " + name);
        },
        mouse_on(title){
            this.invites_mouse_over=title;
            this.$emit('update-seen', title);
        }
    },
    computed:{
        ...mapGetters({
		    projectsDatabase: "projects",
	    }),

        // print old projects for front debugging without database
        projects: function() { return (this.projectsDatabase === null ? this.projectsTest : this.projectsDatabase ) },

        projectsTest: function() { return [
                {
                    _id: 1,
                    name: "Deploy PPO, A2C model",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 2,
                    name: "CNN's Implementation",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 3,
                    name: "Mini JS Compiler",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 4,
                    name: "LSH HyperCube Algorithms",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 5,
                    name: "Variational Autoencoders",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 6,
                    name: "Redesign Eudoxus Website",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                },

                {
                    _id: 7,
                    name: "Best DI Team Implementation",
                    status: '80%',
                    members: [{_id: "60c0dbd1e5bf5f10e917e0be", username: "Mike"},
                    {_id: "60c0dbd1e5bf5f10e917e0bf", username: "Spyros"},
                    {_id: "60c0dbd1e5bf5f10e917e0bg", username: "Dion"},
                    {_id: "60c0dbd1e5bf5f10e917e0bh", username: "Mery"},
                    {_id: "60c0dbd1e5bf5f10e917e0bi", username: "Andreas"},
                    {_id: "60c0dbd1e5bf5f10e917e0bj", username: "Aleksandra"},],
                }
            ]
        },
    },
    components:{
        createProject,
    },
    props:{
        user:String,
        coWorkers:Array,
        invites:Array,
    }
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_projects.css";
</style>
