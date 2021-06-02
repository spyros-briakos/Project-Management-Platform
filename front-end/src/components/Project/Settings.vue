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
                    
                        <v-card flat  v-if="item.form=='general'">
                            <v-card-subtitle style="display:flex;">Γενικές Ρυθμίσεις</v-card-subtitle>
                            <v-text-field style="width:80%;margin:0 auto 3vh auto;" @change="updateForm(item, elem.key, elem.val)" v-for="elem in item.info" :id="elem.key" :key="elem.key"
                                :label="elem.tag"
                                hide-details="auto"
                                v-model="elem.val"
                                :readonly="elem.key=='type' ? true : false"
                                required>
                                {{elem.val}}
                            </v-text-field>
                        </v-card>

                        <v-card flat v-else-if="item.form=='team'">
                            <v-card flat style="margin-bottom:3vh;">
                                <v-card-subtitle style="display:flex;">Τα Μέλη του Project:</v-card-subtitle>
                                <v-chip-group style="width:80%;margin:0 auto 0 auto;padding:0 10px 0 10px;display:flex;" multiple column>
                                    <v-chip v-for="co in item.info.members" :key="co">
                                        {{co}}
                                    </v-chip>
                                </v-chip-group>
                                <v-btn style="margin-top:2vh;">
                                    Θέλω να αποχωρήσω
                                </v-btn>
                            </v-card>

                            <v-card flat max-width="100%" style="margin:0 auto 0 auto;">
                                <v-card-subtitle style="display:flex;">Προσκάλεσε Νέα Άτομα</v-card-subtitle>
                                <input id="friends" v-model="myform['addCo']">
                                <v-autocomplete style="width:80%;margin:0 auto 0 auto;" @change="updateForm(item, 'CoWorkers', null)" id="getFriends"
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

                        <v-card flat v-else>
                            <v-card-subtitle style="display:flex;">Διαγραφή Project</v-card-subtitle>
                            <v-btn type="submit" x-large color="error" @click="updateForm(item, item.key, '1')">
                                {{item.tag}}
                            </v-btn>
                        </v-card>

                        <v-btn @click="mySubmit()" v-if="item.form!='deletePrj'"
                            :disabled="item.disabled"
                            style="margin-top:3vh;"
                            floating x-large
                            :loading="loading_btn">
                                Ενημέρωση
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
                        disabled: true,
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
                        },
                        disabled: true,
                    },
                    {
                        tab: 'Διαγραφή Project',
                        form: "deletePrj",
                        tag: "Μόνιμη Διαγραφή Project",
                        key: "deletePrj",
                        disabled: true,
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
            updateForm(item, key, val){
                if(key != "CoWorkers")
                    this.myform[key] = val;
                item.disabled=false;
            },
            mySubmit(){ 
                var form = this.createForm();
                form.submit();
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
                console.log(form);
                // console.log(document.forms['prj_form'].elements);
                document.body.appendChild(form);
                return form;
            }
        },
    };
</script>

<style scoped>
    @import "../../assets/css/history.css";
</style>
