<template>
  <b-nav-item-dropdown
  v-if="this.$store.getters.userPresent()"
  :no-caret='true'
  class="mr-3 bell-box"
  toggle-class="nav-link-custom" right>
    <template slot="button-content">
      <div class="mb-0">
        <b-icon class="bell" icon="bell-fill"></b-icon>
        <b-badge class="bell-badge"
        v-if="this.unreadCounter !== 0"
        variant="danger"
        >{{ this.unreadCounter }}</b-badge>
      </div>
    </template>
    <NotificationItem @readNotification="updateNotificationCounter" v-for="n in notifications" :key="n.uuid" :notification="n"/>
    <b-dropdown-divider></b-dropdown-divider>
    <b-dropdown-item @click.prevent="markAllAsRead()">
      {{ $t("notificationDropdown.markAll") }} <i>{{ $t("notificationDropdown.read") }}</i>
    </b-dropdown-item>
    <b-dropdown-item @click.prevent="viewMore()">{{ $t("notificationDropdown.viewMore") }}</b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BIcon, BIconBellFill } from 'bootstrap-vue'
import NotificationItem from '@/components/NotificationItem'

export default {
  name: 'NotificationDropdown',
  components: {
    BIcon, BIconBellFill, NotificationItem
  },
  data () {
    return {
      notifications: [],
      unreadCounter: 0
    }
  },
  methods: {
    viewMore () {
      this.$router.push({path: `/notifications`})
    },
    loadUnreadCounter () {
      this.axios.get('/notifications/unreadCounter', {withCredentials: true})
        .then((response) => {
          this.unreadCounter = response.data.unreadCounter
        })
    },
    loadNotifications () {
      this.axios.get('/notifications', {withCredentials: true})
        .then((response) => {
          this.notifications = response.data
        })
    },
    markAllAsRead () {
      this.axios.post('/notifications/readAll', {}, {withCredentials: true})
        .then(() => {
          this.loadUnreadCounter()
        })
    },
    updateNotificationCounter () {
      this.unreadCounter -= 1
    }
  },
  mounted () {
    if (this.$store.getters.userPresent()) {
      this.loadUnreadCounter()
      this.loadNotifications()
    }
  }
}
</script>

<style scoped>
.bell {
  position: relative;
}

.bell-badge {
  position: absolute;
  top: 0px;
  left: 15px;
}

.bell-box {
  min-width: 35px;
}
</style>
