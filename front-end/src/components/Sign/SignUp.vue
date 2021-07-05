<template>
  <div class="vertical-center">
    <v-alert
      prominent
      type="info"
      :value="goodSignUpAllert"
    >
      <v-row align="center">
        <v-col class="grow">
          Η δημιουργία του λογαριασμού σας{{googleMsg}} ολοκληρώθηκε με επιτυχία. 
          Παρακαλώ επιβεβαιώστε το email σας και μεταβείτε στην σελίδα σύνδεσης για να συνδεθείτε.
        </v-col>
        <v-col class="shrink">
          <v-btn
          color="accent"
          depressed
          elevation="2"
          @click="goToSignIn">
            Σύνδεση
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-alert
      type="error"
      :value="badSignUpAllert"
    >
      {{ this.badSignUpAllertMessage }}
    </v-alert>

    <img id="image1" src="../../assets/img/scrum1.png">
    <img id="image2" src="../../assets/img/scrum4.png">

    <div class="inner-block">
      <form v-on:submit.prevent="signup_()">
        <h3>Δημιούργησε τον λογαριασμό σου!</h3>

        <div class="form-group">
          <label>Πληκτρολόγησε το Username σου</label>
          <input
            type="text"
            required
            v-model="userName"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Πληκτρολόγησε το όνομά σου</label>
          <input
            type="text"
            required
            v-model="firstName"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Πληκτρολόγησε το επίθετό σου</label>
          <input
            type="text"
            required
            v-model="lastName"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Πληκτρολόγησε το Email σου</label>
          <input
            type="email"
            required
            v-model="email"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Πληκτρολόγησε τον κωδικό σου</label>
          <input
            type="password"
            required
            v-model="password"
            class="form-control form-control-lg"
          />
        </div>

        <div class="form-group">
          <label>Επαλήθευσε τον κωδικό σου</label>
          <input
            type="password"
            required
            v-model="password2"
            class="form-control form-control-lg"
          />
          <temp
            >Με την εγγραφή αποδέχομαι τους Όρους Παροχής Υπηρεσιών του ScruManiac
            και αναγνωρίζω την Πολιτική Απορρήτου.</temp
          >
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Εγγραφή
        </button>

        <div class="social-icons">
          <h1></h1>
          <h6>ή συνδέσου με το Google Account σου</h6>
          <!-- <ul> -->
              
              <!-- <li>  -->
                  <a href="#" @click="signupGoogle_()">
                      <v-btn
                          class="mx-2"
                          fab
                          dark
                          small
                          color="teal"
                          >
                          <v-icon dark>
                              fab fa-google
                          </v-icon>
                      </v-btn>
                  </a>
                  <!-- <a href="#" @click="loginGoogle_"><i class="fab fa-google" style="color:dodgerblue"></i></a> -->
                  
                  <!-- <a class="fb-ic mr-3" role="button"><mdb-icon fab icon="facebook-f" size="lg" /></a> -->
                  <!-- <mdb-btn tag="a" size="lg" floating class="btn-fb" icon="facebook-f" fab></mdb-btn> -->
              <!-- </li> -->
          <!-- </ul>  -->
      </div>

        <p class="forgot-password text-right">
          Ήδη εγγεγραμμένος;
          <router-link :to="{ name: 'SignIn' }">Συνδέσου!</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  name: "SignUp",
  data() {
    return {
      goodSignUpAllert: false,
      badSignUpAllert: false,
      badSignUpAllertMessage : "Σφάλμα κατά την εγγραφή",
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      googleMsg: ""
    };
  },
  
  methods: {
    ...mapActions(["signup", "signupGoogle"]),
    goToSignIn(){
      this.$router.push({name:"SignIn"})
    },
    myFilter() {
      this.goodSignUpAllert = !this.goodSignUpAllert;
    },
    checkPassword2() { 
      return this.password === this.password2; 
    },
    getData() {
      return {
        username: this.userName,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        plan_in_use: "standard"
      }
    },
    signup_() {
      if (this.checkPassword2()) {
        this.signup(this.getData()) 
        .then( response => {
          this.badSignUpAllert = false
          this.goodSignUpAllert = true
        })
        .catch( error => { 
          this.goodSignUpAllert = false
          this.badSignUpAllert = true
          this.badSignUpAllertMessage = error.response.data.message
        }) 
      } else {
        alert("Τα password δεν είναι όμοια");
      }
    },

  signupGoogle_() {
      this.signupGoogle() 
      .then( response => {
        this.badSignUpAllert = false
        this.goodSignUpAllert = true
        this.googleMsg = " με τον λογαριασμό Google"
      })
      .catch( error => { 
        this.goodSignUpAllert = false
        this.badSignUpAllert = true
        this.badSignUpAllertMessage = error.response.data.message
      }) 
    },


  }
};
</script>

<style scoped>
temp {
  font-size: 50%;
  margin-bottom: 1cm;
  width: 1px;
  padding: 2px;
  border: 1px;
}
</style>
