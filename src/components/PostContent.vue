<template>
  <p class="post-content-text">
    <template v-for="(item, i) in contentItems">
      <template v-if="(item instanceof Tag)">
        <a class="clickable"
        :key="i"
        @click.stop.prevent="goToTag(item.tag)"
        >#{{item.tag}}</a>{{item.remainder}}
      </template>
      <template v-else-if="(item instanceof Mention)">
        <a class="clickable"
        :key="i"
        @click.stop.prevent="goToUser(item.username)"
        >@{{item.username}}</a>{{item.remainder}}
      </template>
      <template v-else>{{item}}</template>
    </template>
  </p>
</template>

<script>
import Vue from 'vue'

class Tag {
  constructor (tag, remainder) {
    this.tag = tag
    this.remainder = remainder
  }
}

class Mention {
  constructor (username, remainder) {
    this.username = username
    this.remainder = remainder
  }
}

Vue.prototype.Tag = Tag
Vue.prototype.Mention = Mention

export default {
  name: 'PostContent',
  props: ['content'],
  methods: {
    goToTag (tagname) {
      this.$router.push({path: `/tag/${tagname}`})
    },
    goToUser (username) {
      this.$router.push({path: `/user/${username}`})
    },
    createTagObject (word) {
      let tagPattern = RegExp(/#[a-zA-Z0-9]{2,20}/)
      let matchedPhrase = word.match(tagPattern)
      if (matchedPhrase) {
        // if tag is valid and longer than max characters allowed
        // split it into the valid part and the remaining part
        // e.g. #aaaaaaaaaabbbbbbbbbbccc has valid part '#aaaaaaaaaabbbbbbbbbb' and
        // remainder 'ccc'
        return new Tag(
          matchedPhrase[0].substring(1),
          word.substring(matchedPhrase[0].length)
        )
      }
      return null
    },
    createMentionObject (word) {
      let mentionPattern = RegExp(/@[A-Za-z0-9]{1,30}/)
      let matchedUsername = word.match(mentionPattern)
      if (matchedUsername) {
        // if username is valid and longer than max characters allowed
        // split it into the valid part and the remaining part
        // e.g. @aaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbb has valid part
        // '@aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' and remainder 'bbb'
        return new Mention(
          matchedUsername[0].substring(1),
          word.substring(matchedUsername[0].length)
        )
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
        let mentionObject = this.createMentionObject(word)
        // if the word is a tag, add tagObject to the items list
        // if the word is a mention, add mentionObject to the items list
        // otherwise, simply add that word to the list
        if (tagObject) {
          items.push(tagObject)
        } else if (mentionObject) {
          items.push(mentionObject)
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
/deep/ .clickable {
  cursor: pointer;
  color: #bbbbbb;
}

.post-content-text {
  font-size: 21px;
}
</style>
