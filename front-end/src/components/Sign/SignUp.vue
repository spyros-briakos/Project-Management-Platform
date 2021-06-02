<template>
  <div class="vertical-center">
    <img id="image1" src="../../assets/img/scrum1.png">
    <img id="image2" src="../../assets/img/scrum4.png">

    <div class="inner-block">
      <form v-on:submit.prevent="signUp()">
        <h3>Δημιούργησε τον λογαριασμό σου!</h3>

        <div class="form-group">
          <label>Πληκτρολόγησε το όνομα σου</label>
          <input
            type="text"
            required
            v-model="name"
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

        <p class="forgot-password text-right">
          Ήδη εγγεγραμμένος;
          <router-link :to="{ name: 'SignIn' }">Συνδέσου!</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
      // data: {
      //   username: this.username,
      //   password: this.password,
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   email: this.email,
      //   plan_in_use: "standard"
			// },
      data: {
        username: "aaaa1234",
        password: "12345678",
        firstName: "aaaaa",
        lastName: "aaaaa",
        email: "andreas.giannoutsos.cloud@gmail.com",
        plan_in_use: "standard"
			},
    };
  },
  
  methods: {
    checkPassword2() { 
      return this.password === this.password2; 
    },
    signUp() {
        console.log("CHECK PASSWORD");
      if (this.checkPassword2()) {
        this.$actions.signup(this.data) 
        .then( response => {
          console.log(this);
          console.log("USER "+this.name+" HAS SIGNED IN!");
          this.$router.push({name:"myProjects"})
        })
      .catch( error => { 
          console.log(error);
          console.log("ERROR IN SIGNUP");
        }) 
      } else {
        alert("Τα password δεν είναι ίδια");
      }
    },
  },
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
