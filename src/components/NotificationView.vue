<template>
  <div class="pt-5 scrollable">
    <b-row>
      <b-col sm="10" offset-sm="1" class="tag-box">
        <b-row>
          <b-col sm="12">
            <h1 class="notifications-text">{{ $t("notificationView.allNotifications") }}</h1>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="12" lg="12" xl="12" class="text-center my-5" v-if="notifications.length === 0">
        <span class="no-content-text">{{ $t("notificationView.noNotifications") }}</span>
      </b-col>
      <b-col sm="12" md="12" lg="12" xl="12" class="my-5" v-else>
        <NotificationItemLarge v-for="n in notifications" :key="n.uuid" :notification="n"/>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="10" offset-sm="1" class="pt-2 pb-5">
        <b-button class="load-more-btn"
        variant="primary"
        @click.prevent="loadNotifications()"
        >{{ $t("notificationView.moreNotifications") }}</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NotificationItemLarge from '@/components/NotificationItemLarge'

export default {
  name: 'NotificationView',
  components: {
    NotificationItemLarge
  },
  data () {
    return {
      notifications: []
    }
  },
  methods: {
    loadNotifications () {
      let length = this.notifications.length
      let params = {
        limit: 20,
        skip: length
      }
      this.axios.get('/notifications', {params: params, withCredentials: true})
        .then((response) => {
          this.notifications.push(...response.data)
        })
    }
  },
  mounted () {
    this.loadNotifications()
  }
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 90vh;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollable::-webkit-scrollbar {
  display: none;
}

.tag-box {
  background-color:#f7f7f7;
  border: 1px solid #0275d8;
  border-radius: 15px;
}

.notifications-text {
  padding: 20px 20px 20px 20px;
}

.load-more-btn {
  margin-top: 15px;
  width: 100%;
  margin: 0;
}

.no-content-text {
  font-size: 40px;
}
</style>
