<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="signin" @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal text-center">{{ $t("login.login") }}</h1>
      <b-alert show v-if="success" variant="success">{{ $t('login.success') }}</b-alert>
      <b-alert show v-if="failure" variant="danger">{{ $t('login.failure') }}</b-alert>
      <ValidationProvider name="username" rules="required" v-slot="{ errors }">
        <label for="inputUsername" class="visually-hidden mt-2">{{ $t('login.username') }}</label>
        <input
          v-model="username"
          v-bind:class="{invalidval: errors.length > 0}"
          type="text" id="inputUsername" class="form-control mt-2" :placeholder="$t('login.username')" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <label for="inputPassword" class="visually-hidden mt-2">{{ $t('login.password') }}</label>
        <input
          v-model="password"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="inputPassword" class="form-control  mt-2" :placeholder="$t('login.password')">
      </ValidationProvider>
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="invalid">{{ $t('login.login') }}</button>
      <p class="mt-5 mb-3 text-muted text-center">© 2021</p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

export default {
  title () {
    return this.$i18n.t('login.title')
  },
  components: {
    ValidationProvider, ValidationObserver
  },
  data () {
    return {
      username: null,
      password: null,
      failure: false,
      success: false
    }
  },
  methods: {
    onSubmit () {
      // get accessToken and refreshToken from the auth server
      let username = this.username
      let password = this.password
      this.$store.dispatch('auth_attempt', {username, password})
        .then(() => {
          this.success = true
          this.failure = false
          setTimeout(() => this.$router.push({path: '/'}), 500)
        })
        .catch(() => {
          this.failure = true
        })
    }
  }
}
</script>

<style scoped>
.signin {
  width:100%;
  max-width:350px;
  padding-top: 150px;
  margin:auto;
}

.invalidval {
  border: 3px solid red;
}

label {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}
</style>
