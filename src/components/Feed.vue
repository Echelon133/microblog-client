<template>
  <div class="pt-3 scrollable">
    <b-row v-if="this.$store.getters.userPresent()">
      <b-col xl="9" offset-xl="1">
        <div class="new-post-input">
          <label for="post-content" class="form-label">Treść nowego wpisu: </label>
          <span class="length-counter">{{ newPostContent.length }}/{{ maxPostLength }}</span>
          <div class="input-group">
            <b-form-textarea v-model="newPostContent" class="form-control" id="post-content" rows="4"></b-form-textarea>
            <b-button variant="secondary"
            :disabled="isPostLengthInvalid()"
            @click.prevent="onNewPost"
            >Wyślij
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col offset-sm="8" sm="4" class="pt-5">
        <p v-if="showPopular" @click.prevent="flipFilter" class="feed-filter">Pokazywane <span class="filter-text">najpopularniejsze</span></p>
        <p v-else @click.prevent="flipFilter" class="feed-filter">Pokazywane <span class="filter-text">najnowsze</span></p>
      </b-col>
    </b-row>
    <div class="pt-1">
      <PostList :posts="posts"/>
    </div>
  </div>
</template>

<script>
import { BIcon, BIconStar, BIconStarFill } from 'bootstrap-vue'
import PostList from '@/components/PostList'
import Vue from 'vue'

export default {
  name: 'Feed',
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
              alert('Dodanie posta zakończyło się niepowodzeniem')
            })
          this.newPostContent = ''
        })
        .catch(() => {
          alert('Dodanie posta zakończyło się niepowodzeniem')
        })
    },
    isPostLengthInvalid () {
      return this.newPostContent.length === 0 || this.newPostContent.length > this.maxPostLength
    },
    loadPosts () {
      let params = {}
      if (this.showPopular) {
        params = {
          since: 'DAY',
          by: 'POPULARITY'
        }
      } else {
        params = {
          since: 'DAY'
        }
      }

      this.axios.get('http://localhost:8080/api/feed', {params: params, withCredentials: true})
        .then((response) => {
          this.posts = response.data
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
</style>
