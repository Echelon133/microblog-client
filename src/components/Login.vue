<template>
  <ValidationObserver v-slot="{ invalid }">
    <form class="signin" @submit.prevent="onSubmit">
      <h1 class="h3 mb-3 fw-normal">Zaloguj</h1>
      <b-alert show v-if="success" variant="success">Logowanie udane</b-alert>
      <b-alert show v-if="failure" variant="danger">Logowanie nieudane</b-alert>
      <ValidationProvider name="username" rules="required" v-slot="{ errors }">
        <label for="inputUsername" class="visually-hidden mt-2">Nazwa użytkownika</label>
        <input
          v-model="username"
          v-bind:class="{invalidval: errors.length > 0}"
          type="text" id="inputUsername" class="form-control mt-2" placeholder="Nazwa użytkownika" autofocus="">
      </ValidationProvider>
      <ValidationProvider name="password" rules="required" v-slot="{ errors }">
        <label for="inputPassword" class="visually-hidden mt-2">Hasło</label>
        <input
          v-model="password"
          v-bind:class="{invalidval: errors.length > 0}"
          type="password" id="inputPassword" class="form-control  mt-2" placeholder="Hasło">
      </ValidationProvider>
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="invalid">Zaloguj</button>
      <p class="mt-5 mb-3 text-muted">© 2021</p>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

export default {
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
      this.axios.post('http://localhost:8090/api/token', {}, {
        withCredentials: true,
        auth: {
          username: this.username,
          password: this.password
        }
      })
        .then(() => {
          // get the logged user object from the resource server
          this.axios.get('http://localhost:8080/api/users/me', { withCredentials: true })
            .then((response) => {
              // cache the logged user object in the local storage
              localStorage.setItem('user', JSON.stringify(response.data))
              this.failure = false
              this.success = true
              this.username = ''
              this.password = ''
              // redirect to the main page
              setTimeout(() => this.$router.push({path: '/'}), 2000)
            })
            .catch(() => {
              this.failure = true
            })
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
