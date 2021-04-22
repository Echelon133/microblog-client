<template>
  <div class="pt-5">
    <b-card class="tag-list mt-5">
      <b-card-title class="text-center">{{ $t('sidePanel.popularTags') }}
        <b-dropdown size="sm" id="tag-time-filter" :text="$t('sidePanel.filter')" class="m-2">
          <b-dropdown-item @click.prevent="timeFilter('hour')">{{ $t('sidePanel.lastHour') }}</b-dropdown-item>
          <b-dropdown-item @click.prevent="timeFilter('day')">{{ $t('sidePanel.lastDay') }}</b-dropdown-item>
          <b-dropdown-item @click.prevent="timeFilter('week')">{{ $t('sidePanel.lastWeek') }}</b-dropdown-item>
        </b-dropdown>
      </b-card-title>
      <b-list-group flush>
        <b-list-group-item
        class="tag-item text-center"
        v-for="tag in tags" :key="tag.uuid"
        @click.prevent="goToTag(tag.name)"
        >#{{ tag.name }}</b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
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
.tag-list {
  background-color:#555555;
  border-radius: 15px;
}

.tag-item {
  background-color: #696464;
  border-radius: 5px;
  font-size: 25px;
  cursor: pointer;
}

.tag-item:hover {
  background-color:#555555;
  border: 1px solid #696464;
  text-decoration: underline;
}
</style>
