<template>
    <div class="vertical-center">
        <img id="image1" src="../../assets/img/scrum1.png">
        <img id="image2" src="../../assets/img/scrum4.png">

        <v-alert
            type="error"
            :value="badAllert"
        >
            {{ this.badAllertMessage }}
        </v-alert>

        <div class="inner-block">
            <form v-on:submit.prevent="login_()">
                <h3>Συνδέσου με τον λογαριασμό σου!</h3>

                <div class="form-group">
                    <label>Username</label>
                    <input
                        type="username"
                        required
                        v-model="username"
                        class="form-control form-control-lg"
                    />
                    <!-- <input type="username" required v-model="username" class="form-control form-control-lg" placeholder="Username"/> -->
                </div>

                <div class="form-group">
                    <label>Κωδικός</label>
                    <input
                        type="password"
                        required
                        v-model="password"
                        class="form-control form-control-lg"
                    />
                    <!-- <input type="password" required v-model="password" class="form-control form-control-lg" placeholder="Κωδικός"/> -->
                </div>
            
                <p class="forgot-password texlogint-right mt-2 mb-4">
                    <router-link to="/sign/forgot"
                        >Ξέχασες τον κωδικό σου;</router-link
                    >
                </p>

                <button
                    type="submit"
                    class="btn btn-dark btn-lg btn-block"                    
                >
                    Σύνδεση<router-link :to="{ name: 'Home' }"></router-link>
                </button>

                <p class="forgot-password text-right">
                    <router-link to="/">Πίσω στην αρχική</router-link>
                </p>

                <div class="social-icons">
                    <h6>ή συνδέσου με...</h6>
                    <ul>
                        
                        <li> 
                            <!-- <a class="fb-ic mr-3" role="button"><mdb-icon fab icon="facebook-f" size="lg" /></a> -->
                            <!-- <mdb-btn tag="a" size="lg" floating class="btn-fb" icon="facebook-f" fab></mdb-btn> -->
                        </li>

                        <li>
                            <!-- <mdb-btn tag="a" size="lg" floating class="btn-fb" icon="facebook-f" fab></mdb-btn> -->
                        </li>

                        <li>
                            <!-- <mdbBtn tag="a" size="lg" floating class="btn-fb" icon="facebook-f" fab></mdbBtn> -->
                        </li>

                    </ul> 
                </div>

                <p class="forgot-password text-right">
                    Δεν έχεις λογαριασμό;
                    <router-link :to="{ name: 'SignUp' }"
                        >Δημιούργησε έναν!</router-link
                    >
                </p>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    data() {
        return {
            username: "",
            password: "",
            badAllertMessage: "",
            badAllert: false,
        };
    },
    computed: {
        ...mapGetters({
		    isLogedIn: "isLogedIn",
	    }),
    },
    methods: {
        ...mapActions(["login"]),
        login_() {
            // this.$actions.login_(this.username, this.password) 
            this.login( { username: this.username, password: this.password } ) 
            .then( response => {
                this.$router.push({name:"myProjects"})
            })
            .catch( error => { 
                this.badAllert = true;
                this.badAllertMessage = error.message
                
            }) 
            //         if(this.email != "" && this.password != "") {
            //                 if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
            //                         this.$emit("authenticated", true);
            //                         this.$router.replace({ name: "secure" });
            //                 } else {
            //                         console.log("The username and / or password is incorrect");
            //                 }
            //         } else {
            //                 console.log("A username and password must be present");
            // username, password

        },
    },
};
</script>