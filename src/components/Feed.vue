<template>
  <div class="pt-5">
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
    }
  }
}
</script>

<style scoped>
.length-counter {
  float: right;
}
</style>
