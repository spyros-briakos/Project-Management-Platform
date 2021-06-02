<template>
    <div class="history_back">
        <v-card width="80%">
            <v-toolbar
                flat
                color="rgb(255, 145, 77)"
            >
                <v-toolbar-title>{{WlcMssg}}</v-toolbar-title>
            </v-toolbar>

            <v-tabs vertical>
                <v-tab v-for="item in menu" :key="item.tab" style="justify-content:left;">
                    <v-icon left> mdi-account </v-icon>
                    {{item.tab}}
                </v-tab>

                <v-tab-item style="padding-bottom:10px;" v-for="item in menu" :key="item.tab + '_info'">
                    <!-- <v-form id="prj_general_form" class="wrap_form"> -->
                        <v-card flat  v-if="item.form=='general'">
                            <v-text-field style="margin-bottom:3vh;" @change="updateForm(elem.key, elem.val)" :id="item.form" v-for="elem in item.info" :key="elem.key"
                                :label="elem.tag"
                                hide-details="auto"
                                v-model="elem.val"
                                :readonly="elem.key=='type' ? true : false"
                                required>
                                {{elem.val}}
                            </v-text-field>
                        </v-card>

                        <v-card flat v-if="item.form=='team'">
                            <v-card flat style="margin-bottom:3vh;">
                                <v-card-subtitle style="display:flex;">Τα Μέλη του Project:</v-card-subtitle>
                                <v-chip-group style="width:80%;margin:0 auto 0 auto;padding:0 10px 0 10px;display:flex;" multiple column>
                                    <v-chip v-for="co in item.info.members" :key="co">
                                        {{co}}
                                    </v-chip>
                                </v-chip-group>
                            </v-card>
                            <v-card flat max-width="100%" style="margin:0 auto 0 auto;">
                                <v-card-subtitle style="display:flex;">Προσκάλεσε Νέα Άτομα</v-card-subtitle>
                                <v-autocomplete style="width:80%;margin:0 auto 0 auto;" id="getFriends"
                                    class="friends_picker"
                                    multiple
                                    chips
                                    label='Προσκάλεσε Νέα Άτομα'
                                    :items="item.info.CoWorkers"
                                    item-text="name"
                                    item-value="id"
                                    v-model="myform['addCo']"
                                    clearable
                                    :menu-props="{maxHeight: 150}"
                                    >
                                </v-autocomplete>
                            </v-card>
                        </v-card>

                        <v-btn style="margin-top:5vh;" floating x-large :loading="loading_btn">
                            Ενημέρωση
                        </v-btn>
                    <!-- </v-form> -->
                </v-tab-item>
            </v-tabs>
        <div>
            {{myform.title}}<br>
            {{myform.descr}}<br>
            {{myform.addCo}}<br>
            {{myform.removeCo}}<br>
            {{myform.deletePrj}}<br>
        </div>
        </v-card>
        <router-view></router-view>
    </div>
</template>


<script>
    export default {
        name: "Settings",
        data(){
            return{
                WlcMssg:"Ρυθμίσεις Project",
                menu:[
                    {
                        tab: 'Γενικές Πληροφορίες',
                        form: "general",
                        info: [
                            {key:"title", tag: "Τίτλος Project", val: "ΤΕΧ_ΛΟΓ"},
                            {key:"descr", tag: "Περιγραφή", val:"ΩΩΩΩΩΩΩΩ αααααα ΕΕΕΕΕΕΕΕΕ"},
                            {key:"type", tag: "Τυπος Project", val: 0},
                        ],
                    },
                    {
                        tab: 'Η Ομάδα μας',
                        form: "team",
                        info: {
                            members:["Μιχάλης", "Ανδρέας","Διον", "Αλεξανρα","Σπυρος", "Μεεεεεεεερηηηηηη","Kapoios 1", "Kapoios 2",],
                            CoWorkers:[
                                {id: 1, name: "Christina Evaggelou"},
                                {id: 2, name: "Giwrgos Raptis"},
                                {id: 3, name: "Melina Papadioti"},
                                {id: 4, name: "Antonis Mourat"},
                                {id: 5, name: "Vasilis Mpimis"},
                                {id: 6, name: "Eleni Masoura"},
                                {id: 7, name: "Rafail Musaj"},
                                {id: 8, name: "Chris Baziotis"},
                                {id: 9, name: "Panos Perdikos"},
                            ],
                            toAdd:{key:"addCo", arr:[]},
                            toRemove:{key:"removeCo", arr:[]},
                        }
                    },
                    {
                        tab: 'Διαγραφή Project',
                        form: "deletePr",
                        info:[
                            {tag: "Μόνιμη Διαγραφή Project", val: ""},
                        ]
                    },
                ],
                loading_btn: false,
                myform:{title:"", descr:"", addCo:"", removeCo:"", deletePrj:""},
            }
        },
        methods:{
            mpou(){
                alert("on-click");
            },
            updateForm(key, val){
                this.myform[key] = val;
            }
        },
    };
</script>

<style scoped>
    @import "../../assets/css/history.css";
</style>
