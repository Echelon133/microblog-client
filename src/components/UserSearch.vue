<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="10" offset-sm="1" class="searchname-box">
        <b-row>
          <b-col sm="12">
            <h1 class="searched-name">Szukana fraza: "{{ $route.params.searchname }}"</h1>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="12" lg="12" xl="12">
        <UserProfileResult v-for="user in users" :key="user.uuid" :user="user"/>
        <b-row>
          <b-col sm="10" offset-sm="1" class="text-center mt-5">
            <span v-if="users.length === 0" class="no-content-text">Brak wyników</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UserProfileResult from '@/components/UserProfileResult'

export default {
  name: 'UserSearch',
  components: {
    UserProfileResult
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    search () {
      let phrase = this.$route.params.searchname
      this.axios.get('/users?search=' + phrase).then((response) => {
        this.users = response.data
      })
    }
  },
  mounted () {
    this.search()
  },
  watch: {
    '$route.params.searchname': function () {
      this.search()
    }
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 80vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.searchname-box {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.searched-name {
  padding: 20px 20px 20px 20px;
}

.no-content-text {
  font-size: 40px;
}
</style>
