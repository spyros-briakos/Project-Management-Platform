<template>
    <div id="Prices" class="prices">
        <div class="mytitle"> {{mssg}}</div>
        <div class="price_box" v-for="plan in Plans" :key="plan.title">
        
            
            <div class="mytitle">{{ plan.title }}</div>
            
            <div class="ftr-wrapper">
                <ul>
                    <li v-for="feat in plan.featuers" :key="feat">
                        <div class="pict"></div>
                        {{ feat }}
                    </li>
                </ul>
            </div>
            <div class="toogle-wrapper" v-if="plan.values.length">
                {{plan.values_mssg}}  
                <div class="my-custom-toggle" >
                    <button class="button" v-for="method in plan.values" :key="method.id" :id=method.id
                        :style="{
                            'font-weight'       : plan.active_plan == method.id ? '400' : '250',
                            'background-color'  : plan.active_plan == method.id ? 'green' : '',
                            'box-shadow'        : plan.active_plan == method.id ? '2px 2px 5px black' : ''
                        }"
                        v-on:click="toggle(plan,method.id)"
                    >
                        {{method.tag}}
                    </button>
                </div>
            </div>
            <div class="price" v-if="plan.active_plan != -1">{{ active_price(plan) }}&#8364;</div>

            <div class="mybutton_wrapper">
                <v-btn 
                    width=80%
                    color=var(--red-orange)
                    class="mybutton" :to="plan.buttn.link">
                    {{ plan.buttn.mssg }}
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Prices",
    data() {
        return {
            mssg:"Ευέλικτα Χαρακτηρηστικά και Τιμές μόνο για εσάς !",
            Plans: [
            
                {
                    title: "Δωρεάν",
                    active_plan: -1,
                    values: [],
                    values_mssg: "",
                    featuers: [
                        "2 Ομάδες",
                        "3-5 Μέλη ανά Ομάδα",
                        "3 Projects",
                        "Απεριόριστα Tasks",
                    ],
                    buttn: { mssg: "Συνδέσου Δωρεάν", link: "/sign/in" }
                },
            
                {
                    title: "Εταιρικό",
                    active_plan: 0,
                    values: [
                        { id: 0, tag: "Μηνιαίο", price: "7 " },
                        { id: 1, tag: "Ετήσιο", price: "70 " },
                    ],
                    values_mssg: "Επιλέξτε το πρόγραμμα σας:",
                    featuers: [
                        "Απαιριόριστες Ομάδες",
                        "3-9 Μέλη ανά Ομάδα",
                        "Απαιριόριστα Projects",
                        "Απεριόριστα Tasks",
                        "Διαγράμματα",
                        "Αναφορές Χρηστών",
                        "Ιστορικό",
                        "Διαχείρηση Ομάδας",
                    ],
                    buttn: { mssg: "Αγορά", link: "#" },
                }
            ]
        };
    },
    methods: {
        active_price: function (plan) {
            let pr = "";
            if (undefined == plan.values) return "";
            for (let i = 0; i < plan.values.length; i++) {
                if (plan.values[i].id == plan.active_plan) {
                    pr = plan.values[i].price; }
            }
            return pr;
        },
        toggle: function (plan, id) {
            plan.active_plan = id;
            this.active_price(plan);
        }
    },
  components: {
    // QBtnToggle,
  },
};
</script>

<style scoped>
@import url(../../assets/css/prices.css);
@import url(../../assets/css/homepage.css);
.v-application ul{
    padding-left: 0px;
}
</style>
