<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="9" offset-sm="1" class="profile-box">
        <b-row>
          <b-col sm="10">
            <img :src="user.user.aviURL" class="avi img-fluid rounded-circle p-4" v-if="user.user.aviURL">
            <img src="/static/avi.png" class="avi img-fluid rounded-circle p-4" v-else/>
          </b-col>
          <b-col sm="2" class="pt-5" v-if="isLoggedUserProfile()">
            <b-button
            @click.prevent="showEditProfileModal()" ref="btnShowEditProfile">Edytuj profil</b-button>
            <EditUserProfile/>
          </b-col>
          <b-col sm="2" class="pt-5" v-else>
            <b-button v-if="user.followed"
            @click.prevent="executeIfLoggedIn(followUser)"
            >Nie obserwuj
            </b-button>
            <b-button v-else
            @click.prevent="executeIfLoggedIn(followUser)"
            >Obserwuj
            </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" class="profile-usernames-box">
            <p class="displayed-username">{{ user.user.displayedUsername }}</p>
            <p class="username">@{{ user.user.username }}</p>
          </b-col>
        </b-row>
        <hr>
        <b-row v-show="user.user.description">
          <b-col sm="12" class="user-description-box">
            <p>{{ user.user.description }}</p>
          </b-col>
        </b-row>
        <hr v-show="user.user.description">
        <b-row>
          <b-col sm="6" class="text-center counter">
            <b-modal body-class="modal-height" title="Lista obserwowanych" ref="following" hide-footer>
              <b-container fluid class="scrollable-modal">
                <UserProfileResultSmall v-for="user in following" :key="user.uuid" :user="user"/>
                <b-button class="load-more-btn"
                @click.prevent="loadMoreFollowing()"
                >Wczytaj więcej</b-button>
              </b-container>
            </b-modal>
            <p
            @click="showFollowingModal()"
            class="clickable-item"
            >Obserwowani: {{ user.following }}</p>
          </b-col>
          <b-col sm="6" class="text-center counter">
            <b-modal body-class="modal-height" title="Lista obserwujących" ref="followedBy" hide-footer>
              <b-container fluid class="scrollable-modal">
                <UserProfileResultSmall v-for="user in followedBy" :key="user.uuid" :user="user"/>
                <b-button class="load-more-btn"
                @click.prevent="loadMoreFollowedBy()"
                >Wczytaj więcej</b-button>
              </b-container>
            </b-modal>
            <p
            @click="showFollowedByModal()"
            class="clickable-item"
            >Obserwujący: {{ user.followedBy }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12" xl="12">
        <PostList :posts="posts"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="9" offset-sm="1" class="my-3 px-5">
        <b-button class="load-more-btn"
        @click.prevent="loadMoreUserPosts()"
        >Wczytaj więcej postów</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import UserProfileResultSmall from '@/components/UserProfileResultSmall'
import EditUserProfile from '@/components/EditUserProfile'

export default {
  name: 'UserProfile',
  components: {
    PostList, UserProfileResultSmall, EditUserProfile
  },
  data () {
    return {
      user: {
        user: {},
        followedBy: 0,
        following: 0,
        followed: false
      },
      followedBy: [],
      following: [],
      posts: []
    }
  },
  methods: {
    executeIfLoggedIn (func) {
      if (this.$store.getters.userPresent()) {
        func()
      } else {
        alert('Użytkownik nie jest zalogowany')
      }
    },
    followUser () {
      let uuid = this.user.user.uuid
      if (this.user.followed) {
        this.axios.post('http://localhost:8080/api/users/' + uuid + '/unfollow', {}, { withCredentials: true })
          .then((response) => {
            this.user.followed = !response.data.unfollowed
          })
          .catch(() => {
            alert('Nie udało się anulować obserwowania')
          })
      } else {
        this.axios.post('http://localhost:8080/api/users/' + uuid + '/follow', {}, { withCredentials: true })
          .then((response) => {
            this.user.followed = response.data.followed
          })
          .catch(() => {
            alert('Nie udało się obserwować użytkownika')
          })
      }
    },
    checkIfFollowed () {
      let uuid = this.user.user.uuid
      if (this.$store.getters.userPresent()) {
        this.axios.get('http://localhost:8080/api/users/' + uuid + '/follow', { withCredentials: true })
          .then((response) => {
            this.user.followed = response.data.followed
          })
      }
    },
    showEditProfileModal () {
      this.$root.$emit('bv::show::modal', 'editProfileModal', '#btnShowEditProfile')
    },
    isLoggedUserProfile () {
      if (this.$store.getters.userPresent()) {
        return this.$store.state.user.uuid === this.user.user.uuid
      }
      return false
    },
    showFollowingModal () {
      this.$refs['following'].show()
      if (this.following.length === 0) {
        this.loadFollowing()
      }
    },
    loadMoreFollowing () {
      this.loadFollowing()
    },
    showFollowedByModal () {
      this.$refs['followedBy'].show()
      if (this.followedBy.length === 0) {
        this.loadFollowedBy()
      }
    },
    loadMoreFollowedBy () {
      this.loadFollowedBy()
    },
    loadFullUserProfile () {
      let username = this.$route.params.username
      this.axios.get('http://localhost:8080/api/users?username=' + username).then((response) => {
        this.user.user = response.data[0]
        this.loadUserProfileInfo()
        this.loadRecentUserPosts()
        this.checkIfFollowed()
      })
    },
    loadUserProfileInfo () {
      let userUuid = this.user.user.uuid
      this.axios.get('http://localhost:8080/api/users/' + userUuid + '/profile').then((response) => {
        this.user.followedBy = response.data.followers
        this.user.following = response.data.follows
      })
    },
    loadRecentUserPosts () {
      let userUuid = this.user.user.uuid
      this.axios
        .get('http://localhost:8080/api/users/' + userUuid + '/recentPosts?skip=' + this.posts.length).then((response) => {
          this.posts.push(...response.data)
        })
    },
    loadFollowedBy () {
      let userUuid = this.user.user.uuid
      this.axios
        .get('http://localhost:8080/api/users/' + userUuid + '/followedBy?skip=' + this.followedBy.length).then((response) => {
          this.followedBy.push(...response.data)
        })
    },
    loadFollowing () {
      let userUuid = this.user.user.uuid
      this.axios
        .get('http://localhost:8080/api/users/' + userUuid + '/following?skip=' + this.following.length).then((response) => {
          this.following.push(...response.data)
        })
    },
    loadMoreUserPosts () {
      this.loadRecentUserPosts()
    }
  },
  mounted () {
    this.$store.dispatch('check_auth')
      .then(() => {
        this.loadFullUserProfile()
      })
  },
  watch: {
    '$route.params.username': function () {
      this.$store.dispatch('check_auth')
        .then(() => {
          this.posts = []
          this.followedBy = []
          this.following = []
          this.loadFullUserProfile()
        })
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

.scrollable-modal {
  overflow-y: auto;
  height: 70vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable-modal::-webkit-scrollbar {
  display: none;
}

/deep/ .modal-height {
  max-height: 75vh;
}

.profile-box {
  background-color:#555555;
  border-radius: 15px;
}

.profile-usernames-box {
  padding-left: 20px;
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

.counter {
  font-size: 22px;
  padding-bottom: 15px;
}

.clickable-item {
  cursor: pointer;
}

.clickable-item:hover {
  text-decoration: underline;
}

.load-more-btn {
  margin-top: 15px;
  width: 100%;
  margin: 0;
}

.avi {
  width: 170px;
  height: 170px;
}
</style>
