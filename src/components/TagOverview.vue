<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="10" offset-sm="1" class="tag-box">
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
      <b-col sm="10" offset-sm="1" class="pt-2 pb-5">
        <b-button class="load-more-btn"
        variant="primary"
        @click.prevent="loadPosts()"
        >{{ $t('tagOverview.loadMore') }}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PostList from '@/components/PostList'

export default {
  name: 'TagOverview',
  title () {
    return 'Tag #' + this.$route.params.tagname
  },
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
      this.axios.get('/tags?name=' + name).then((response) => {
        let tagUuid = response.data.uuid
        let skip = this.posts.length
        this.axios.get('/tags/' + tagUuid + '/recentPosts', {
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
    this.$store.dispatch('check_auth')
      .then(() => {
        this.loadPosts()
      })
  },
  watch: {
    '$route.params.tagname': function () {
      this.$store.dispatch('check_auth')
        .then(() => {
          this.posts = []
          this.loadPosts()
        })
    }
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 80vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.tag-box {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
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
