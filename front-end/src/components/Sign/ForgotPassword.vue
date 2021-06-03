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
          Ο νέος σας κωδικός έχει αποσταλεί στο email σας. 
          Παρακαλώ μεταβείτε στην σελίδα σύνδεσης για να συνδεθείτε.
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
      <form v-on:submit.prevent="resetPassword()">
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
    goToSignIn(){
      this.$router.push({name:"SignIn"})
    },
    resetPassword() {
      console.log("RESET PASSWOD")
      this.$actions.forgotPassword(this.email)
      .then( response => {
          console.log("EMAIL RESETED");
          this.badAllert = false
          this.goodAllert = true
        })
      .catch( error => { 
          console.log(error);
          console.log("ERROR IN EMAIL RESET");
          this.goodAllert = false
          this.badAllert = true
          this.badAllertMessage = error;
        });

    }
  },
};
</script>

<style scoped>

</style>
