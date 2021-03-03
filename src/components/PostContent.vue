<template>
  <p class="post-content-text">
    <template v-for="(item, i) in contentItems">
      <template v-if="typeof item === 'object'">
        <a class="clickable-tag"
        :key="i"
        @click.stop.prevent="goToTag(item.tag)"
        >#{{item.tag}}</a>{{item.remainder}}
      </template>
      <template v-else>{{item}}</template>
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
    contentItems () {
      let words = this.content.split(/(\s+)/)
      let items = []
      for (const word of words) {
        let tagObject = this.createTagObject(word)
        // if the word is a tag, add tagObject to the items list
        // if the word is NOT a tag, simply add that word to the list
        if (tagObject) {
          items.push(tagObject)
        } else {
          items.push(word)
        }
      }
      return items
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
