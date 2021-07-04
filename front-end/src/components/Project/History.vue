<template>
    <div class="history_back">
        <div class="history_wrap">
            <div class="myflex_row labels">
                <div v-for="label in menu.labels" :key="label"
                    :class="{'myflex_item': true,
                            'sprint': label=='Sprint',
                            'endDate': label=='Ημ/νια Ολοκλήρωσης',
                            }">
                        {{label}}
                </div>
                <!-- <div class="mydivider"></div> -->

        </div>
        <div class="sprints_wrap">
            <div v-for="item in getHistory()" :key="item.id" class="row_divider_wrap">
                <div class="myflex_row">
                    <div class="myflex_item sprint">
                        {{'No'+item.id}}
                    </div>
                    <div class="myflex_item">
                        {{item.status}}
                    </div>
                    <div class="myflex_item">
                        <!-- {{item.progress + '%'}} -->
                        <!-- <v-progress-linear
                            :color="item.progress== 100 ? 'green' : 'teal'"
                            v-model="item.progress"
                            height="18"
                            :striped="item.progress!=100 ? true : false"
                            rounded
                        >
                        {{item.progress+' %'}}
                        </v-progress-linear> -->

                        <v-progress-circular
                            :rotate="-45"
                            :size="80"
                            :width="15"
                            :value="item.progress"
                            color="teal"
                            >
                                {{ item.progress + '%' }}
                        </v-progress-circular>

                    </div>
                    <!-- <div class="myflex_item">
                        {{item.start}}
                    </div>
                    <div class="myflex_item endDate">
                        {{item.end}}
                    </div> -->
                    <div class="myflex_item">
                        {{item.comments}}
                    </div>
                </div>
                <div v-if="item.id != 1" class="mydivider"></div>
            </div>
        </div>
        </div>
        <router-view></router-view> 
    </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex"
    export default {
        name: "History",
        data(){
            return{
                menu:{
                    labels_count: 6,
                    labels:[
                        'Sprint', 'Κατάσταση', 'Πρόοδος', 'Σχόλια',
                    ],
                    items_count: 6,
                    items:[
                        {id: 6, status: 'Ολοκληρώθηκε', progress:'70', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 5, status: 'Ολοκληρώθηκε', progress:'90', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 4, status: 'Ολοκληρώθηκε', progress:'50', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 3, status: 'Ολοκληρώθηκε', progress:'10', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 2, status: 'Ολοκληρώθηκε', progress:'100', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 1, status: 'Ολοκληρώθηκε', progress:'100', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                    ],
                }
            }
        },
        methods:{
            mpou(){
                alert("on-click");
            },
        },
        // created() {
        //     console.log(this.getHistory())
        // },
        computed: {
            ...mapGetters({
                getHistory: "getHistory",
            }),
        },
    };
</script>

<style scoped>
    @import "../../assets/css/history.css";
</style>
