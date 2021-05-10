<template>
  <header>
    <b-navbar toggleable="lg" fixed="top">
      <b-navbar-brand href="/">{{ $t('header.microblog') }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="d-flex me-4 mr-2" @submit.prevent="onSubmit">
            <b-form-input size="sm" v-model="searchedUsername" type="search" :placeholder="$t('header.username')" aria-label="Search"/>
            <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" type="submit">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-nav-form>
          <NotificationDropdown/>
          <span v-if="user">
            <b-button-group size="sm">
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" @click.prevent="goToUserProfile">
                @{{ user.username }}
                <img :src="user.aviURL" class="avi" v-if="user.aviURL">
                <img src="/static/avi.png" class="avi" v-else/>
                </b-button>
              <b-button @click.prevent="logout" variant="outline-primary" size="sm" class="my-2 my-sm-0">{{ $t('header.logout') }}</b-button>
            </b-button-group>
          </span>
          <span v-else>
            <b-button-group size="sm">
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" to="/login">{{ $t('header.login') }}</b-button>
              <b-button variant="outline-primary" size="sm" class="my-2 my-sm-0" to="/register">{{ $t('header.register') }}</b-button>
            </b-button-group>
          </span>
          <b-nav-item-dropdown toggle-class="nav-link-custom" right>
            <b-dropdown-item @click.prevent="setLang('en')"><img src="/static/en.png" class="flag"/> en</b-dropdown-item>
            <b-dropdown-item @click.prevent="setLang('pl')"><img src="/static/pl.png" class="flag"/> pl</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import NotificationDropdown from '@/components/NotificationDropdown'
import { BIcon, BIconSearch } from 'bootstrap-vue'
import Vue from 'vue'
import i18n from '@/i18n'

export default {
  name: 'Header',
  components: {
    BIcon, BIconSearch, NotificationDropdown
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
    },
    setLang (l) {
      if (l !== undefined) {
        Vue.$cookies.set('lang', l)
      }
      i18n.locale = Vue.$cookies.get('lang')
    }
  },
  mounted () {
    if (Vue.$cookies.get('lang') == null) {
      Vue.$cookies.set('lang', 'en')
    }
    this.setLang()
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

.flag {
  width: 25px;
  height: 25px;
}
</style>
