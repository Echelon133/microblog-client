<template>
  <b-row class="py-1 result-box">
    <b-col sm="12" class="profile-box">
      <b-row>
        <b-col sm="3">
          <div class="pl-2 pt-3">
            <b-avatar variant="primary" size="4rem" :src="user.aviURL" v-if="user.aviURL"></b-avatar>
            <b-avatar variant="primary" size="4rem" src="/static/avi.png" v-else></b-avatar>
          </div>
        </b-col>
        <b-col sm="9" class="profile-usernames-box">
          <p class="displayed-username">{{ user.displayedUsername }}</p>
          <p class="username profile-link"
          @click.stop.prevent="goToUser(user.username)"
          >@{{ user.username }}</p>
        </b-col>
      </b-row>
      <hr class="mb-0">
      <b-row :class="{'followed': followed}" v-if="showFollowOption()">
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
    showFollowOption () {
      // don't show follow option if the user is not logged in
      if (!this.$store.getters.userPresent()) {
        return false
      }
      // don't show follow option if the user result is of the same
      // user as the currently logged in user
      let loggedUserUuid = this.$store.state.user.uuid
      let userProfileUuid = this.$props.user.uuid
      return loggedUserUuid !== userProfileUuid
    },
    follow () {
      let uuid = this.$props.user.uuid
      if (this.followed) {
        this.axios.delete('/users/' + uuid + '/follow', { withCredentials: true })
          .then((response) => {
            this.followed = response.data.follows
          })
          .catch(() => {
            alert(i18n.t('userProfile.failedToCancelFollow'))
          })
      } else {
        this.axios.post('/users/' + uuid + '/follow', {}, { withCredentials: true })
          .then((response) => {
            this.followed = response.data.follows
          })
          .catch(() => {
            alert(i18n.t('userProfile.failedToFollow'))
          })
      }
    },
    goToUser (username) {
      this.$emit('close-modal')
      this.$router.push({path: `/user/${username}`})
    },
    checkIfFollowed () {
      let uuid = this.$props.user.uuid
      if (this.$store.getters.userPresent()) {
        this.axios.get('/users/' + uuid + '/follow', { withCredentials: true })
          .then((response) => {
            this.followed = response.data.followed
          })
      }
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
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.profile-usernames-box {
  padding-left: 15px;
  padding-top: 15px;
}

.displayed-username {
  font-size: 35px;
  margin-bottom: 0px;
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
  color: black;
}

.followed {
  border: 2px solid white;
  background-color:#0275d8;
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
