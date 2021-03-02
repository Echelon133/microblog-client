<template>
  <div class="pt-5 scrollable">
    <b-row>
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
    <div class="pt-5">
      <PostList :posts="posts"/>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'

export default {
  name: 'Feed',
  components: {
    PostList
  },
  data () {
    return {
      newPostContent: '',
      maxPostLength: 300,
      posts: []
    }
  },
  methods: {
    onNewPost () {
      console.log(this.newPostContent)
      this.newPostContent = ''
    },
    isPostLengthInvalid () {
      return this.newPostContent.length === 0 || this.newPostContent.length > this.maxPostLength
    },
    loadPosts () {
      this.axios.get('http://localhost:8080/api/posts/popular').then((response) => {
        this.posts = response.data
      })
    }
  },
  mounted () {
    this.loadPosts()
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
</style>