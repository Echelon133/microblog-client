<template>
  <div class="pt-3 scrollable">
    <b-row v-if="this.$store.getters.userPresent()">
      <b-col sm="12">
        <div class="new-post-input">
          <label for="post-content" class="form-label">{{ $t('feed.postContent') }} </label>
          <span class="length-counter">{{ newPostContent.length }}/{{ maxPostLength }}</span>
          <div class="input-group">
            <b-form-textarea v-model="newPostContent" class="form-control" id="post-content" rows="4"></b-form-textarea>
            <b-button variant="primary"
            :disabled="isPostLengthInvalid()"
            @click.prevent="onNewPost"
            >{{ $t('feed.send') }}
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row v-if="this.$store.getters.userPresent()">
      <b-col offset-sm="8" sm="4" class="pt-5">
        <p v-if="showPopular" @click.prevent="flipFilter" class="feed-filter">{{ $t('feed.showing') }} <span class="filter-text">{{ $t('feed.mostPopular') }}</span></p>
        <p v-else @click.prevent="flipFilter" class="feed-filter">{{ $t('feed.showing') }} <span class="filter-text">{{ $t('feed.mostRecent') }}</span></p>
      </b-col>
    </b-row>
    <div class="pt-1">
      <PostList :posts="posts"/>
      <b-col sm="12" class="my-3 px-5" v-if="posts.length > 0">
        <b-button class="load-more-btn"
        @click.prevent="loadPosts()"
        variant="primary"
        >{{ $t('feed.morePosts') }}</b-button>
      </b-col>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconStar, BIconStarFill } from 'bootstrap-vue'
import PostList from '@/components/PostList'
import Vue from 'vue'

export default {
  name: 'Feed',
  title () {
    return this.$i18n.t('feed.title')
  },
  components: {
    PostList, BIcon, BIconStar, BIconStarFill
  },
  data () {
    return {
      newPostContent: '',
      maxPostLength: 300,
      posts: [],
      showPopular: false
    }
  },
  methods: {
    flipFilter () {
      this.showPopular = !this.showPopular
      Vue.$cookies.set('showPopular', this.showPopular)
      this.posts = []
      this.loadPosts()
    },
    onNewPost () {
      this.$store.dispatch('check_auth')
        .then(() => {
          let postContent = this.newPostContent
          this.axios.post('/posts', {content: postContent}, { withCredentials: true })
            .then((response) => {
              this.$router.push({path: `/post/${response.data.uuid}`})
            })
            .catch(() => {
              alert(this.$i18n.t('feed.failure'))
            })
          this.newPostContent = ''
        })
        .catch(() => {
          alert(this.$i18n.t('feed.failure'))
        })
    },
    isPostLengthInvalid () {
      return this.newPostContent.length === 0 || this.newPostContent.length > this.maxPostLength
    },
    loadPosts () {
      let skip = this.posts.length
      let params = {
        skip: skip
      }
      if (this.$store.getters.userPresent()) {
        // if the user is logged in, either let them get the most popular posts or the most recent posts
        if (this.showPopular) {
          this.axios.get('/feed/popular', {params: params, withCredentials: true})
            .then((response) => {
              this.posts.push(...response.data)
            })
        } else {
          this.axios.get('/feed/', {params: params, withCredentials: true})
            .then((response) => {
              this.posts.push(...response.data)
            })
        }
      } else {
        // if the user is anonymous, show the most popular posts
        this.axios.get('/feed/popular', {params: params})
          .then((response) => {
            this.posts.push(...response.data)
          })
      }
    }
  },
  mounted () {
    if (Vue.$cookies.get('showPopular') == null) {
      Vue.$cookies.set('showPopular', this.showPopular)
    } else {
      this.showPopular = Vue.$cookies.get('showPopular') === 'true'
    }

    this.$store.dispatch('check_auth')
      .then(() => {
        this.loadPosts()
      })
  }
}
</script>

<style scoped>
.length-counter {
  float: right;
}

.scrollable {
  overflow-y: auto;
  height: 80vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.feed-filter {
  font-size: 18px;
}

.feed-filter:hover {
  cursor: pointer;
}

.filter-text {
  font-weight: bold;
}

.load-more-btn {
  margin-top: 15px;
  width: 100%;
  margin: 0;
}
</style>
