<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="9" offset-sm="1" class="profile-box">
        <b-row>
          <b-col sm="12">
            <img src="/static/avi.png" class="img-fluid rounded-circle p-4"/>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" class="profile-usernames-box">
            <p class="displayed-username">{{ user.user.displayedUsername }}</p>
            <p class="username">@{{ user.user.username }}</p>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col sm="12" class="user-description-box">
            <p>{{ user.user.description }}</p>
          </b-col>
        </b-row>
        <hr>
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

export default {
  name: 'UserProfile',
  components: {
    PostList, UserProfileResultSmall
  },
  data () {
    return {
      user: {
        user: {},
        followedBy: 0,
        following: 0
      },
      followedBy: [],
      following: [],
      posts: []
    }
  },
  methods: {
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
      console.log('load more posts')
      this.loadRecentUserPosts()
    }
  },
  mounted () {
    this.loadFullUserProfile()
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
  margin-left: 15px;
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
</style>
