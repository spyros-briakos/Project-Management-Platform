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
                <div class="divider"></div>
            </div>

            <div v-for="item in menu.items" :key="item.id" class="myflex_row">
                <div class="myflex_item sprint">
                    {{'No'+item.id}}
                </div>
                <div class="myflex_item">
                    {{item.status}}
                </div>
                <div class="myflex_item">
                    <!-- {{item.progress + '%'}} -->
                    <v-progress-linear
                        :color="item.progress== 100 ? 'green' : 'teal'"
                        v-model="item.progress"
                        height="18"
                        :striped="item.progress!=100 ? true : false"
                        rounded
                    >
                    {{item.progress+' %'}}
                    </v-progress-linear>
                </div>
                <div class="myflex_item">
                    {{item.start}}
                </div>
                <div class="myflex_item endDate">
                    {{item.end}}
                </div>
                <div class="myflex_item">
                    {{item.comments}}
                </div>
                <div v-if="item.id != 1" class="divider"></div>
            </div>
        </div>
        <router-view></router-view> 
    </div>
</template>


<script>
    export default {
        name: "History",
        data(){
            return{
                menu:{
                    labels_count: 6,
                    labels:[
                        'Sprint', 'Κατάσταση', 'Πρόοδος', 'Ημ/νια Έναρξης',
                        'Ημ/νια Ολοκλήρωσης', 'Σχόλια',
                    ],
                    items_count: 6,
                    items:[
                        {id: 6, status: 'Ολοκληρώθηκε', progress:'70', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 5, status: 'Ολοκληρώθηκε', progress:'90', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 4, status: 'Ολοκληρώθηκε', progress:'50', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 3, status: 'Ολοκληρώθηκε', progress:'10', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 2, status: 'Ολοκληρώθηκε', progress:'100', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                        {id: 1, status: 'Ολοκληρώθηκε', progress:'100', start:'01/02/20', end:'05/02/20', comments:'Εύκολη και γρήγορη διεκπαιρέωση του αρχικού Sprint'},
                    ],
                }
            }
        },
        methods:{
            mpou(){
                alert("on-click");
            },
        },
    };
</script>

<style scoped>
    @import "../../assets/css/history.css";
</style>
