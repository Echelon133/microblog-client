<template>
  <div class="pt-3 scrollable">
    <b-row v-if="this.$store.getters.userPresent()">
      <b-col xl="9" offset-xl="1">
        <div class="new-post-input">
          <label for="post-content" class="form-label">{{ $t('feed.postContent') }} </label>
          <span class="length-counter">{{ newPostContent.length }}/{{ maxPostLength }}</span>
          <div class="input-group">
            <b-form-textarea v-model="newPostContent" class="form-control" id="post-content" rows="4"></b-form-textarea>
            <b-button variant="secondary"
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
      <b-col sm="9" offset-sm="1" class="my-3 px-5" v-if="posts.length > 0">
        <b-button class="load-more-btn"
        @click.prevent="loadPosts()"
        >{{ $t('feed.morePosts') }}</b-button>
      </b-col>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconStar, BIconStarFill } from 'bootstrap-vue'
import PostList from '@/components/PostList'
import Vue from 'vue'
import i18n from '@/i18n'

export default {
  name: 'Feed',
  components: {
    PostList, BIcon, BIconStar, BIconStarFill, i18n
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
          this.axios.post('http://localhost:8080/api/posts', {content: postContent}, { withCredentials: true })
            .then((response) => {
              this.$router.push({path: `/post/${response.data.uuid}`})
            })
            .catch(() => {
              alert(i18n.t('feed.failure'))
            })
          this.newPostContent = ''
        })
        .catch(() => {
          alert(i18n.t('feed.failure'))
        })
    },
    isPostLengthInvalid () {
      return this.newPostContent.length === 0 || this.newPostContent.length > this.maxPostLength
    },
    loadPosts () {
      let params = {}
      let skip = this.posts.length
      if (this.showPopular) {
        params = {
          since: 'DAY',
          by: 'POPULARITY',
          skip: skip
        }
      } else {
        params = {
          since: 'DAY',
          skip: skip
        }
      }

      this.axios.get('http://localhost:8080/api/feed', {params: params, withCredentials: true})
        .then((response) => {
          this.posts.push(...response.data)
        })
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
  height: 90vh;
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
