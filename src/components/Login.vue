<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="signin" @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Zaloguj</h1>
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <label for="inputEmail" class="visually-hidden mt-2">Adres email</label>
        <input
          v-model="email"
          v-bind:class="{invalidval: errors.length > 0}"
          type="email" id="inputEmail" class="form-control" placeholder="Email" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <label for="inputPassword" class="visually-hidden mt-2">Hasło</label>
        <input
          v-model="password"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="inputPassword" class="form-control invalid-field" placeholder="Hasło">
      </ValidationProvider>

      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="invalid">Zaloguj</button>
      <p class="mt-5 mb-3 text-muted">© 2021</p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', required)
extend('email', email)

export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
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
</style>
