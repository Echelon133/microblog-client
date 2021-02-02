<template>
  <b-row>
    <b-col>
      <div class="post my-3 mx-5 pb-2">
        <b-row class="pt-2">
          <b-col sm="4" md="2" lg="1" xl="1">
            <img src="/static/avi.png" class="img-fluid rounded-circle post-avi">
          </b-col>
          <b-col sm="4" md="8" lg="7" xl="7" class="user-info">
            <p class="mb-0"> {{ post.author.displayedUsername }} </p>
            <a class="profile-link" href="#">@{{ post.author.username }}</a>
          </b-col>
          <b-col sm="4" md="2" lg="4" xl="4">
            <p class="mt-3 pr-4 date-info">DATE</p>
          </b-col>
        </b-row>
        <hr>
        <div v-if="post.quotes" class="quoted-post my-1 mx-4">
          <b-row class="pt-2">
            <b-col sm="4" md="2" lg="1" xl="1">
              <img src="/static/avi.png" class="img-fluid rounded-circle post-avi p-2">
            </b-col>
            <b-col sm="4" md="8" lg="7" xl="7" class="user-info">
              <p class="mb-0"> Username </p>
              <a class="profile-link" href="#">@username</a>
            </b-col>
            <b-col sm="4" md="2" lg="4" xl="4">
              <p class="mt-3 pr-3 date-info">DATE</p>
            </b-col>
          </b-row>
          <b-row class="pt-3 px-5">
            <b-col>
              <p class="post-content-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut non blandit diam, quis congue augue. Phasellus sit amet tincidunt arcu, in auctor turpis. Maecenas convallis dui mi, vel rutrum quam lobortis a. Donec sed ultricies libero, eget pharetra ante. Nam sed dui ante. Quisque a nunc eu neque quis.</p>
            </b-col>
          </b-row>
        </div>
        <b-row v-if="post.respondsTo">
          <b-col lg="12" class="ml-5">
            <span class="response-info">W odpowiedzi do </span><a class="profile-link" href="#">@otheruser</a>
          </b-col>
        </b-row>
        <b-row class="pt-2 px-5">
          <b-col>
            <p class="post-content-text">{{ post.content }}</p>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col lg="4" class="text-center post-stats-item" @click.prevent="showResponses(post.uuid)">
            <b-icon icon="chat-dots" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ responses }}</span>
          </b-col>
          <b-col lg="4" class="text-center post-stats-item" @click.prevent="quote(post.uuid)">
            <b-icon icon="chat-quote" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ quotes }}</span>
          </b-col>
          <b-col lg="4" class="text-center post-stats-item" @click.prevent="like(post.uuid)">
            <b-icon v-if="liked" icon="plus-square-fill" scale="1.5"></b-icon>
            <b-icon v-else icon="plus-square" scale="1.5"></b-icon>
            <span class="stats-number p-2">{{ likes }}</span>
          </b-col>
        </b-row>
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
      responses: 0,
      quotes: 100,
      likes: 200,
      liked: false
    }
  },
  methods: {
    showResponses (uuid) {
      console.log('Show responses to ' + uuid)
    },
    quote (uuid) {
      console.log('Quote ' + uuid)
    },
    like (uuid) {
      console.log('Like ' + uuid)
      if (this.liked) {
        this.liked = false
        this.likes -= 1
      } else {
        this.liked = true
        this.likes += 1
      }
    }
  }
}
</script>

<style scoped>
.post {
  background-color:#555555;
  border-radius: 15px;
}

.post-avi {
  max-width: 70px;
  padding: 10px;
}

.quoted-post {
  background-color: #444444;
  border-radius: 15px;
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

.profile-link {
  color:#333333;
  text-decoration: none;
}

.profile-link:hover {
  color:#333333;
  text-decoration: underline;
}

.response-info {
    font-style: italic;
}

.post-content-text {
  font-size: 21px;
}
</style>
