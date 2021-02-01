<template>
  <div id="app">
    <Header :loggedIn="loggedIn" :user="user"/>
    <main>
      <b-container fluid>
        <b-row>
          <b-col md="3">
            <SidePanel/>
          </b-col>
          <b-col md="9"></b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SidePanel from '@/components/SidePanel'

export default {
  name: 'Microblog',
  components: {
    Header, SidePanel
  },
  data () {
    return {
      loggedIn: true,
      user: {
        displayedUsername: 'username',
        username: 'username'
      }
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

main {
  margin-top: 55px;
  background-color:#303030;
  font-family: 'Roboto', sans-serif;
  color: white;
}
</style>
