<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="register" @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal text-center">{{ $t('register.register') }}</h1>
      <b-alert show v-if="success" variant="success">{{ successMsg }}</b-alert>
      <b-alert show v-if="failure" variant="danger">{{ failureMsg }}</b-alert>
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <label for="inputEmail" class="visually-hidden mt-2">{{ $t('register.email') }}</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="registerForm.email"
          v-bind:class="{invalidval: errors.length > 0}"
          type="email" id="inputEmail" class="form-control" :placeholder="$t('register.email')" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="username" rules="required|usernameCorrect" v-slot="{ errors }">
        <label for="username" class="visually-hidden pt-2">{{ $t('register.username') }}</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="registerForm.username"
          v-bind:class="{invalidval: errors.length > 0}"
          type="text" id="username" class="form-control" :placeholder="$t('register.username')" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="password" rules="required|passwordCorrect|passwordsMatch:@password2" v-slot="{ errors }">
        <label for="password" class="visually-hidden mt-2">{{ $t('register.password') }}</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="registerForm.password"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="password" class="form-control" :placeholder="$t('register.password')">
      </ValidationProvider>
      <ValidationProvider name="password2" rules="required" v-slot="{ errors }">
        <label for="password2" class="visually-hidden mt-2">{{ $t('register.password') }}</label>
        <span class="field-error">{{ errors[0] }}</span>
        <input
          v-model="registerForm.password2"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="password2" class="form-control" :placeholder="$t('register.password')">
      </ValidationProvider>
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="invalid">{{ $t('register.register') }}</button>
      <p class="mt-5 mb-3 text-muted text-center">© 2021</p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import i18n from '@/i18n'

// this extend has to be outside of mounted() method
// otherwise 'target' is always undefined and validation does not work
extend('passwordsMatch', {
  params: ['target'],
  validate (value, { target }) {
    // because this extend clause must be outside of mounted()
    // the message might be loaded before the language change
    // and this might cause a bug in which this error message is in an incorrect language
    // a quick fix is to reload that message here
    this.message = i18n.t('register.passwordsMatch')
    return value === target
  },
  message: i18n.t('register.passwordsMatch')
})

export default {
  title () {
    return this.$i18n.t('register.title')
  },
  components: {
    ValidationProvider, ValidationObserver, i18n
  },
  data () {
    return {
      registerForm: {
        email: null,
        username: null,
        password: null,
        password2: null
      },
      success: false,
      failure: false,
      successMsg: '',
      failureMsg: ''
    }
  },
  methods: {
    onSubmit () {
      let newUserData = {
        email: this.registerForm.email,
        username: this.registerForm.username,
        password: this.registerForm.password,
        password2: this.registerForm.password2
      }
      this.axios.post('/users/register', newUserData)
        .then((response) => {
          this.successMsg = this.$i18n.t('register.success')
          this.failure = false
          this.success = true
          this.clearForm()
        })
        .catch((error) => {
          let response = error.response
          this.success = false
          if (response.status === 400) {
            if (response.data.messages.includes('Username already taken')) {
              this.failureMsg = this.$i18n.t('register.usernameTaken')
            }
          } else {
            this.failureMsg = this.$i18n.t('register.failureMsg')
          }
          this.failure = true
        })
    },
    clearForm () {
      this.registerForm.username = ''
      this.registerForm.email = ''
      this.registerForm.password = ''
      this.registerForm.password2 = ''
    }
  },
  mounted () {
    extend('required', {
      ...required,
      message: i18n.t('register.required')
    })

    extend('email', {
      ...email,
      message: i18n.t('register.emailInvalid')
    })

    extend('usernameCorrect', {
      validate (value) {
        // only allow usernames with alphanumeric characters
        // length between 1-30
        var usernameRegex = /^([A-Za-z0-9]{1,30})$/
        var matchedUsername = value.match(usernameRegex)
        return matchedUsername && (value === matchedUsername[0])
      },
      message: i18n.t('register.usernameRequirements')
    })

    extend('passwordCorrect', {
      validate (value) {
        // accept alphanumeric and special characters
        // length between 8-64
        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/
        return passwordRegex.test(value) && (value.length >= 8 && value.length <= 64)
      },
      message: i18n.t('register.passwordRequirements')
    })
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
