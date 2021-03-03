<template>
  <p class="post-content-text">
    <template v-for="(word, w) in postWords">
      <template v-if="createTagObject(word)">
        <a class="clickable-tag"
        :key="w"
        @click.stop.prevent="goToTag(createTagObject(word).tag)"
        >#{{createTagObject(word).tag}}</a>{{createTagObject(word).remainder}}
      </template>
      <template v-else>{{word}}</template>
    </template>
  </p>
</template>

<script>
export default {
  name: 'PostContent',
  props: ['content'],
  methods: {
    goToTag (tagname) {
      this.$router.push({path: `/tag/${tagname}`})
    },
    createTagObject (word) {
      let tagPattern = RegExp(/#[a-zA-Z0-9]{2,20}/)
      let matchedPhrase = word.match(tagPattern)
      if (matchedPhrase) {
        // if tag is valid and longer than max characters allowed
        // split it into the valid part and the remaining part
        // e.g. #aaaaaaaaaabbbbbbbbbbccc has valid part '#aaaaaaaaaabbbbbbbbbb' and
        // remainder 'ccc'
        return {
          tag: matchedPhrase[0].substring(1),
          remainder: word.substring(matchedPhrase[0].length)
        }
      }
      return null
    }
  },
  computed: {
    postWords () {
      return this.content.split(/(\s+)/)
    }
  }
}
</script>

<style scoped>
/deep/ .clickable-tag {
  cursor: pointer;
  color: #bbbbbb;
}

.post-content-text {
  font-size: 21px;
}
</style>
