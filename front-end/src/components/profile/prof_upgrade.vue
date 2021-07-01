<template>
    <div class="profUpgr_wrap">
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
        
        <div class="mytitle">
            {{wlc_mssg}}
        </div>    
        
        <ul class="features_ul">
            <div class="features" v-for="feat in features" :key="feat">
                {{feat}}
            </div>
        </ul>

        <div class="values_wrap">
            <div class="mssg">
                {{values_mssg}}
            </div>

            <button v-for="val in values" :key="val.id"
                v-on:click="active_plan=val.id"
                :class="{
                    'choose_price': true,
                    'selected' : active_plan == val.id,
                }">
                {{val.tag}}
                    <br>
                {{val.price}} &#8364;
            </button>

            <button class="buy_btn" @click="getPremium_()">
                {{'Αγορά'}}
            </button>

        </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"

    export default {
    name: "profUpgrade",
    data(){
        return{
            wlc_mssg: "Αναβάθμισε τώρα τον λογαριασμό σου και απόλαυσε όλες δυνατότητες του ScruManiac !",
            title: "Εταιρικό",
            active_plan: 0,
            values: [
                { id: 0, tag: "Μηνιαίο", price: "7 " },
                { id: 1, tag: "Ετήσιο", price: "70 " },
            ],
            values_mssg: "Επίλεξε το πρόγραμμα που βολεύει εσένα:",
            features: [
                "Απεριόριστες Ομάδες",
                "3-9 Μέλη ανά Ομάδα",
                "Απεριόριστα Projects",
                "Απεριόριστα Tasks",
                "Διαγράμματα",
                "Αναφορές Χρηστών",
                "Ιστορικό",
                "Διαχείρηση Ομάδας",
            ],
            buttn: { mssg: "Αγορά", link: "#" },
            goodAllert: false,
            goodAllertMessage: "",
            badAllert: false,
            badAllertMessage: "",
        }
    },
    methods:{
        ...mapActions(["getPremium"]),
        getPremium_(){
            this.getPremium( this.active_plan ? "year" : "month" ) 
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
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_upgrade.css";
</style>
