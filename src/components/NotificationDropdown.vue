<template>
  <b-nav-item-dropdown
  v-if="this.$store.getters.userPresent()"
  :no-caret='true'
  toggle-class="nav-link-custom" right>
    <template slot="button-content">
      <b-icon icon="bell-fill"></b-icon>
      <b-badge
      v-if="this.unreadCounter !== 0"
      variant="danger"
      >{{ this.unreadCounter }}</b-badge>
    </template>
    <NotificationItem v-for="n in notifications" :key="n.uuid" :notification="n"/>
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
      this.axios.get('http://localhost:8080/api/notifications/unreadCounter', {withCredentials: true})
        .then((response) => {
          this.unreadCounter = response.data.unreadCounter
        })
    },
    loadNotifications () {
      this.axios.get('http://localhost:8080/api/notifications', {withCredentials: true})
        .then((response) => {
          this.notifications = response.data
        })
    },
    markAllAsRead () {
      this.axios.post('http://localhost:8080/api/notifications/readAll', {}, {withCredentials: true})
        .then(() => {
          this.loadUnreadCounter()
        })
    }
  },
  mounted () {
    this.loadUnreadCounter()
    this.loadNotifications()
  }
}
</script>
