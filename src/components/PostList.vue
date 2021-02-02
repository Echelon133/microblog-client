<template>
  <b-row class="posts">
    <b-col xl="9" offset-xl="1" class="text-center pt-5" v-if="posts.length === 0">
      <span class="no-content-text">Brak postów</span>
    </b-col>
    <b-col xl="9" offset-xl="1" class="pt-5" v-else>
      <Post v-for="post in posts" :key="post.uuid" :post="post"/>
    </b-col>
  </b-row>
</template>

<script>
import Post from '@/components/Post'

export default {
  name: 'PostList',
  props: ['posts'],
  components: {
    Post
  }
}
</script>

<style scoped>
.no-content-text {
  font-size: 40px;
}
</style>
