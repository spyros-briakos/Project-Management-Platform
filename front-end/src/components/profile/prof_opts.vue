<template>
    <div>
        <div class="wrap">
            <div class="big_wrap">

                <div class="opts_wrap">
                    <div class="pict_wrap">
                        <img class="prof_pict" :src="img ? require(img) : require('../../assets/img/' + def_img + '')">
                        <!-- <button class="design" v-on:click="$('.file-upload-input')"> -->
                        <div class="design">
                            <input type="file" @change="uploadImg"/>
                        </div>
                <!-- <v-file-input
                    class="design"
                    accept="image/png, image/jpeg, image/bmp"
                    label=""
                ></v-file-input> -->
                        <!-- </button> -->
                    </div>
                    <div class="name">
                        {{Name}}
                    </div>
                    <div class="prof_opts">
                        <button v-for="opt in this.opts" :key="opt.id"
                                :class="{'opt_btn':true,
                                        'pressed': selected_id==opt.id
                                        }"
                                v-on:click="selected_id=opt.id,seturl(opt.path)">
                            <img class="icon" :src="require('../../assets/img/' + opt.svg + '')">
                            {{opt.title}}
                            <div v-if="opt.id==1">
                                <font-awesome-icon v-if="existNewInvs()" class="icon icon_notify" :icon="['fas', 'bell']"/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div class="prof_display">
                <prof-projects v-bind:seen="invites.seen_invites" v-on:update-seen="updateSeen($event)" :coWorkers="coWorkers" :invites="invites.inv_list" :user="name" v-if="selected_id == 1"/>
                <profCoWorkers :coWorkers="coWorkers" v-if="selected_id == 2" />
                <profSettings :Info="perInfo" v-if="selected_id == 3" />
                <profUpgrade v-if="selected_id == 4" />
                <profLogout v-if="selected_id == 5" />
            </div>
        </div>
    </div>
</template>

<script>
    import router from "../../router/index.js";
    
    import profSettings from "./prof_settings.vue";
    import profProjects from "./prof_projects.vue";
    import profUpgrade from "./prof_upgrade.vue"
    import profCoWorkers from "./prof_coworkers.vue";
    import profLogout from "./prof_logout.vue";
    import { mapActions, mapGetters } from "vuex";

    export default {
    name: "ProfOpts",
    data() {
        return{
            img: '',
            def_img: 'prof_default.svg',
            selected_id: this.correct_selected(),
            name: "Vasilis Goulas",
            opts:[
                {id: 1, title: "Τα Projects μου", path:"myProjects", svg: "project_default.svg"},
                {id: 2, title: "Οι Συνεργάτες μου", path:"coWorkers", svg: "people.svg"},
                {id: 3, title: "Ρυθμίσεις Λογαρισμού", path:"profSettings", svg: "settings.svg"},
                {id: 4, title: "Αναβάθμιση", path:"Upgrade", svg: "upgrade.svg"},
                {id: 5, title: "Αποσύνδεση", path:"profLogout", svg: "exit.svg"},
            ],
            invites:{
                inv_list: this.getInvites(),
                seen_invites: '',
            },
            coWorkers: this.getCoWorkers(),
            perInfo: this.personalInfo(),
        }
    },
    components:{
        profSettings,
        profProjects,
        // Prices,
        profUpgrade,
        profCoWorkers,
        profLogout,
    },
    created() {
        this.getUser()        
    },
    computed:{
        ...mapGetters({
		    isLogedIn: "isLogedIn",
		    firstName: "firstName",
		    Name: "name",
		    lastName: "lastName",
		    userName: "userName",
		    email: "email",
		    image: "image",
	    }),
    },
    methods:{
        ...mapActions(["getUser"]),
        correct_selected(){
            let cur = this.$route.path;
            if(cur == "/profile" || cur == "/profile/settings")
                return 3;
            else if(cur == "/profile/myProjects")
                return 1;
            else if(cur == "/profile/co_workers")
                return 2;
            else if(cur == "/profile/upgrade")
                return 4;
            else if(cur == "/profile/profLogout")
                return 5;
            else
                return 3;
        },
        mpou(opt){
            alert('url(' + this.route + opt + ')');
        },
        seturl(path){
            router.push({ name: path}).catch(()=>{});
        },
        new_invite(){
            let invites = this.getInvites();
            for (let invite of invites) {
                if( invite.seen == 0){
                    return 1;
                }
            }
            return 0;
        },
        getInvites(){
            return[
                {title: 'test Invite 1', from: 'SOYVLAKIA O MPAMPHS', date: '23-2-2021', seen: 1},
                {title: 'test Invite 2', from: 'SOYVLAKIA O MPAMPHS', date: '23-2-2021', seen: 1},
                {title: 'test Invite 3', from: 'SOYVLAKIA O MPAMPHS', date: '23-2-2021', seen: 0},
            ]
        },
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
        },
        updateSeen(title){
            for(let inv of this.invites.inv_list){
                if(inv.title == title){
                    inv.seen = 1;
                }
            }
        },
        existNewInvs(){
            for(let inv of this.invites.inv_list){
                if(inv.seen == 0){
                    return true;
                }
            }
            return false;
        },
        uploadImg(data){
            const image = data.target.files[0];
            const reader = new FileReader();

            reader.readAsDataURL(image);
            reader.onload = data =>{
                this.img = data.target.result;
                console.log(this.previewImage);
            };
            alert(image);
        },
        personalInfo(){
            return[
                {tag: 'name', val: 'Vasilis Goulas'},
                {tag: 'email', val: 'vasGoul@mplampla.com'},
                {tag: 'password', val: '123456789'},
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
    @import "../../assets/css/profile/prof_opts.css";
</style>
