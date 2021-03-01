<template>
  <b-row>
    <b-col>
      <div class="post my-3 mx-5 pb-2" @click.stop.prevent="goToPost(post.uuid)">
        <b-row class="pt-2">
          <b-col sm="4" md="2" lg="1" xl="1">
            <img src="/static/avi.png" class="img-fluid rounded-circle post-avi">
          </b-col>
          <b-col sm="4" md="8" lg="7" xl="7" class="user-info">
            <p class="mb-0"> {{ post.author.displayedUsername }} </p>
            <a class="profile-link"
            @click.stop.prevent="goToUser(post.author.username)"
            >@{{ post.author.username }}</a>
          </b-col>
          <b-col sm="4" md="2" lg="4" xl="4">
            <p class="mt-3 pr-4 date-info" :title="new Date(post.date)">{{ this.postInfo.dateDelta }}</p>
          </b-col>
        </b-row>
        <hr>
        <div v-if="postInfo.quotedPost.post" class="quoted-post my-1 mx-4" @click.stop.prevent="goToPost(postInfo.quotedPost.post.uuid)">
          <b-row class="pt-2">
            <b-col sm="4" md="2" lg="1" xl="1">
              <img src="/static/avi.png" class="img-fluid rounded-circle post-avi p-2">
            </b-col>
            <b-col sm="4" md="8" lg="7" xl="7" class="user-info">
              <p class="mb-0"> {{ postInfo.quotedPost.post.author.displayedUsername }} </p>
              <a class="profile-link"
              @click.stop.prevent="goToUser(postInfo.quotedPost.post.author.username)"
              >@{{ postInfo.quotedPost.post.author.username }}</a>
            </b-col>
            <b-col sm="4" md="2" lg="4" xl="4">
              <p class="mt-3 pr-3 date-info" :title="new Date(postInfo.quotedPost.post.date)">{{ postInfo.quotedPost.dateDelta }}</p>
            </b-col>
          </b-row>
          <b-row class="pt-3 px-5">
            <b-col>
              <p class="post-content-text">{{ postInfo.quotedPost.post.content }}</p>
            </b-col>
          </b-row>
        </div>
        <b-row v-if="postInfo.respondsToPost">
          <b-col lg="12" class="ml-5">
            <span class="response-info">W odpowiedzi do </span>
            <a class="profile-link"
            @click.stop.prevent="goToUser(postInfo.respondsToPost.author.username)"
            >@{{ postInfo.respondsToPost.author.username }}</a>
          </b-col>
        </b-row>
        <b-row class="pt-2 px-5">
          <b-col>
            <p class="post-content-text">{{ post.content }}</p>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col sm="4" md="4" lg="4" class="text-center post-stats-item" @click.stop.prevent="toggleResponseBox()">
            <b-icon icon="chat-dots" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.responses }}</span>
          </b-col>
          <b-col sm="4" md="4" lg="4" class="text-center post-stats-item" @click.stop.prevent="toggleQuoteBox()">
            <b-icon icon="chat-quote" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.quotes }}</span>
          </b-col>
          <b-col sm="4" md="4" lg="4" class="text-center post-stats-item" @click.stop.prevent="like()">
            <b-icon v-if="postInfo.liked" icon="plus-square-fill" scale="1.5"></b-icon>
            <b-icon v-else icon="plus-square" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.likes }}</span>
          </b-col>
        </b-row>
      </div>
    </b-col>
    <b-col xl="12" v-if="response.showBox">
      <div class="response-input my-3 mx-5 pb-2">
        <label for="response-content" class="form-label">Treść odpowiedzi: </label>
        <span class="length-counter">{{ response.content.length }}/{{ maxContentLength }}</span>
        <div class="input-group">
          <b-form-textarea v-model="response.content" class="form-control" rows="4"></b-form-textarea>
          <b-button variant="secondary"
          :disabled="isResponseLengthInvalid()"
          @click.prevent="onNewResponse"
          >Odpowiedz
          </b-button>
        </div>
      </div>
    </b-col>
    <b-col xl="12" v-if="quote.showBox">
      <div class="quote-input my-3 mx-5 pb-2">
        <label for="quote-content" class="form-label">Treść odpowiedzi cytującej: </label>
        <span class="length-counter">{{ quote.content.length }}/{{ maxContentLength }}</span>
        <div class="input-group">
          <b-form-textarea v-model="quote.content" class="form-control" rows="4"></b-form-textarea>
          <b-button variant="secondary"
          :disabled="isQuoteLengthInvalid()"
          @click.prevent="onNewQuote"
          >Cytuj
          </b-button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { BIcon, BIconPlusSquare, BIconPlusSquareFill, BIconChatDots, BIconChatQuote } from 'bootstrap-vue'

export default {
  name: 'Post',
  props: ['post'],
  components: {
    BIcon, BIconPlusSquare, BIconPlusSquareFill, BIconChatDots, BIconChatQuote
  },
  data () {
    return {
      postInfo: {
        responses: 0,
        quotes: 0,
        likes: 0,
        liked: false,
        quotedPost: {post: null, dateDelta: null},
        respondsToPost: null,
        dateDelta: null
      },
      response: {
        content: '',
        showBox: false
      },
      quote: {
        content: '',
        showBox: false
      },
      maxContentLength: 300
    }
  },
  methods: {
    toggleResponseBox () {
      this.quote.showBox = false
      if (this.response.showBox) {
        this.response.showBox = false
      } else {
        this.response.showBox = true
      }
    },
    onNewResponse () {
      console.log(this.response.content)
      this.response.content = ''
      this.response.showBox = false
    },
    isResponseLengthInvalid () {
      return this.response.content.length === 0 || this.response.content.length > this.maxContentLength
    },
    toggleQuoteBox () {
      this.response.showBox = false
      if (this.quote.showBox) {
        this.quote.showBox = false
      } else {
        this.quote.showBox = true
      }
    },
    onNewQuote () {
      console.log(this.quote.content)
      this.quote.content = ''
      this.quote.showBox = false
    },
    isQuoteLengthInvalid () {
      return this.quote.content.length === 0 || this.quote.content.length > this.maxContentLength
    },
    like () {
      console.log('Like ' + this.$vnode.key)
      if (this.postInfo.liked) {
        this.postInfo.liked = false
        this.postInfo.likes -= 1
      } else {
        this.postInfo.liked = true
        this.postInfo.likes += 1
      }
    },
    loadQuote () {
      let quoteUuid = this.$props.post.quotes
      if (quoteUuid) {
        this.axios.get('http://localhost:8080/api/posts/' + quoteUuid).then((response) => {
          this.postInfo.quotedPost.post = response.data
          let quotedPostDate = new Date(this.postInfo.quotedPost.post.date)
          this.postInfo.quotedPost.dateDelta = this.convertDateToDeltaText(quotedPostDate)
        })
      }
    },
    loadRespondsToPost () {
      let respondsToPostUuid = this.$props.post.respondsTo
      if (respondsToPostUuid) {
        this.axios.get('http://localhost:8080/api/posts/' + respondsToPostUuid).then((response) => {
          this.postInfo.respondsToPost = response.data
        })
      }
    },
    loadPostInfo () {
      let postUuid = this.$props.post.uuid
      this.axios.get('http://localhost:8080/api/posts/' + postUuid + '/info').then((response) => {
        this.postInfo.quotes = response.data.quotes
        this.postInfo.responses = response.data.responses
        this.postInfo.likes = response.data.likes
      })
    },
    convertMainPostDateToDeltaText () {
      let mainPostDate = new Date(this.$props.post.date)
      this.postInfo.dateDelta = this.convertDateToDeltaText(mainPostDate)
    },
    convertDateToDeltaText (dateToConvert) {
      let now = new Date()
      let dateDiffInYears = Math.floor(this.dateDiffInYears(dateToConvert, now))
      let dateDiffInMonths = Math.floor(this.dateDiffInMonths(dateToConvert, now))
      let dateDiffInDays = Math.floor(this.dateDiffInDays(dateToConvert, now))
      let dateDiffInHours = Math.floor(this.dateDiffInHours(dateToConvert, now))
      let dateDiffInMinutes = Math.floor(this.dateDiffInMinutes(dateToConvert, now))

      if (dateDiffInYears >= 1) {
        return dateDiffInYears + 'y'
      } else if (dateDiffInMonths >= 1) {
        return dateDiffInMonths + 'm'
      } else if (dateDiffInDays >= 1) {
        return dateDiffInDays + 'd'
      } else if (dateDiffInHours >= 1) {
        return dateDiffInHours + 'h'
      } else {
        return dateDiffInMinutes + 'min'
      }
    },
    dateDiffInMinutes (date1, date2) {
      return (date2 - date1) / 1000 / 60
    },
    dateDiffInHours (date1, date2) {
      return (date2 - date1) / 1000 / 60 / 60
    },
    dateDiffInDays (date1, date2) {
      return (date2 - date1) / 1000 / 60 / 60 / 24
    },
    dateDiffInMonths (date1, date2) {
      return (date2.getMonth() - date1.getMonth()) + (12 * (date2.getFullYear() - date1.getFullYear()))
    },
    dateDiffInYears (date1, date2) {
      return this.dateDiffInMonths(date1, date2) / 12
    },
    goToPost (postUuid) {
      this.$router.push({path: `/post/${postUuid}`})
    },
    goToUser (username) {
      this.$router.push({path: `/user/${username}`})
    }
  },
  mounted () {
    this.loadQuote()
    this.loadRespondsToPost()
    this.loadPostInfo()
    this.convertMainPostDateToDeltaText()
  }
}
</script>

<style scoped>
.post {
  background-color:#555555;
  border-radius: 15px;
}

.post:hover {
  background-color: #646363;
}

.post-avi {
  max-width: 70px;
  padding: 10px;
}

.quoted-post {
  background-color: #444444;
  border-radius: 15px;
}

.quoted-post:hover {
  background-color: #535252;
}

.stats-icon {
  width: 30px;
}

.stats-number {
  font-size: 20px;
}

.post-stats-item {
  margin-bottom: 20px;
}

.post-stats-item:hover {
  cursor: pointer;
}

.user-info {
  margin-top: 10px;
  padding-left: 20px;
}

.date-info {
  color: grey;
  float: right;
}

.date-info:hover {
  text-decoration: underline;
}

.profile-link {
  color:#333333;
  text-decoration: none;
}

.profile-link:hover {
  color:#333333;
  text-decoration: underline;
  cursor: pointer;
}

.response-info {
    font-style: italic;
}

.post-content-text {
  font-size: 21px;
}

.length-counter {
  float: right;
}
</style>
