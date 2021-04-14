<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="9" offset-sm="1" class="tag-box">
        <b-row>
          <b-col sm="12">
            <h1 class="tag-name">Tag #{{ $route.params.tagname }}</h1>
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
      <b-col sm="9" offset-sm="1" class="pt-2 pb-5">
        <b-button class="load-more-btn"
        @click.prevent="loadPosts()"
        >Wczytaj więcej postów</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PostList from '@/components/PostList'

export default {
  name: 'TagOverview',
  components: {
    PostList
  },
  data () {
    return {
      posts: []
    }
  },
  methods: {
    loadPosts () {
      // first - find tag uuid
      let name = this.$route.params.tagname
      this.axios.get('http://localhost:8080/api/tags?name=' + name).then((response) => {
        let tagUuid = response.data.uuid
        let skip = this.posts.length
        this.axios.get('http://localhost:8080/api/tags/' + tagUuid + '/recentPosts', {
          params: {
            skip: skip,
            limit: 5
          }
        })
          .then((response) => {
            this.posts.push(...response.data)
          })
      })
    }
  },
  mounted () {
    this.loadPosts()
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

.tag-box {
  background-color:#555555;
  border-radius: 15px;
}

.tag-name {
  padding: 20px 20px 20px 20px;
}

.load-more-btn {
  margin-top: 15px;
  width: 100%;
  margin: 0;
}
</style>
