<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col xl="9" offset-xl="1">
        <div class="pt-0 mx-5">
          <Post v-if="parent" :post="parent" :key="parent.uuid"/>
          <b-row v-if="parentDeleted">
            <b-col>
              <div class="deleted-post my-3 mx-5 pb-2 text-center">
                <h3 class="py-5 deleted-post-msg">{{ $t('postView.postDeleted') }}</h3>
              </div>
            </b-col>
          </b-row>
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
      responses: [],
      parentDeleted: false
    }
  },
  methods: {
    loadParent () {
      let parentUuid = this.mainPost.respondsTo
      this.axios.get('http://localhost:8080/api/posts/' + parentUuid).then((response) => {
        this.parent = response.data
      }).catch((err) => {
        if (err.response.status === 404) {
          this.parentDeleted = true
        }
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
      }).catch(() => {
        this.$router.push({path: '/404'})
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
    this.$store.dispatch('check_auth')
      .then(() => {
        this.init()
      })
  },
  watch: {
    '$route.params.uuid': function () {
      // when the component is being reused, parent needs to be reset before
      // calling the loadPost method, otherwise parent is the only variable
      // that is not refreshed and the displayed structure of posts might
      // be inaccurate in some cases
      this.parent = null
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

.deleted-post {
  background-color:#555555;
  border-radius: 15px;
}

.deleted-post-msg {
  color: #333333;
}
</style>
