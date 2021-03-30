<template>
    <div class="App">
        <div class="vertical-center">
            <div class="inner-block">
                <div class="vue-template">
                    <form>
                        <h3>Συνδέσου με τον λογαριασμό σου!</h3>

                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" required v-model="email" class="form-control form-control-lg"/>
                            <!-- <input type="email" required v-model="email" class="form-control form-control-lg" placeholder="Email"/> -->
                        </div>

                        <div class="form-group">
                            <label>Κωδικός</label>
                            <input type="password" required v-model="password" class="form-control form-control-lg" />
                            <!-- <input type="password" required v-model="password" class="form-control form-control-lg" placeholder="Κωδικός"/> -->
                        </div>

                        <p class="forgot-password text-right mt-2 mb-4">
                            <router-link to="/sign/forgot">Ξέχασες τον κωδικό σου;</router-link>
                        </p>
                        
                        <button type="submit" class="btn btn-dark btn-lg btn-block" v-on:click="login()">
                            Σύνδεση<router-link :to="{name: 'Home'}"></router-link>
                        </button>
                        
                        <p class="forgot-password text-right">
                            <router-link to="/">Πίσω στην αρχική</router-link>
                        </p>
                        
                        <div class="social-icons">
                            <h6>ή συνδέσου με...</h6>
                            <ul>
                                <li><a href="#"><i class="fa fa-google"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i class="fa fa-apple"></i></a></li>
                            </ul>
                        </div>

                        <p class="forgot-password text-right">
                            Δεν έχεις λογαριασμό; 
                            <router-link :to="{name: 'SignUp'}">Δημιούργησε έναν!</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>    

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                console.log("USER HAS SIGNED IN!")
            //     if(this.email != "" && this.password != "") {
            //         if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
            //             this.$emit("authenticated", true);
            //             this.$router.replace({ name: "secure" });
            //         } else {
            //             console.log("The username and / or password is incorrect");
            //         }
            //     } else {
            //         console.log("A username and password must be present");
            }
        }
    }
</script>

<style scoped>

    temp {
        font-size: 50%;
        position: relative;
        left: 260px;
        border: 3px;
    }

</style>