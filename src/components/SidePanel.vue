<template>
  <b-sidebar id="popular" :title="$t('sidePanel.popularTags')" shadow>
    <b-dropdown size="sm" id="tag-time-filter" :text="$t('sidePanel.filter')" class="m-2" variant="primary">
      <b-dropdown-item @click.prevent="timeFilter('hour')">{{ $t('sidePanel.lastHour') }}</b-dropdown-item>
      <b-dropdown-item @click.prevent="timeFilter('day')">{{ $t('sidePanel.lastDay') }}</b-dropdown-item>
      <b-dropdown-item @click.prevent="timeFilter('week')">{{ $t('sidePanel.lastWeek') }}</b-dropdown-item>
    </b-dropdown>
    <b-list-group flush>
      <b-list-group-item
      class="tag-item text-center"
      v-for="tag in tags" :key="tag.uuid"
      @click.prevent="goToTag(tag.name)"
      >#{{ tag.name }}</b-list-group-item>
    </b-list-group>
  </b-sidebar>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'SidePanel',
  data () {
    return {
      tags: []
    }
  },
  methods: {
    timeFilter (filter) {
      Vue.$cookies.set('tagFilter', filter)
      this.getTags()
    },
    getTags () {
      this.tags = []
      let filter = Vue.$cookies.get('tagFilter')
      if (filter == null) {
        Vue.$cookies.set('tagFilter', 'hour')
        filter = Vue.$cookies.get('tagFilter')
      }
      this.axios.get('http://localhost:8080/api/tags/popular?since=' + filter).then((response) => {
        this.tags = response.data
      })
    },
    goToTag (tag) {
      this.$router.push({path: `/tag/${tag}`})
    }
  },
  mounted () {
    this.getTags()
  }
}
</script>

<style scoped>
.tag-item {
  border-radius: 5px;
  font-size: 25px;
  cursor: pointer;
}

.tag-item:hover {
  background-color:white;
  border: 1px solid #0275d8;
  color: #0275d8;
  text-decoration: underline;
}
</style>
