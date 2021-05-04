<template>
    <div class="wrapper">
        <div class="display_wrap">
            <div id="opts_wrap" class="options_wrapper">
                <div class="opt_wrap" v-for="option in options_menu" :key="option.id">
                    <div class="option"
                        :style="{
                                'background-color': active_id == option.id ? 'rgba(209, 123, 25, 0.1)' : '',
                                'font-weight': active_id == option.id ? 'bold' : '',
                            }">
                        <div class="opt_id_wrap">
                            <div class="opt_id">
                                {{option.id}}
                            </div>
                        </div>
                        <div class="horiz_line"></div>
                        <button class="opt_btn"
                            v-on:mouseover="hover_id = option.id"
                            v-on:mouseleave="hover_id = -1"
                            v-on:click="toggle(option.id),activesub_id=0">
                            {{option.title}}
                        </button>
                    </div>
                    <div class="sub_wrap" v-if="option.topics.length">
                        <div class="topics_wrap" :id="option.id"
                            :style="{
                                'display': active_id == option.id || hover_id == option.id ? 'flex' : 'none',
                                'height': active_id == option.id || hover_id == option.id ? 'auto' : '0',
                            }"
                            v-on:mouseover="hover_id = option.id"
                            v-on:mouseleave="hover_id = -1"
                            >
                            <div class="topics" v-for="topic in option.topics" :key="topic"
                                v-on:mouseover="hoversub_id = topic"
                                v-on:mouseleave="hoversub_id = 0"
                                :style="{
                                    }">
                                <div class="horiz_line"></div>
                                <button class="opt_btn"
                                    v-on:click="toggle(option.id),activesub_id=topic"
                                    :style="{
                                        'text-decoration': hoversub_id == topic || activesub_id == topic ? 'underline' : 'none',
                                    }">
                                    {{topic}}
                                </button>
                            </div>
                        </div>
                        <div v-if="option.id < options_menu.length" class="vert_line"></div>
                    </div>
                </div>
            </div>
            <div class="content_wrap">
                <div class="txt_wrap" v-for="cont in target_cont" :key="cont.title" >
                    <div class="txt_title">
                        {{cont.mssg.title}}
                    </div>
                    <div class="txt_subt">
                        {{cont.mssg.comment}}
                    </div>
                    
                    <ul>
                        {{cont.opts.title}}
                        <li v-for="opt in cont.opts.list" :key="opt.title">
                            <div class="txt_title"><div class="pict"></div>{{opt.title}}</div>
                            <div class="txt_subt">{{opt.comment}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: "HowItWorks",
    data() {
        return{
            hover_id: 0,
            active_id: 1,
            hoversub_id: 0,
            activesub_id: 0,
            options_menu:[
                {
                    id: 1,
                    title: "Τα Βασικά",
                    content:[
                        {
                            mssg: {title: "Καλώς ήρθατε στο Scru Maniac!", comment: "Αυτός ο οδηγός είναι εδώ για να σε βοηθήσει με τα πρώτα σου βήματα στο ScruManiac. Μπορείς να βρείς περισσότερες πληροφορίες σε κάθε ξεχωριστή ενότητα!"},
                            opts: {title: "Ορίστε τι μπορείς να κάνεις:", list:[
                                                    {title: "Δημιούργησε το πρώτο σου Project!", comment: "Συνδέσου με τον ScruManiac λογαριασμό σου, επίλεξε Projects και έπειτα 'Δημιουργία Project'."},
                                                    {title: "Προσκάλεσε τους συνεργάτες σου, στα Projects σου!", comment: "Προσκάλεσε τους scrum συνεργάτες σου, μέσω των ScrumManiac λογαρισμών τους, και η ομάδα σας είναι έτοιμη!"},
                                                    {title: "Πρόσθεσε User Stories στον Scrum Πίνακα!", comment: "Δημιούργησε μια νέα καρτέλα στον Scrum Πίνακα, ούτως ώστε ο Product Owner να προσθέσει περισσότερα User Stories!"},
                                                    {title: "Έλεγξε τα ανοιχτά προβλήματα που υπάρχουν!", comment: "Στις Αναφορές Μελών, μπορείς να ελέγξεις τα προβλήματα που υπάρχουν σε διάφορα Tasks, με σκοπό να συνδράμεις για να λυθούν και η ομάδα σου να προχωρήσει ακόμα πιο γρήγορα!"},
                                                    {title: "Παρατήρησε τη συνολική πορεία των Sprint σας!", comment: "Στο Ιστορικό μπορείς να παρατηρήσεις πληροφορίες σχετικά με την κατάσταση στην οποία βρίσκεται το κάθε Sprint και να δείς όλη την πρόοδο της ομάδας σου!"},
                                                ]
                            }
                        }
                    ],
                    topics: ["Κάνε την αρχή", "Ξανά"]
                },

                {
                    id: 2,
                    title: "Projects",
                    content:[
                        {
                            mssg: {title: "sub_con0", comment: "mpla"},
                            opts: {title: "mpla", list:[
                                                {title: "mpla", comment: "mpla"}
                                                ]
                            }
                        }
                    ],
                    topics: ["Projects"]
                },

                {
                    id: 3,
                    title: "Πίνακες",
                    content:[
                        {
                            mssg: {title: "sub_con0", comment: "mpla"},
                            opts: {title: "mpla", list:[
                                                {title: "mpla", comment: "mpla"}
                                                ]
                            }
                        }
                    ],
                    topics: ["Scrum Πίνακας", "Kanban Πίνακας", "Πίνακας Ιστορικού", "Πίνακας Πορείας"]
                },

                {
                    id: 4,
                    title: "Διάγραμμα Burndown",
                    content:[
                        {
                            mssg: {title: "sub_con0", comment: "mpla"},
                            opts: {title: "mpla", list:[
                                                {title: "mpla", comment: "mpla"}
                                                ]
                            }
                        }
                    ],
                    topics: ["Το ΔΙΑΓΡΑΜΜΑ ΤΗΣ ΖΩΗΣ ΣΟΥ"]
                },

                {
                    id: 5,
                    title: "Αναφορές Μελών",
                    content:[
                        {
                            mssg: {title: "sub_con0", comment: "mpla"},
                            opts: {title: "mpla", list:[
                                                {title: "mpla", comment: "mpla"}
                                            ]
                            }
                        }
                    ],
                    topics: ["ΠΑΝΤΟΥ ΑΝΑΦΟΡΕΣ"]
                },

                {
                    id: 6,
                    title: "Διαχείριση Ομάδας",
                    content:[
                        {
                            mssg: {title: "sub_con0", comment: "mpla"},
                            opts: {title: "mpla", list:[
                                                {title: "mpla", comment: "mpla"}
                                            ]
                            }
                        }
                    ],
                    topics: ["'ΔΙΑΧΕΙΡΙΣΗ'"]
                },
            ]
        }
    },
    methods: {
        toggle: function (id) {
            this.active_id = id;
            window.scrollTo(0,0);
        }
    },
    computed:{
        target_cont(){
            for(let i = 0; i < this.options_menu.length; i++){
                if( this.options_menu[i].id == this.active_id){
                    return this.options_menu[i].content;
                }
            }
            return null;
        }
    }
};
</script>

<style scoped>
    @import "../../assets/css/how_it_works.css";
</style>
