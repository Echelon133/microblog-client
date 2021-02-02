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
      posts: [
        { uuid: 'ae25b197-4861-4a72-abc9-4c5c9c497999',
          content: 'Test content test content test content',
          author: {
            username: 'testusername', displayedUsername: 'Test User'
          },
          quotes: null,
          respondsTo: null
        },
        { uuid: '6b808a1c-2ca0-4e38-a160-cf490bac9a86',
          content: 'Another test content post',
          author: {
            username: 'diffusername', displayedUsername: 'Diff User'
          },
          quotes: 'ae25b197-4861-4a72-abc9-4c5c9c497999',
          respondsTo: null
        },
        { uuid: '6b808a1g-2ca0-4e38-a160-cf490bac9a86',
          content: 'Last content post test',
          author: {
            username: 'anotherusername', displayedUsername: 'Another User'
          },
          quotes: null,
          respondsTo: '6b808a1c-2ca0-4e38-a160-cf490bac9a86'
        }
      ]
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
