<template>
  <b-dropdown-item
  @click.prevent="readNotification()"
  :class="{read: this.$props.notification.read}">
    <a class="clickable-username" @click.prevent.stop="goToUser()">@{{ this.$props.notification.notifiedBy }}</a>
    <span v-if="this.$props.notification.type === 'quote'">
      {{ $t("notificationItem.quote") }}
    </span>
    <span v-else-if="this.$props.notification.type === 'mention'">
      {{ $t("notificationItem.mention") }}
    </span>
    <span v-else-if="this.$props.notification.type === 'response'">
      {{ $t("notificationItem.response") }}
    </span>
    <span v-else>
    </span>
  </b-dropdown-item>
</template>

<script>
export default {
  name: 'NotificationItem',
  props: ['notification'],
  methods: {
    readNotification () {
      let notificationUuid = this.$props.notification.uuid
      let postUuid = this.$props.notification.notificationPost

      this.axios.post('http://localhost:8080/api/notifications/' + notificationUuid + '/read', {}, {withCredentials: true})
        .then((response) => {
          if (response.data.read) {
            this.$props.notification.read = true
            this.$router.push({path: `/post/${postUuid}`})
          }
        })
    },
    goToUser () {
      let username = this.$props.notification.notifiedBy
      this.$router.push({path: `/user/${username}`})
    }
  }
}
</script>

<style scoped>
.clickable-username {
  cursor: pointer;
}

.read {
  font-style: italic;
  color: grey;
}
</style>
