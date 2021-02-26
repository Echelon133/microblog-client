<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col xl="9" offset-xl="1">
        <div class="pt-0 mx-5">
          <Post v-if="parent" :post="parent" :key="parent.uuid"/>
        </div>
        <div class="pt-3">
          <Post v-if="mainPost" :post="mainPost" :key="mainPost.uuid"/>
        </div>
        <div class="pt-0 mx-5">
          <Post v-for="response in responses" :key="response.uuid" :post="response"/>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Post from '@/components/Post'

export default {
  name: 'PostView',
  components: {
    Post
  },
  data () {
    return {
      parent: {
        uuid: '6b808a1g-2ca0-4e38-a160-cf490bac9a86',
        content: 'Parent content test',
        author: {
          username: 'anotherusername', displayedUsername: 'Another User'
        },
        quotes: null,
        respondsTo: null
      },
      mainPost: {
        uuid: '6b808a1g-2ca0-4e38-a160-cf490bac9a86',
        content: 'Last content post test',
        author: {
          username: 'anotherusername', displayedUsername: 'Another User'
        },
        quotes: null,
        respondsTo: '6b808a1c-2ca0-4e38-a160-cf490bac9a86'
      },
      responses: [
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
        }
      ]
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

.no-content-text {
  font-size: 40px;
}
</style>
