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
        <b-list-group-item class="tag-item text-center"
        v-for="tag in tags" :key="tag.uuid"
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
      tags: [
        {uuid: '6884548d-8878-4f18-a81a-e655b28acfd4', name: 'tag1'},
        {uuid: 'fcf155f6-273d-4074-8792-f4859f888d75', name: 'tag2'},
        {uuid: '7b6160eb-7aef-4c74-b23e-1ab95f93a673', name: 'tag3'},
        {uuid: 'a22960be-453d-428f-9100-3d379d53f4fa', name: 'tag4'},
        {uuid: '0320ce54-10b1-44b1-9926-39a4f2e2c839', name: 'tag5'}
      ]
    }
  },
  methods: {
    timeFilter (value) {
      console.log(value)
    },
    getTags () {
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
