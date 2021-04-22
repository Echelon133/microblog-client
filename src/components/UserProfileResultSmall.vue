<template>
  <b-row class="pt-2 pb-2 result-box">
    <b-col sm="12" class="profile-box">
      <b-row>
        <b-col sm="3" md="3" lg="3" xl="3">
          <img :src="user.aviURL" class="avi img-fluid rounded-circle avi-pos" v-if="user.aviURL">
          <img src="/static/avi.png" class="avi img-fluid rounded-circle avi-pos" v-else/>
        </b-col>
        <b-col sm="9" md="9" lg="9" xl="9" class="profile-usernames-box">
          <p class="displayed-username">{{ user.displayedUsername }}</p>
          <p class="username profile-link"
          @click.stop.prevent="goToUser(user.username)"
          >@{{ user.username }}</p>
        </b-col>
      </b-row>
      <hr class="mb-0">
      <b-row :class="{'followed': followed}" v-if="!isLoggedUser()">
        <b-col sm="12" class="text-center follow-box pt-3" @click.prevent="follow()">
          <span v-if="followed" class="follow-text">{{ $t('userProfile.unfollow') }}</span>
          <span v-else class="follow-text">{{ $t('userProfile.follow') }}</span>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import i18n from '@/i18n'

export default {
  name: 'UserProfileResultSmall',
  components: {
    i18n
  },
  props: ['user'],
  data () {
    return {
      followed: false
    }
  },
  methods: {
    follow () {
      let uuid = this.$props.user.uuid
      if (this.followed) {
        this.axios.post('http://localhost:8080/api/users/' + uuid + '/unfollow', {}, { withCredentials: true })
          .then((response) => {
            this.followed = !response.data.unfollowed
          })
          .catch(() => {
            alert(i18n.t('userProfile.failedToCancelFollow'))
          })
      } else {
        this.axios.post('http://localhost:8080/api/users/' + uuid + '/follow', {}, { withCredentials: true })
          .then((response) => {
            this.followed = response.data.followed
          })
          .catch(() => {
            alert(i18n.t('userProfile.failedToFollow'))
          })
      }
    },
    goToUser (username) {
      this.$router.push({path: `/user/${username}`})
    },
    checkIfFollowed () {
      let uuid = this.$props.user.uuid
      if (this.$store.getters.userPresent()) {
        this.axios.get('http://localhost:8080/api/users/' + uuid + '/follow', { withCredentials: true })
          .then((response) => {
            this.followed = response.data.followed
          })
      }
    },
    isLoggedUser () {
      if (this.$store.state.user == null) {
        return false
      }
      let loggedUserUuid = this.$store.state.user.uuid
      let userProfileUuid = this.$props.user.uuid
      return loggedUserUuid === userProfileUuid
    }
  },
  mounted () {
    this.checkIfFollowed()
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

.avi {
  width: 70px;
  height: 70px;
}
</style>
