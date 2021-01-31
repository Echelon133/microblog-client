<template>
  <header>
    <b-navbar toggleable="lg">
      <b-navbar-brand href="/">Mikroblog</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="d-flex me-4 mr-2" @submit.prevent="onSubmit">
            <b-form-input size="sm" v-model="searchedUsername" type="search" placeholder="Nazwa użytkownika" aria-label="Search"/>
            <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" type="submit">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-nav-form>
          <span v-if="loggedIn">
            <b-button size="sm" class="my-2 my-sm-0">Wyloguj</b-button>
          </span>
          <span v-else>
            <b-button-group size="sm">
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" to="/login">Zaloguj</b-button>
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" to="/register">Zarejestruj</b-button>
            </b-button-group>
          </span>
        </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
import { BIcon, BIconSearch } from 'bootstrap-vue'

export default {
  name: 'Header',
  components: {
    BIcon, BIconSearch
  },
  props: ['loggedIn'],
  data () {
    return {
      searchedUsername: ''
    }
  },
  methods: {
    onSubmit () {
      console.log(this.searchedUsername)
    }
  }
}
</script>
