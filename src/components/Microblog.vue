<template>
  <div id="app">
    <Header :loggedIn="loggedIn"/>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'Microblog',
  components: {
    Header
  },
  data () {
    return {
      loggedIn: false
    }
  }
}
</script>
