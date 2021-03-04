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
      parent: null,
      mainPost: null,
      responses: []
    }
  },
  methods: {
    loadParent () {
      let parentUuid = this.mainPost.respondsTo
      this.axios.get('http://localhost:8080/api/posts/' + parentUuid).then((response) => {
        this.parent = response.data
      })
    },
    loadPost () {
      let postUuid = this.$route.params.uuid
      this.axios.get('http://localhost:8080/api/posts/' + postUuid).then((response) => {
        this.mainPost = response.data
        // if the loaded mainPost is a post that responds to some other post
        // try to load that other post
        if (this.mainPost.respondsTo) {
          this.loadParent()
        }
      })
    },
    loadResponses () {
      let postUuid = this.$route.params.uuid
      this.axios.get('http://localhost:8080/api/posts/' + postUuid + '/responses').then((response) => {
        this.responses = response.data
      })
    },
    init () {
      this.loadPost()
      this.loadResponses()
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route.params.uuid': function () {
      this.init()
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
