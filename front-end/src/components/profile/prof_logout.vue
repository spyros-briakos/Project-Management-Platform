<template>
    <div class="prof_logout_wrap">
        <div class="logout_panel">
            <h1>Αποσύνδεση από τον ScruManiac λογαρισμό σας</h1>
            <div class="logout_personal_info">
                <img class="logout_prof_pict" :src="require('../../assets/img/' + def + '')">
                <div class="logout_personal_info_text_wrapper">
                    <div class="logout_personal_info_text" :style="{'font-weight': 'bold'}">{{firstName+" "+lastName}}</div>
                    <div class="logout_personal_info_text">{{email}}</div>
                </div>
            </div>
            <div class="logout_btn_wrap">
                    <button class="logout_btn" v-on:click="logout_()">Αποσύνδεση</button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    export default {
    name: "profLogout",
    data(){
        return{
            def: 'prof_default.svg',
            username: "Vasilis Goulas",
            // email: "VasilisGoulas@dit.uoa.gr",
        }
    },
    computed:{
        ...mapGetters({
		    firstName: "firstName",
		    lastName: "lastName",
		    userName: "userName",
		    email: "email",
		    image: "image",
	    }),
    },
    methods:{
        ...mapActions(["logout"]),
        logout_(){
            this.logout() 
            .then( response => {
                this.$router.push({name:"SignIn"})
            })
            .catch( error => { 
                alert(error)
            }) 
        },
    },
};
</script>

<style scoped>
    @import "../../assets/css/profile/prof_logout.css";
</style>
