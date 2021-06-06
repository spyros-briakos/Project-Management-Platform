<template>
  <div class="vertical-center">
    <img id="image1" src="../../assets/img/scrum1.png">
    <img id="image2" src="../../assets/img/scrum4.png">

    <v-alert
      prominent
      type="info"
      :value="goodAllert"
    >
      <v-row align="center">
        <v-col class="grow">
          Για αλλάξετε τον κωδικό σας παρακαλώ μεταβείτε στο email σας. Έπειτα
          μεταβείτε στην σελίδα σύνδεσης για να συνδεθείτε.
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
      :value="badAllert"
    >
      {{ this.badAllertMessage }}
    </v-alert>

    

    <div class="inner-block">
      <form v-on:submit.prevent="forgotPassword_()">
        <h5>Ανάκτησε τον κωδικό σου!</h5>

        <div class="form-group">
          <input
            type="email"
            required
            v-model="email"
            class="form-control form-control-lg"
            placeholder="Email"
          />
        </div>

        <button type="submit" class="btn btn-dark btn-lg btn-block">
          Reset password
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
export default {
  data() {
    return {
      email: "",
      badAllertMessage: "",
      goodAllert: false,
      badAllert: false,
    };
  },
  methods: {
    ...mapActions(["forgotPassword"]),
    goToSignIn(){
      this.$router.push({name:"SignIn"})
    },
    forgotPassword_() {
      this.forgotPassword(this.email)
      .then( response => {
          this.badAllert = false
          this.goodAllert = true
        })
      .catch( error => { 
          this.goodAllert = false
          this.badAllert = true
          this.badAllertMessage = error.response.data.message;
        });

    }
  },
};
</script>

<style scoped>

</style>
