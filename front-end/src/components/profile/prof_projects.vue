<template>
    <div class="wrap_projects">   
        <div v-if="create_prj==1" class="overlay"></div>
        <div class="create_prj" v-if="create_prj==1">
            <createProject v-on:busy-form='create_prj=0' :coWorkers="coWorkers" :user="user" />
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

            <li v-for="invite in invites" :key="invite.invitationCode" :class="{ 'selectedProject' : selected_prj == invite.invitationCode}"
                :style="{'opacity': 1}"
                @mouseover="mouse_on(invite.invitationCode, invite)"
                @mouseleave="invites_mouse_over=''">

                <div :class="{'projectTitle': true, 'selectedProject' : selected_prj == invite.invitationCode}">
                    <font-awesome-icon class="icon" :icon="!invite.icon ? invite.icon=icon_roulete() : invite.icon"
                        :style="{
                            'color' : !invite.color ? invite.color=color_roulete() : invite.color,
                        }"
                    />
                    {{'Πρόσκληση: ' + invite.project}}
                </div>

                <div v-if="!invite.seen" class="notify"></div> 
                <font-awesome-icon
                    :class="{'icon_arrow': true, 'rotate': selected_prj == invite.invitationCode}"
                    :icon="['fas', 'chevron-right']"
                    @click="selected_prj==invite.invitationCode ? selected_prj=-1 : selected_prj=invite.invitationCode;"
                    >
                </font-awesome-icon>

                <div :class="{'partners_box': true, 'show_box': selected_prj==invite.invitationCode}"
                    :style="{
                        'flex-flow': 'row',
                        'align-items': 'center',
                    }">
                    <div class="prof_progress">
                        {{'Από: ' + invite.sender + ' ' + invite.date }}
                    </div>

                    <div class="vert_div"></div>

                    <div class="wrap_partners">
                        <button v-on:click="accept_inv(invite.invitationCode)"> 
                            Αποδοχή
                            <font-awesome-icon class="accept" :icon="['far', 'check-circle']"/> 
                        </button>
                        <button v-on:click="reject_inv(invite.invitationCode)">
                            Απόρριψη
                            <font-awesome-icon class="ignore" :icon="['far', 'times-circle']"/>
                        </button>
                    </div>
                </div>
            </li>

            <li v-for="project in projects" :key="project._id" :class="{ 'selectedProject' : selected_prj == project._id}">
                
                <div :class="{'projectTitle': true}" @click="goToProject(project.name)">
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
                                {{partner.username[0]}}
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
        this.getInvites()
        this.getAllUsers()
    },
    methods:{
        ...mapActions(["getProjects", "getProject", "getInvites", "answerInvitation", "getEmulatedData", "getAllUsers"]),
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
        accept_inv(invitationCode){
            this.answerInvitation({answer: "accept", invitationCode: invitationCode})
            .then( response => {console.log("ACCEPT INVITE"); this.getProjects()})
        },
        reject_inv(invitationCode){
            this.answerInvitation({answer: "reject", invitationCode: invitationCode})
            .then( response => {console.log("REJECT INVITE"); this.getProjects()})
        },
        mouse_on(invitationCode, invite){
            this.invites_mouse_over=invitationCode;
            // invite.seen = 1;
            // this.$emit('update-seen', invitationCode);
            this.$store.commit("UPDATE_SEEN_INVITE", invitationCode);
        },
        goToProject(projectName) {
            this.getProject(projectName)
            .then( response => {this.$router.push({name:"Projects"});}) 
        }
    },
    computed:{
        ...mapGetters({
		    projects: "projects",
            invites: "invites",
	    }),

        // print old projects for front debugging without database
        // projects: function() { return (this.projectsDatabase === null ? this.projectsTest : this.projectsDatabase ) },
    },
    components:{
        createProject,
    },
    props:{
        user:String,
        coWorkers:Array,
        // invites:Array,
    }
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_projects.css";
</style>
