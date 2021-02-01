<template>
  <div class="pt-5">
    <b-row>
      <b-col xl="9" offset-xl="1">
        <div class="new-post-input">
          <label for="post-content" class="form-label">Treść nowego wpisu: </label>
          <span class="length-counter">{{ newPostContent.length }}/{{ maxPostLength }}</span>
          <div class="input-group">
            <b-form-textarea v-model="newPostContent" class="form-control" id="post-content" rows="4"></b-form-textarea>
            <b-button variant="secondary"
            :disabled="newPostContent.length === 0 || newPostContent.length > maxPostLength"
            @click.prevent="onNewPost"
            >Wyślij
            </b-button>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'Feed',
  components: {
  },
  data () {
    return {
      newPostContent: '',
      maxPostLength: 300
    }
  },
  methods: {
    onNewPost () {
      console.log(this.newPostContent)
      this.newPostContent = ''
    }
  }
}
</script>

<style scoped>
.length-counter {
  float: right;
}
</style>
