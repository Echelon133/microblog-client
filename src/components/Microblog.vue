<template>
  <div id="app">
    <Header :loggedIn="loggedIn" :user="user"/>
    <main>
      <b-container fluid>
        <b-row>
          <b-col sm="4" md="3" lg="3" xl="2" offset-xl="1">
            <SidePanel/>
          </b-col>
          <b-col sm="8" md="9" lg="9" xl="9"></b-col>
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
  min-height: calc(100vh - 55px); /* full vh - margin-top of this block */
}
</style>
