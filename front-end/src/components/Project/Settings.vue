<template>
    <div class="history_back">
        <v-card width="80%">
            <v-alert
                prominent
                type="success"
                :value="goodAllert"
                dismissible
                >
                {{ this.goodAllertMessage }}
            </v-alert>

            <v-alert
                type="error"
                :value="badAllert"
                dismissible
                >
                {{ this.badAllertMessage }}
            </v-alert>

            <v-toolbar
                flat
                color="rgb(255, 145, 77)"
            >
                <v-toolbar-title>{{WlcMssg}}</v-toolbar-title>
            </v-toolbar>

            <v-tabs vertical>

                <v-tab v-for="item in menu" :key="item.tab + '_btn'" :disabled="projectProductOwner == undefined ? '':projectProductOwner._id!=_id && item.key=='deletePrj'" style="justify-content:left;">
                    <v-icon left> mdi-account </v-icon>
                    {{item.tab}}
                </v-tab>

                <v-tab-item style="padding-bottom:10px;" v-for="item in menu" :key="item.tab + '_info'">
                
                    <v-card flat  v-if="item.form=='general'">
                        <v-card-subtitle style="display:flex;">Γενικές Ρυθμίσεις</v-card-subtitle>
                        <v-text-field style="width:80%;margin:0 auto 3vh auto;" @change="updateForm(item, elem.key, elem.val)" v-for="elem in item.info" :id="elem.key" :key="elem.key"
                            :label="elem.tag"
                            hide-details="auto"
                            v-model="elem.val"
                            :readonly="'type PO SM'.includes(elem.key)  ? true : projectProductOwner == undefined ? true : projectProductOwner._id==_id ? false : true"
                            required>
                            {{elem.val}}
                        </v-text-field>
                    </v-card>

                    <v-card flat v-else-if="item.form=='team'">
                        <v-card flat style="margin-bottom:3vh;">
                            <v-card-subtitle style="display:flex;">Τα Μέλη του Project:</v-card-subtitle>
                            <v-chip-group style="width:80%;margin:0 auto 0 auto;padding:0 10px 0 10px;display:flex;" multiple column>
                                <v-chip v-for="co in item.info.members" :key="co+'_'+co.username">
                                    {{co.username}}
                                </v-chip>
                            </v-chip-group>
                            <v-btn v-if="projectProductOwner == undefined ? '':projectProductOwner._id!=_id" style="margin-top:2vh;" @click="_leaveProject">
                                Θέλω να αποχωρήσω
                            </v-btn>
                        </v-card>

                        <v-card flat max-width="100%" style="margin:0 auto 0 auto;">
                            <v-card-subtitle style="display:flex;">Προσκάλεσε Νέα Άτομα</v-card-subtitle>
                            <!-- <input id="friends" v-model="myform['addCo']"> -->
                            <v-autocomplete style="width:80%;margin:0 auto 0 auto;" @change="updateForm(item, 'CoWorkers', null)" id="getFriends"
                                class="friends_picker"
                                :disabled="prjRestrictions.membersPerPrj<=projectMembers.length ? true:false"
                                multiple
                                chips
                                label='Προσκάλεσε Νέα Άτομα'
                                :items="filterInvites(item.info.searchedPeople.concat(item.info.CoWorkers))"
                                item-text="username"
                                item-value="username"
                                v-model="myform['addCo']"
                                :search-input.sync="search"
                                cache-items
                                clearable
                                :menu-props="{maxHeight: 150}"
                                >
                            </v-autocomplete>
                        </v-card>
                    </v-card>

                    <v-card flat v-else>
                        <v-card-subtitle style="display:flex;">Διαγραφή Project</v-card-subtitle>
                        <v-btn type="submit" x-large color="error" @click="updateForm(item, item.key, '1'); mySubmit();">
                            {{item.tag}}
                        </v-btn>
                    </v-card>

                    <v-btn @click="mySubmit()" v-if="item.form!='deletePrj'"
                        :disabled="item.disabled"
                        style="margin-top:3vh;"
                        floating x-large
                        :loading="loading_btn">
                            {{item.form=='team' ? 'Πρόσκληση' :'Ενημέρωση'}}
                    </v-btn>

                </v-tab-item>

            </v-tabs>
        <!-- <div>
            {{myform.title}}<br>
            {{myform.descr}}<br>
            {{myform.addCo}}<br>
            {{myform.removeCo}}<br>
            {{myform.deletePrj}}<br>
        </div> -->
        </v-card>
        <router-view></router-view>
    </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex"
import fts from "../../FullTextSearch/fts"
    export default {
        name: "Settings",
        data(){
            return{
                WlcMssg:"Ρυθμίσεις Project",
                loading_btn: false,
                myform:{title:"", descr:"", addCo:"", removeCo:"", deletePrj:""},
                disabled: true,
                goodAllert: false,
                goodAllertMessage: "",
                badAllert: false,
                badAllertMessage: "",
                search:null,
            }
        },
        computed:{
            ...mapGetters({
                isLogedIn: "isLogedIn",
                isPremium: "isPremium",
                coWorkers: "coWorkers",
                checkPremiumAtProjectCreation: "checkPremiumAtProjectCreation",
                projectName: "projectName",
                projectDescription: "projectDescription",
                projectPlan: "projectPlan",
                projectProductOwner: "projectProductOwner",
                projectScrumMaster: "projectScrumMaster",
                projectStatus: "projectStatus",
                projectMembers: "projectMembers",
                prjRestrictions: "prjRestrictions",
                projectProductOwner: "projectProductOwner",
                _id: "_id"
                
            }),
            menu: function() { return [
                    {
                        tab: 'Γενικές Πληροφορίες',
                        form: "general",
                        info: [
                            {key:"title", tag: "Τίτλος Project", val: this.projectName},
                            {key:"descr", tag: "Περιγραφή", val: this.projectDescription},
                            {key:"type", tag: "Τυπος Project", val: this.projectPlan},
                            {key:"PO", tag: "Product Owner", val: this.projectProductOwner!=undefined ? this.projectProductOwner.username : ''},
                            {key:"SM", tag: "Scrum Master", val: this.projectScrumMaster!=undefined ?  this.projectScrumMaster.username : ''},
                            
                        ],
                        disabled: this.disabled,
                    },
                    {
                        tab: 'Η Ομάδα μας',
                        form: "team",
                        info: {
                            // members:["Μιχάλης", "Ανδρέας","Διον", "Αλεξανρα","Σπυρος", "Μεεεεεεεερηηηηηη","Kapoios 1", "Kapoios 2",],
                            members: this.projectMembers,
                            CoWorkers: this.coWorkers==undefined ? [] : this.coWorkers,
                            searchedPeople: [],
                            toAdd:{key:"addCo", arr:[]},
                            toRemove:{key:"removeCo", arr:[]},
                        },
                        disabled: this.disabled,
                    },
                    {
                        tab: 'Διαγραφή Project',
                        form: "deletePrj",
                        tag: "Μόνιμη Διαγραφή Project",
                        key: "deletePrj",
                        disabled: this.disabled,
                    },
                ] },
        },
        methods:{
            ...mapActions(["editProject", "getProject", "inviteUsers", "getProjects", "deleteProject", "leaveProject"]),
            mpou(){
                alert("on-click");
            },
            updateForm(item, key, val){
                if(key != "CoWorkers")
                    this.myform[key] = val;
                item.disabled=false;
                this.disabled = false;
            },
            mySubmit(){ 
                // var form = this.createForm();

                // console.log(form)
                // console.log(this.myform)

                // delete project
                if (this.myform.deletePrj === "1"){
                    this.deleteProject(this.projectName)
                    .then(response => {
                        console.log("PROJECT DELETED")
                        this.$router.push({name:"myProjects"}) 
                    })
                }


                // update project data
                if ((this.myform.title || this.myform.descr) !== "") {
                    var projectData = this.getProjectDataFromForm(this.myform)
                    this.editProject_(projectData);                    
                }

                // invite more people
                // console.log(this.myform['addCo'])
                if (this.myform['addCo'] !== "")
                    this.inviteUsers_(this.myform['addCo'])
 
            },
            getProjectDataFromForm(form){
                var projectData = {
                    name: form.title ? form.title : this.projectName,
                    description: form.descr ? form.descr : this.projectDescription,
                    plan: this.projectPlan,
                    productOwner: this.projectProductOwner,
                    scrumMaster: this.projectScrumMaster,
                    status: this.projectStatuss
                }
                return projectData
            },
            editProject_(projectData) {
                this.editProject(projectData)
                .then( response => {
                    this.goodAllert = true
                    this.badAllert = false
                    this.goodAllertMessage = "Το Project τροποποιήθηκε με επιτυχία."
                })
                .catch( error => { 
                    this.badAllert = true
                    this.goodAllert = false
                    this.badAllertMessage = error.response.data.message
                })
            },

            _leaveProject() {
                this.leaveProject()
                .then( response => {
                    this.goodAllert = true
                    this.badAllert = false
                    this.goodAllertMessage = "Αποχωρίσατε με επιτυχία."
                    this.$router.push({name:"myProjects"}) 
                })
                .catch( error => { 
                    this.badAllert = true
                    this.goodAllert = false
                    this.badAllertMessage = error.response.data.message
                })
            },

            inviteUsers_(inviteUsernameList) {
                this.inviteUsers(inviteUsernameList)
                .then( response => {
                    this.goodAllert = true
                    this.badAllert = false
                    this.goodAllertMessage = response
                })
                .catch( error => { 
                    this.badAllert = true
                    this.goodAllert = false
                    this.badAllertMessage = error.response.data.message
                })
            },

            createForm(){
                var form = document.createElement('form');
                // form.setAttribute('method','post');
                form.setAttribute('name','prjForm');
                
                let Vals=['title', 'descr', 'addCo', 'removeCo', 'deletePrj'];
                for(let i of Vals){
                    var item = document.createElement('input');
                    item.setAttribute('value', this.myform[i]);
                    form.appendChild(item);
                }
                // console.log(form);
                // console.log(document.forms['prj_form'].elements);
                document.body.appendChild(form);
                return form;
            },

            filterInvites(to_be){
                // return to_be;
                if(to_be==undefined || to_be.length==0)
                    return [];
                let final = [];
                for(let user of to_be){
                    for(let i of this.projectMembers){
                        console.log("I:")
                        console.log(i.username);
                        if(i.username != user.username){
                            final.push(user);
                            console.log("User:")
                            console.log(user.username);
                            break;
                        }
                    }
                }
                return final;
            }
        },
        watch:{
            search(val){
                let item;
                for(let m of this.menu){
                    if(m.form=='team'){
                        item = m;
                        break;
                    }
                }
                item.info.searchedPeople = [];
                let found = fts.searchUser(val);
                for(let user of found){
                    item.info.searchedPeople.push(user);
                }
            }
        }
    };
</script>

<style scoped>
    @import "../../assets/css/history.css";
</style>
