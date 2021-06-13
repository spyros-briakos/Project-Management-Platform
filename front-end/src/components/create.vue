<template>
    <div class="createWiz_wrap">
        <v-alert
            prominent
            type="success"
            :value="goodAllert"
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

        <div class="wizTitle">
            Δημιουργία{{' '+ name}}
        </div>

        <div class="wizSub">
            {{mssg}}
        </div>

        <v-form id="prj_form" class="wrap_form">
            <v-text-field :id="input.key" class="mycont" v-for="input in input_fields" @change="isValid()" :key="input.name"
                :label="input.name"
                :placeholder="input.placeholder"
                :hint="input.hint"
                :rules="main_rules"
                hide-details="auto"
                :value="input.value"
                :readonly="input.readonly"
                required>
                {{input.name}}
            </v-text-field>

            <v-radio-group :id="choose.key" class="type_wrap" v-for="choose in choose_fields" @change="isValid()" :key="choose.name"
                :label="choose.name"
                mandatory
                >

                <v-radio v-for="opt in choose.opts" :key="opt.val"
                    :id="opt.key"
                    :label="opt.disabled ? opt.val + ' || ' + opt.mssg : opt.val"
                    :value="opt.id"
                    :disabled="opt.disabled">
                </v-radio>

            </v-radio-group>

                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                    >
                        
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field @change="isValid()" id="prDates"
                            class="small"
                            v-model="datesRange"
                            label="Διάρκεια Project"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        >
                        </v-text-field>
                    </template>
                    
                    <v-date-picker
                    v-model="dates"
                    no-title
                    range
                    show-current
                    scrollable
                    >
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn
                        text
                        color="primary"
                        @click="menu = false"
                    >
                        Ακύρωση
                    </v-btn>

                    <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dates)"
                    >
                        OK
                    </v-btn>
                    </v-date-picker>
                </v-menu>

                <v-autocomplete @change="isValid()" id="getFriends"
                    class="friends_picker"
                    :v-model="form_data.autocomplete"
                    multiple
                    chips
                    :label="get_friends.label"
                    :items="get_friends.people"
                    item-text="username"
                    item-value="_id"
                    :placeholder="get_friends.placeholder"
                    :hint="get_friends.hint"
                    :search-input.sync="get_friends.search"
                    clearable
                    :menu-props="{maxHeight: 150}"
                    >
                </v-autocomplete>

            <v-btn class="create_btn" :disabled="invalid" @click="createProject_()">
                Δημιουργία
            </v-btn>

        </v-form>
    </div>
</template>


<script>
import { mapActions, mapGetters } from "vuex"

export default({
    name: "createProject",
    
    data(){
        return{
            form_data:{autocomplete: null,},
            invalid: true,
            dates: ['2021-01-01','2022-02-02'],
            menu:false,
            premiumProject: 0,
            main_rules:[
                v => !!v || 'Αναγκαίο Πεδίο'
            ],
            radio_rules:[
                v => !!v || 'skata'
            ],
            name:'Project',
            mssg:'Συμπλήρωσε τα πεδία',
            goodAllert: false,
            goodAllertMessage: "",
            badAllert: false,
            badAllertMessage: "",
        }
    },
    props:{
        user:String,
        // isPremium:{
        //     type:Boolean,
        //     default:false,
        // },
        // coWorkers: Array,
    },
    methods:{
        ...mapActions(["addProject", "getProject", "inviteUsers", "getProjects"]),
        find(val){
            alert(val);
            this.get_friends.people.push(val);
            return val;
        },
        isValid(){
            if(document.getElementById('prj_form') == undefined)
                return;
            var form = document.getElementById('prj_form').elements;
            for(let i of this.input_fields){
                if(form[i.key].value.length == 0){
                    return;
                }
            }
            this.invalid=false;
        },
        createProject_(){
            var project = {
                name: null,
                description: null,
                plan: null,
                status: "inProgress"
            }
            var elements = document.getElementById("prj_form").elements;
            for(let element of elements){
                if (element.id === "name"){
                    // console.log(element.value)
                    project.name = element.value 
                } else if (element.id === "description"){
                    // console.log(element.value)
                    project.description = element.value
                } else if (element.id === "standardSelector"){
                    // console.log(element.checked)
                    project.plan = element.checked ? "standard" : "premium"
                } else if (element.id === "premiumSelector"){
                    // console.log(element.checked)
                    project.plan = element.checked ? "premium" : "standard"
                } else if (element.id === "prDates"){
                    // console.log(element.value)
                } else if (element.id === "getFriends"){
                    // console.log(element.value)
                    // console.log(element.id)
                }

            }


            this.createProjectAndInvite(project, ["admin2", "admin3"])
            .then( response => {console.log("PROEJECT CREATED"); this.getProjects();})
            

            
        },
        async createProjectAndInvite(project, inviteUsernameList) {
            // create project
            return this.addProject(project)
                // load project
                .then( response => {
                    this.goodAllertMessage += response + " "
                    this.getProject(project.name)
                    // invites
                    .then( response => {this.inviteUsers(inviteUsernameList)
                        .then( response => {                            
                            this.goodAllert = true
                            this.badAllert = false
                            this.goodAllertMessage += response
                        })
                        .catch( error => { 
                            this.badAllert = true
                            this.goodAllert = true
                            this.badAllertMessage = error.response.data.message
                        })
                    })
                    .catch( error => { 
                        this.badAllert = true
                        this.goodAllert = false
                        this.badAllertMessage = error.response.data.message
                    })
                })
                .catch( error => { 
                    this.badAllert = true
                    this.goodAllert = false
                    this.badAllertMessage = error.response.data.message
                })
        },
        addProject_(project) {
            this.addProject(project)
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
    },
    computed:{
        ...mapGetters({
		    isLogedIn: "isLogedIn",
		    Name: "name",
		    userName: "userName",
		    firstName: "firstName",
		    lastName: "lastName",
            isPremium: "isPremium",
            coWorkers: "coWorkers",
            checkPremiumAtProjectCreation: "checkPremiumAtProjectCreation",

	    }),
        getNames(){
            let usernames = [];
            for(let person in this.coWorkers)
                usernames.push(person.username);
            return usernames;
        },
        datesRange(){
            return this.dates.join(' ~ ');
        },

        input_fields(){ return [
            {
                name:'Τίτλος Project',
                key:'name',
                placeholder:'myProject',
                hint:'Έτσι θα βλέπουν όλοι το Project σου!',
                rules:[
                    v => !!v || 'Αναγκαίο Πεδίο'
                ],
            },
            {
                name:'Περιγραφή',
                key:'description',
                placeholder:'Το καλύτερο Project!',
                hint:'Δώσε μια σύντομη περιγραφή για τους στόχους σου!'
            },
            {
                name:'Scru-Master',
                key:'scruMaster',
                value:this.userName,
                readonly:true,
            },
            {
                name:'Product Owner',
                key:'productOwner',
                value:this.userName,
                readonly: true,
            },
        ]},
        choose_fields() { return [
            {
                name:'Τύπος Project',
                opts:[
                    {id:0, key: "standardSelector", val:'Απλό', hint: 'test'},
                    {id:1, key: "premiumSelector", val:'Προνομιούχο', hint: 'test2', mssg:"Χρειάζεσαι Προνομιούχο Λογαριασμό για αυτήν την επιλογή", disabled:!this.isPremium}
                ],
                key:'prj_type',
            },
        ]},
        get_friends() { return {
                people: this.coWorkers,
                search: null,
                label: 'Διάλεξε τους Συνεργάτες σου',
                placeholder: 'best Teammates',
                hint: 'Διάλεξε μερικούς απο τους παλιούς συνεργάτες σου ή προσκάλεσε νέους!',
            }},
    },
    watch:{
        search (val) {
            alert(val);
            this.get_friends.people.push(val);
            // return true
            // Items have already been loaded
            // if (this.items.length > 0) return

            // Items have already been requested
            // if (this.isLoading) return

            // this.isLoading = true


                // EXAMPLE
            // Lazily load input items
            // fetch('https://api.publicapis.org/entries')
            // .then(res => res.json())
            // .then(res => {
            //     const { count, entries } = res
            //     this.count = count
            //     this.entries = entries
            // })
            // .catch(err => {
            //     console.log(err)
            // })
            // .finally(() => (this.isLoading = false))
      },
    }
})
</script>


<style scoped>
    @import "../assets/css/createWiz.css";
</style>
