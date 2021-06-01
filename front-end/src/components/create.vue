<template>
    <div class="createWiz_wrap">

        <div class="wizTitle">
            Δημιουργία{{' '+ name}}
        </div>

        <div class="wizSub">
            {{mssg}}
        </div>

        <v-form class="wrap_form">
            <v-text-field class="mycont" v-for="input in input_fields" :key="input.name"
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

            <v-radio-group class="type_wrap" v-for="choose in choose_fields" :key="choose.name"
                :label="choose.name"
                mandatory
                >

                <v-radio v-for="opt in choose.opts" :key="opt.val"
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
                        <v-text-field
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

                <v-autocomplete
                    class="friends_picker"
                    multiple
                    chips
                    :label="get_friends.label"
                    :items="get_friends.people"
                    item-text="name"
                    itme-value="id"
                    :placeholder="get_friends.placeholder"
                    :hint="get_friends.hint"
                    :search-input.sync="get_friends.search"
                    clearable
                    :menu-props="{maxHeight: 150}"
                    >
                </v-autocomplete>

            <v-btn type="submit" class="create_btn">
                Δημιουργία
            </v-btn>

        </v-form>
    </div>
</template>


<script>
export default({
    name: "createProject",
    
    data(){
        return{
            dates: ['2021-01-01','2022-02-02'],
            menu:false,
            main_rules:[
                v => !!v || 'Αναγκαίο Πεδίο'
            ],
            radio_rules:[
                v => !!v || 'skata'
            ],
            name:'Project',
            mssg:'Συμπλήρωσε τα πεδία',
            input_fields:[
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
                    value:this.user,
                    readonly:true,
                },
                {
                    name:'Product Owner',
                    key:'productOwner',
                    value:this.user,
                    readonly: true,
                },
            ],
            choose_fields:[
                {
                    name:'Τύπος Project',
                    opts:[
                        {id:0, val:'Απλό', hint: 'test'},
                        {id:1, val:'Προνομιούχο', hint: 'test2', mssg:"Χρειάζεσαι Προνομιούχο Λογαριασμό για αυτήν την επιλογή", disabled:this.isPremium ? false : true}
                    ],
                    key:'prj_type',
                },
            ],
            get_friends:{
                people: this.coWorkers,
                search: null,
                label: 'Διάλεξε τους Συνεργάτες σου',
                placeholder: 'best Teammates',
                hint: 'Διάλεξε μερικούς απο τους παλιούς συνεργάτες σου ή προσκάλεσε νέους!'
            }

        }
    },
    props:{
        user:String,
        isPremium:{
            type:Boolean,
            default:false,
        },
        coWorkers: Array,
    },
    methos:{
        find(val){
            alert(val);
            this.get_friends.people.push(val);
            return val;
        }
    },
    computed:{
        getNames(){
            let names = [];
            for(let person in this.coWorkers)
                names.push(person.name);
            return names;
        },
        datesRange(){
            return this.dates.join(' ~ ');
        }
        
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
