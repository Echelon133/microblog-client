<template>
  <div class="pt-5">
    <b-card class="tag-list mt-5">
      <b-card-title class="text-center">Popularne tagi
        <b-dropdown size="sm" id="tag-time-filter" text="Filtr" class="m-2">
          <b-dropdown-item @click.prevent="timeFilter('hour')">Ostatnia godzina</b-dropdown-item>
          <b-dropdown-item @click.prevent="timeFilter('day')">Ostatnie 24h</b-dropdown-item>
          <b-dropdown-item @click.prevent="timeFilter('week')">Ostatni tydzień</b-dropdown-item>
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
export default {
  name: 'SidePanel',
  data () {
    return {
      tags: []
    }
  },
  methods: {
    timeFilter (filter) {
      switch (filter.toUpperCase()) {
        case 'HOUR':
          this.getTags('HOUR')
          break
        case 'DAY':
          this.getTags('DAY')
          break
        case 'WEEK':
          this.getTags('WEEK')
          break
        default:
          this.getTags('HOUR')
          break
      }
    },
    getTags (filter) {
      this.tags = []
      this.axios.get('http://localhost:8080/api/tags/popular?since=' + filter).then((response) => {
        this.tags = response.data
      })
    },
    goToTag (tag) {
      this.$router.push({path: `/tag/${tag}`})
    }
  },
  mounted () {
    this.getTags('HOUR')
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
