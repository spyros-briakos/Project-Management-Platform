<template>
    <div class="prof_logout_wrap">
        <div class="logout_panel">
            <h1>Αποσύνδεση από τον ScruManiac λογαρισμό σας</h1>
            <div class="logout_personal_info">
                <img class="logout_prof_pict" :src="require('../../assets/img/' + def + '')">
                <div class="logout_personal_info_text_wrapper">
                    <div class="logout_personal_info_text" :style="{'font-weight': 'bold'}">{{username}}</div>
                    <div class="logout_personal_info_text">{{email}}</div>
                </div>
            </div>
            <div class="logout_btn_wrap">
                    <button class="logout_btn" v-on:click="mpou()">Αποσύνδεση</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    name: "profLogout",
    data(){
        return{
            def: 'prof_default.svg',
            username: "Vasilis Goulas",
            email: "VasilisGoulas@dit.uoa.gr",
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
    @import "../../assets/css/prof_logout.css";
</style>
