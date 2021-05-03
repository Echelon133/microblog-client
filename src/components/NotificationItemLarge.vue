<template>
  <b-row class="text-center mt-2">
    <b-col offset-sm="3" sm="6" class="notification-item py-1"
    @click.prevent="readNotification()"
    :class="{read: this.$props.notification.read}">
      <a class="clickable-username" @click.prevent.stop="goToUser()">@{{ this.$props.notification.notifiedBy }}</a>
      <span v-if="this.$props.notification.type === 'quote'">
        {{ $t("notificationItemLarge.quote") }}
      </span>
      <span v-else-if="this.$props.notification.type === 'mention'">
        {{ $t("notificationItemLarge.mention") }}
      </span>
      <span v-else-if="this.$props.notification.type === 'response'">
        {{ $t("notificationItemLarge.response") }}
      </span>
      <span v-else>
      </span>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'NotificationItemLarge',
  props: ['notification'],
  methods: {
    readNotification () {
      let notificationUuid = this.$props.notification.uuid
      let postUuid = this.$props.notification.notificationPost

      this.axios.post('http://localhost:8080/api/notifications/' + notificationUuid + '/read', {}, {withCredentials: true})
        .then((response) => {
          if (response.data.read) {
            this.$props.notification.read = true
          }
          this.$router.push({path: `/post/${postUuid}`})
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

.notification-item {
  min-height: 50px;
  color: white;
  background-color: #555555;
  font-size: 25px;
  cursor: pointer;
  border-radius: 15px;
}
</style>
