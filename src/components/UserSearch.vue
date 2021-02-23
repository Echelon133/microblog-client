<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="9" offset-sm="1" class="searchname-box">
        <b-row>
          <b-col sm="12">
            <h1 class="searched-name">Szukana fraza: "{{ $route.params.searchname }}"</h1>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="12" lg="12" xl="12">
        <UserProfileResult v-for="user in users" :key="user.uuid" :user="user"/>
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
      users: [
        {
          uuid: '328ee4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Test User',
          username: 'testuser',
          description: 'Lorem Ipsum Test',
          followed: false
        },
        {
          uuid: '108ee4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Another User',
          username: 'testuser1',
          description: 'Placeholder description',
          followed: false
        },
        {
          uuid: '5000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Last User',
          username: 'testuser2',
          description: 'Last user\'s description',
          followed: false
        }
      ]
    }
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 90vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.searchname-box {
  background-color:#555555;
  border-radius: 15px;
}

.searched-name {
  padding: 20px 20px 20px 20px;
}
</style>
