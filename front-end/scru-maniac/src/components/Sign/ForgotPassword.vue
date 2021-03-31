<template>
    <div class="vue-tempalte">
        <form>
            <h5>Ανάκτησε τον κωδικό σου!</h5>

            <div class="form-group">
                <!-- <label>Email</label> -->
                <input type="email" required v-model="email" class="form-control form-control-lg" placeholder="Email" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Reset password</button>

        </form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                email: ''
            }
        }
    }
</script>

<style scoped>

</style>