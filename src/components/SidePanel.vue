<template>
  <b-card class="tag-list mt-5">
    <b-card-title class="text-center">Popularne tagi
      <b-dropdown size="sm" id="tag-time-filter" text="Wybierz przedział czasowy" class="m-2">
        <b-dropdown-item @click.prevent="timeFilter('hour')">Ostatnia godzina</b-dropdown-item>
        <b-dropdown-item @click.prevent="timeFilter('day')">Ostatnie 24h</b-dropdown-item>
        <b-dropdown-item @click.prevent="timeFilter('week')">Ostatni tydzień</b-dropdown-item>
      </b-dropdown>
    </b-card-title>
    <b-list-group flush>
      <b-list-group-item class="tag-item text-center"
      v-for="tag in tags" :key="tag.tagname"
      >#{{ tag.tagname }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'SidePanel',
  data () {
    return {
      tags: [
        {tagname: 'tag1'},
        {tagname: 'tag2'},
        {tagname: 'tag3'},
        {tagname: 'tag4'},
        {tagname: 'tag5'}
      ]
    }
  },
  methods: {
    timeFilter (value) {
      console.log(value)
    }
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
}

.tag-item:hover {
  background-color:#555555;
  border: 1px solid #696464;
}
</style>
