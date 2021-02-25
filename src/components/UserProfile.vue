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
            <p class="displayed-username">{{ user.displayedUsername }}</p>
            <p class="username">@{{ user.username }}</p>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col sm="12" class="user-description-box">
            <p>{{ user.description }}</p>
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
        uuid: '328ee4f9-d806-4d3a-a7a6-ce6d4c444deb',
        displayedUsername: 'Test User',
        username: 'testuser',
        description: 'This is the description of testuser',
        followedBy: 0,
        following: 0
      },
      followedBy: [
        {
          uuid: '328ee4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Test User',
          username: 'testuser'
        },
        {
          uuid: '4000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Another User',
          username: 'anotheruser'
        },
        {
          uuid: '2000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Last User',
          username: 'lastuser'
        }
      ],
      following: [
        {
          uuid: '1000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Test User1',
          username: 'testuser1'
        },
        {
          uuid: '9000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Another User1',
          username: 'anotheruser1'
        },
        {
          uuid: '2000e4f9-d806-4d3a-a7a6-ce6d4c444deb',
          displayedUsername: 'Last User1',
          username: 'lastuser1'
        }
      ],
      posts: [
        { uuid: 'ae25b197-4861-4a72-abc9-4c5c9c497999',
          content: 'Test content test content test content',
          author: {
            username: 'testuser', displayedUsername: 'Test User'
          },
          quotes: null,
          respondsTo: null
        },
        { uuid: '6b808a1c-2ca0-4e38-a160-cf490bac9a86',
          content: 'Another test content post',
          author: {
            username: 'testuser', displayedUsername: 'Test User'
          },
          quotes: 'ae25b197-4861-4a72-abc9-4c5c9c497999',
          respondsTo: null
        },
        { uuid: '6b808a1g-2ca0-4e38-a160-cf490bac9a86',
          content: 'Last content post test',
          author: {
            username: 'testuser', displayedUsername: 'Test User'
          },
          quotes: null,
          respondsTo: '6b808a1c-2ca0-4e38-a160-cf490bac9a86'
        }
      ]
    }
  },
  methods: {
    showFollowingModal () {
      this.$refs['following'].show()
    },
    loadMoreFollowing () {
      console.log('Load more following')
    },
    showFollowedByModal () {
      this.$refs['followedBy'].show()
    },
    loadMoreFollowedBy () {
      console.log('Load more followedBy')
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
