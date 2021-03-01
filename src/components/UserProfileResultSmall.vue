<template>
  <b-row class="pt-2 pb-2 result-box">
    <b-col sm="12" class="profile-box">
      <b-row>
        <b-col sm="3" md="3" lg="3" xl="3">
          <img src="/static/avi.png" class="img-fluid rounded-circle avi-pos"/>
        </b-col>
        <b-col sm="9" md="9" lg="9" xl="9" class="profile-usernames-box">
          <p class="displayed-username">{{ user.displayedUsername }}</p>
          <p class="username profile-link"
          @click.stop.prevent="goToUser(user.username)"
          >@{{ user.username }}</p>
        </b-col>
      </b-row>
      <hr class="mb-0">
      <b-row :class="{'followed': followed}">
        <b-col sm="12" class="text-center follow-box pt-3" @click.prevent="follow()">
          <span v-if="followed" class="follow-text">Nie Obserwuj</span>
          <span v-else class="follow-text">Obserwuj</span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'UserProfileResultSmall',
  props: ['user'],
  data () {
    return {
      followed: true
    }
  },
  methods: {
    follow () {
      this.followed = !this.followed
      console.log('Follow user with uuid: ' + this.$vnode.key)
    },
    goToUser (username) {
      this.$router.push({path: `/user/${username}`})
    }
  }
}
</script>

<style scoped>
.result-box {
  width: 100%;
  margin: 0;
}

.profile-box {
  background-color:#555555;
  border-radius: 15px;
}

.profile-usernames-box {
  padding-left: 15px;
  padding-top: 15px;
}

.displayed-username {
  font-size: 35px;
  margin-bottom: 0px;
  color: white;
}

.username {
  font-size: 26px;
  margin-bottom: 0px;
  color: grey;
}

.user-description-box {
  margin-left: 15px;
  font-size: 22px;
  padding-bottom: 25px;
}

.avi-pos {
  padding: 10px;
  margin-top: 10px;
}

.follow-box {
  margin-bottom: 20px;
  cursor: pointer;
  color:white;
}

.follow-text {
  font-size: 20px;
}

.followed {
  border: 2px solid white;
  background-color:#303030;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
}

.profile-link {
  color:#333333;
  text-decoration: none;
}

.profile-link:hover {
  color:#333333;
  text-decoration: underline;
  cursor: pointer;
}
</style>
