<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="register" @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Zarejestruj</h1>
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <label for="inputEmail" class="visually-hidden mt-2">Adres email</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="email"
          v-bind:class="{invalidval: errors.length > 0}"
          type="email" id="inputEmail" class="form-control" placeholder="Email" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="username" rules="required|usernameCorrect" v-slot="{ errors }">
        <label for="username" class="visually-hidden pt-2">Nazwa użytkownika</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="username"
          v-bind:class="{invalidval: errors.length > 0}"
          type="text" id="username" class="form-control" placeholder="Nazwa użytkownika" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="password" rules="required|passwordCorrect|passwordsMatch:@password2" v-slot="{ errors }">
        <label for="password" class="visually-hidden mt-2">Hasło</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="password"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="password" class="form-control" placeholder="Hasło">
      </ValidationProvider>
      <ValidationProvider name="password2" rules="required" v-slot="{ errors }">
        <label for="password2" class="visually-hidden mt-2">Hasło</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="password2"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="password2" class="form-control" placeholder="Powtórz hasło">
      </ValidationProvider>
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="invalid">Zarejestruj</button>
      <p class="mt-5 mb-3 text-muted">© 2021</p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Pole jest wymagane'
})

extend('email', {
  ...email,
  message: 'Adres email jest niepoprawny'
})

extend('usernameCorrect', {
  validate (value) {
    // only allow usernames with alphanumeric characters
    // length between 1-30
    var usernameRegex = /^([A-Za-z0-9]{1,30})$/
    var matchedUsername = value.match(usernameRegex)
    return matchedUsername && (value === matchedUsername[0])
  },
  message: 'Nazwa użytkownika musi mieć 1-30 znaków, zawierać wyłącznie małe/duże litery oraz cyfry'
})

extend('passwordsMatch', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: 'Hasła muszą się zgadzać'
})

extend('passwordCorrect', {
  validate (value) {
    // accept alphanumeric and special characters
    // length between 8-64
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/
    return passwordRegex.test(value) && (value.length >= 8 && value.length <= 64)
  },
  message: 'Hasło musi mieć 8-64 znaków, zawierać wielkie i małe litery, co najmniej jedną cyfrę oraz co najmniej jeden znak specjalny'
})

export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data () {
    return {
      email: null,
      username: null,
      password: null,
      password2: null
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style scoped>
.register {
  width:100%;
  max-width:400px;
  padding-top: 50px;
  margin:auto;
}

.invalidval {
  border: 3px solid red;
}

.field-error {
  color: red;
  width: 400px;
  display:block;
  font-size: 13px;
  height: 45px;
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
