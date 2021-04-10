<template>
  <header>
    <b-navbar toggleable="lg" fixed="top">
      <b-navbar-brand href="/">Mikroblog</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="d-flex me-4 mr-2" @submit.prevent="onSubmit">
            <b-form-input size="sm" v-model="searchedUsername" type="search" placeholder="Nazwa użytkownika" aria-label="Search"/>
            <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" type="submit">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-nav-form>
          <span v-if="user">
            <b-button-group size="sm">
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" @click.prevent="goToUserProfile">
                @{{ user.username }}
                <img :src="user.aviURL" class="avi" v-if="user.aviURL">
                <img src="/static/avi.png" class="avi" v-else/>
                </b-button>
              <b-button @click.prevent="logout" variant="outline-primary" size="sm" class="my-2 my-sm-0">Wyloguj</b-button>
            </b-button-group>
          </span>
          <span v-else>
            <b-button-group size="sm">
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" to="/login">
              Zaloguj
              </b-button>
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
  props: ['user'],
  data () {
    return {
      searchedUsername: ''
    }
  },
  methods: {
    onSubmit () {
      this.$router.push({path: `/search/user/${this.searchedUsername}`})
    },
    goToUserProfile () {
      let username = this.$props.user.username
      this.$router.push({path: `/user/${username}`})
    },
    logout () {
      this.$store.dispatch('logout')
        .then(() => {
          setTimeout(() => this.$router.go(), 500)
        })
    }
  }
}
</script>

<style scoped>
nav {
  background-color:white;
}

.avi {
  width: 15px;
  height: 15px;
  border-radius:50%;
}
</style>
