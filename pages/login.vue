<template>
  <div class="container">
    <div class="col-6 ma-auto">
      <h2>Sign in</h2>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="form.login"
          label="Login"
        />
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
        />
        <v-btn type="submit" color="primary">
          Login
        </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',
  data: () => ({
    form: {
      login: null,
      password: null
    }
  }),
  methods: {
    async onSubmit () {
      await this.$store.dispatch('auth/login', this.form)
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
