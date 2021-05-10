<template>
  <b-row>
    <b-col>
      <div class="post my-3 pb-2" @click.stop.prevent="goToPost(post.uuid)">
        <b-row class="pt-2">
          <b-col sm="3" md="3" lg="2" xl="2">
            <div class="p-1">
              <b-avatar variant="primary" size="3rem" :src="post.author.aviURL" v-if="post.author.aviURL"></b-avatar>
              <b-avatar variant="primary" size="3rem" src="/static/avi.png" v-else></b-avatar>
            </div>
          </b-col>
          <b-col sm="5" md="5" lg="7" xl="8" class="user-info">
            <p class="mb-0"> {{ post.author.displayedUsername }} </p>
            <a class="profile-link"
            @click.stop.prevent="goToUser(post.author.username)"
            >@{{ post.author.username }}</a>
          </b-col>
          <b-col sm="2" md="2" lg="1" xl="1">
            <p class="mt-3 date-info" :title="new Date(post.date)">{{ this.postInfo.dateDelta }}</p>
          </b-col>
          <b-col sm="2" md="2" lg="2" xl="1" v-if="this.$store.getters.userPresent()">
            <b-dropdown class="mt-3" size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
              <template slot="button-content">
                <b-icon icon="three-dots" class="post-dropdown"></b-icon>
              </template>
              <b-dropdown-item-button @click.stop.prevent="deletePost" v-if="isPostOwnedByCurrentlyLoggedUser()">
                <span class="item-color"><b-icon icon="trash-fill"></b-icon>{{ $t('post.delete') }}</span>
              </b-dropdown-item-button>
              <b-dropdown-item-button @click.stop.prevent="reportPost" v-else>
                <span class="item-color"><b-icon icon="flag-fill"></b-icon>{{ $t('post.report') }}</span>
                </b-dropdown-item-button>
                <ReportPost :uuid="post.uuid" :showModal="showReportModal"/>
            </b-dropdown>
          </b-col>
        </b-row>
        <hr>
        <div v-if="postInfo.quotedPost.post" class="quoted-post my-1 mx-4" @click.stop.prevent="goToPost(postInfo.quotedPost.post.uuid)">
          <b-row class="pt-2">
            <b-col sm="3" md="3" lg="2" xl="2">
              <div class="p-1">
                <b-avatar variant="primary" size="3rem" :src="post.author.aviURL" v-if="post.author.aviURL"></b-avatar>
                <b-avatar variant="primary" size="3rem" src="/static/avi.png" v-else></b-avatar>
              </div>
            </b-col>
            <b-col sm="5" md="5" lg="8" xl="8" class="user-info">
              <p class="mb-0"> {{ postInfo.quotedPost.post.author.displayedUsername }} </p>
              <a class="profile-link"
              @click.stop.prevent="goToUser(postInfo.quotedPost.post.author.username)"
              >@{{ postInfo.quotedPost.post.author.username }}</a>
            </b-col>
            <b-col sm="4" md="4" lg="2" xl="2">
              <p class="mt-3 pr-3 date-info" :title="new Date(postInfo.quotedPost.post.date)">{{ postInfo.quotedPost.dateDelta }}</p>
            </b-col>
          </b-row>
          <b-row class="pt-3 px-5">
            <b-col>
              <PostContent :content="postInfo.quotedPost.post.content"/>
            </b-col>
          </b-row>
        </div>
        <div v-if="postInfo.quotesDeletedPost" class="quoted-post my-1 mx-4 text-center">
          <h3 class="py-5 deleted-post-msg">{{ $t('postView.postDeleted') }}</h3>
        </div>
        <b-row v-if="postInfo.respondsToPost">
          <b-col sm="12" class="ml-5">
            <span class="response-info">{{ $t('post.replyingTo') }} </span>
            <a class="profile-link"
            @click.stop.prevent="goToUser(postInfo.respondsToPost.author.username)"
            >@{{ postInfo.respondsToPost.author.username }}</a>
          </b-col>
        </b-row>
        <b-row v-if="postInfo.respondsToDeletedPost">
          <b-col sm="12" class="ml-5">
            <span class="response-info">{{ $t('post.replyingTo') }} </span>
            <a class="profile-link">[{{ $t('post.postRemoved') }}]</a>
          </b-col>
        </b-row>
        <b-row class="pt-2 px-5">
          <b-col>
            <PostContent :content="post.content"/>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col sm="4" class="text-center post-stats-item" @click.stop.prevent="executeIfLoggedIn(toggleResponseBox)">
            <b-icon icon="chat-dots" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.responses }}</span>
          </b-col>
          <b-col sm="4" class="text-center post-stats-item" @click.stop.prevent="executeIfLoggedIn(toggleQuoteBox)">
            <b-icon icon="chat-quote" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.quotes }}</span>
          </b-col>
          <b-col sm="4" class="text-center post-stats-item" @click.stop.prevent="executeIfLoggedIn(like)">
            <b-icon v-if="postInfo.liked" icon="plus-square-fill" scale="1.5"></b-icon>
            <b-icon v-else icon="plus-square" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ postInfo.likes }}</span>
          </b-col>
        </b-row>
      </div>
    </b-col>
    <b-col sm="12" v-if="response.showBox">
      <div class="response-input my-3 mx-5 pb-2">
        <label for="response-content" class="form-label">{{ $t('post.responseContent') }}: </label>
        <span class="length-counter">{{ response.content.length }}/{{ maxContentLength }}</span>
        <div class="input-group">
          <b-form-textarea v-model="response.content" class="form-control" rows="4"></b-form-textarea>
          <b-button variant="primary"
          :disabled="isResponseLengthInvalid()"
          @click.prevent="onNewResponse"
          >{{ $t('post.respond') }}
          </b-button>
        </div>
      </div>
    </b-col>
    <b-col sm="12" v-if="quote.showBox">
      <div class="quote-input my-3 mx-5 pb-2">
        <label for="quote-content" class="form-label">{{ $t('post.quoteContent') }}: </label>
        <span class="length-counter">{{ quote.content.length }}/{{ maxContentLength }}</span>
        <div class="input-group">
          <b-form-textarea v-model="quote.content" class="form-control" rows="4"></b-form-textarea>
          <b-button variant="primary"
          :disabled="isQuoteLengthInvalid()"
          @click.prevent="onNewQuote"
          >{{ $t('post.quote') }}
          </b-button>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import { BIcon, BIconPlusSquare, BIconPlusSquareFill, BIconChatDots, BIconChatQuote, BIconTrashFill, BIconFlagFill, BIconThreeDots } from 'bootstrap-vue'
import PostContent from '@/components/PostContent'
import ReportPost from '@/components/ReportPost'
import i18n from '@/i18n'

export default {
  name: 'Post',
  props: ['post'],
  components: {
    BIcon, BIconPlusSquare, BIconPlusSquareFill, BIconChatDots, BIconChatQuote, BIconTrashFill, BIconFlagFill, BIconThreeDots, PostContent, ReportPost, i18n
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
        respondsToDeletedPost: false,
        quotesDeletedPost: false,
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
      maxContentLength: 300,
      dateDeltaRefreshTimer: null,
      showReportModal: false
    }
  },
  methods: {
    isPostOwnedByCurrentlyLoggedUser () {
      if (this.$store.state.user == null) {
        return false
      }
      let loggedUserUsername = this.$store.state.user.username
      let postAuthorUsername = this.$props.post.author.username
      return loggedUserUsername === postAuthorUsername
    },
    deletePost () {
      let confirmed = confirm(i18n.t('post.deleteConfirm'))
      if (confirmed) {
        this.$store.dispatch('check_auth')
          .then(() => {
            let postUuid = this.$vnode.key
            this.axios.delete('http://localhost:8080/api/posts/' + postUuid,
              {withCredentials: true})
              .then(() => {
                alert(i18n.t('post.deleteSuccess'))
                setTimeout(() => this.$router.go(), 500)
              })
              .catch(() => {
                alert(i18n.t('post.deleteFailed'))
              })
          })
      }
    },
    reportPost () {
      this.$bvModal.show(this.$props.post.uuid)
    },
    executeIfLoggedIn (func) {
      if (this.$store.getters.userPresent()) {
        func()
      } else {
        alert(i18n.t('post.userNotLogged'))
      }
    },
    toggleResponseBox () {
      this.quote.showBox = false
      if (this.response.showBox) {
        this.response.showBox = false
      } else {
        this.response.showBox = true
      }
    },
    onNewResponse () {
      let postUuid = this.$vnode.key
      let responseContent = this.response.content
      this.$store.dispatch('check_auth')
        .then(() => {
          this.axios.post('http://localhost:8080/api/posts/' + postUuid + '/respond',
            {content: responseContent},
            {withCredentials: true})
            .then((res) => {
              this.response.content = ''
              this.response.showBox = false
              this.goToPost(res.data.uuid)
            })
            .catch(() => {
              alert(i18n.t('post.responseFailed'))
            })
        })
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
      let postUuid = this.$vnode.key
      let quoteContent = this.quote.content
      this.$store.dispatch('check_auth')
        .then(() => {
          this.axios.post('http://localhost:8080/api/posts/' + postUuid + '/quote',
            {content: quoteContent},
            {withCredentials: true})
            .then((response) => {
              this.quote.content = ''
              this.quote.showBox = false
              this.goToPost(response.data.uuid)
            })
            .catch(() => {
              alert(i18n.t('post.quoteFailed'))
            })
        })
    },
    isQuoteLengthInvalid () {
      return this.quote.content.length === 0 || this.quote.content.length > this.maxContentLength
    },
    like () {
      let postUuid = this.$vnode.key
      if (!this.postInfo.liked) {
        this.axios.post('http://localhost:8080/api/posts/' + postUuid + '/like', {}, {withCredentials: true})
          .then((response) => {
            this.postInfo.liked = response.data.liked
            this.postInfo.likes += 1
          })
      } else {
        this.axios.post('http://localhost:8080/api/posts/' + postUuid + '/unlike', {}, {withCredentials: true})
          .then((response) => {
            this.postInfo.liked = !response.data.unliked
            this.postInfo.likes -= 1
          })
      }
    },
    loadQuote () {
      let quoteUuid = this.$props.post.quotes
      if (quoteUuid) {
        this.axios.get('http://localhost:8080/api/posts/' + quoteUuid).then((response) => {
          this.postInfo.quotedPost.post = response.data
          this.convertQuotedPostDateToDeltaText()
        }).catch((err) => {
          if (err.response.status === 404) {
            this.postInfo.quotesDeletedPost = true
          }
        })
      }
    },
    loadRespondsToPost () {
      let respondsToPostUuid = this.$props.post.respondsTo
      if (respondsToPostUuid) {
        this.axios.get('http://localhost:8080/api/posts/' + respondsToPostUuid).then((response) => {
          this.postInfo.respondsToPost = response.data
        }).catch((err) => {
          if (err.response.status === 404) {
            this.postInfo.respondsToDeletedPost = true
          }
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
    checkIfLiked () {
      let postUuid = this.$props.post.uuid
      // only try to check if the post is liked by the current user if the user is logged in
      if (this.$store.getters.userPresent()) {
        this.axios.get('http://localhost:8080/api/posts/' + postUuid + '/like', { withCredentials: true })
          .then((response) => {
            this.postInfo.liked = response.data.liked
          })
      }
    },
    refreshDateDeltas () {
      this.convertMainPostDateToDeltaText()
      // only refresh quotedPost dateDelta if it's set in the first place
      if (this.postInfo.quotedPost.dateDelta) {
        this.convertQuotedPostDateToDeltaText()
      }
    },
    convertMainPostDateToDeltaText () {
      let mainPostDate = new Date(this.$props.post.date)
      this.postInfo.dateDelta = this.convertDateToDeltaText(mainPostDate)
    },
    convertQuotedPostDateToDeltaText () {
      let quotedPostDate = new Date(this.postInfo.quotedPost.post.date)
      this.postInfo.quotedPost.dateDelta = this.convertDateToDeltaText(quotedPostDate)
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
    this.checkIfLiked()
    // refresh date deltas every minute
    this.dateDeltaRefreshTimer = setInterval(
      this.refreshDateDeltas,
      1000 * 60
    )
  }
}
</script>

<style scoped>
.post {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.post:hover {
  background-color: #f1f1f1;
}

.quoted-post {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.quoted-post:hover {
  background-color: #f1f1f1;
}

.stats-icon {
  width: 30px;
}

.stats-number {
  font-size: 20px;
}

.post-stats-item {
  margin-bottom: 20px;
  color: #0275d8;
}

.post-stats-item:hover {
  cursor: pointer;
}

.user-info {
  margin-top: 10px;
}

.date-info {
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

.length-counter {
  float: right;
}

.delete-button {
  color: red;
}

.delete-button:hover {
  cursor: pointer;
}

.deleted-post-msg {
  color: #333333;
}

.post-dropdown {
  color: black;
}

.item-color {
  color: red;
}
</style>
