<template>
  <span @click="showKnownFollowersModal" class="clickable">
    {{ $t('knownFollowers.followedBy') }}
      <span>
        <template v-if="follows.length >= 1">
          <b-avatar variant="primary" size="1rem" :src="follows[0].aviURL" v-if="follows[0].aviURL"></b-avatar>
          <b-avatar variant="primary" size="1rem" src="/static/avi.png" v-else></b-avatar>
          <span class="username">{{ follows[0].displayedUsername }}</span>
        </template>
        <template v-if="follows.length >= 2">
          <template v-if="follows.length === 2">
            {{ $t('knownFollowers.and') }}
          </template>
          <template v-else>
            ,
          </template>
          <b-avatar variant="primary" size="1rem" :src="follows[1].aviURL" v-if="follows[1].aviURL"></b-avatar>
          <b-avatar variant="primary" size="1rem" src="/static/avi.png" v-else></b-avatar>
          <span class="username">{{ follows[1].displayedUsername }}</span>
        </template>
        <template v-if="follows.length > 2">
          {{ $t('knownFollowers.andMore') }}
        </template>
      </span>
  </span>
</template>

<script>
export default {
  props: ['follows'],
  methods: {
    showKnownFollowersModal () {
      this.$bvModal.show('knownFollowers')
    }
  }
}
</script>

<style scoped>
.username {
  font-style: oblique;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}
</style>
