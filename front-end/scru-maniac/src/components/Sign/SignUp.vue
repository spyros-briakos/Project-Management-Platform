<template>
  <div class="vue-template">
    <form>
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
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
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
