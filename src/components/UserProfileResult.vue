<template>
  <b-row class="mt-5">
    <b-col sm="8" offset-sm="2" class="profile-box">
      <b-row>
        <b-col sm="12">
          <b-media class="pl-3 pt-3">
            <template #aside>
              <div class="p-2">
                <b-avatar variant="primary" size="6rem" :src="user.aviURL" v-if="user.aviURL"></b-avatar>
                <b-avatar variant="primary" size="6rem" src="/static/avi.png" v-else></b-avatar>
              </div>
            </template>
            <p class="displayed-username">{{ user.displayedUsername }}</p>
            <p class="username profile-link"
            @click.stop.prevent="goToUser(user.username)"
            >@{{ user.username }}</p>
          </b-media>
        </b-col>
      </b-row>
      <hr v-if="user.description">
      <b-row v-if="user.description">
        <b-col sm="12" class="user-description-box">
          <p>{{ user.description }}</p>
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
  name: 'UserProfileResult',
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
.profile-box {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.profile-usernames-box {
  padding-left: 15px;
  padding-top:15px;
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
}

.follow-text {
  font-size: 20px;
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
  width: 100px;
  height: 100px;
}
</style>
