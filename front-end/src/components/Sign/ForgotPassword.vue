<template>
  <div class="vertical-center">
    <img id="image1" src="../../assets/img/scrum1.png">
    <img id="image2" src="../../assets/img/scrum4.png">

    <div class="inner-block">
      <form>
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
    };
  },
};
</script>

<style scoped>

</style>
