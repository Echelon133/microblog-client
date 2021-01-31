<template>
  <b-card nobody class="profile-panel mt-5">
    <b-card-body>
      <img src="static/avi.png" class="avi"/>
      <b-card-title>{{ user.displayedUsername }}</b-card-title>
      <b-card-sub-title class="mb-2">{{ user.username }}</b-card-sub-title>
      <b-card-text>
        {{ user.description }}
      </b-card-text>
    </b-card-body>
    <b-list-group flush>
      <b-list-group-item class="profile-panel-item">Obserwujący {{ user.followedBy }}</b-list-group-item>
      <b-list-group-item class="profile-panel-item">Obserwowani {{ user.following }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: 'SidePanel',
  data () {
    return {
      user: {
        displayedUsername: 'username',
        username: '@username',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer malesuada placerat accumsan. Mauris vulputate lacus in quam posuere feugiat. Proin sit amet sollicitudin quam. Integer efficitur convallis tortor eu mattis. Cras ut fringilla urna. Praesent dapibus feugiat libero, eget faucibus leo in.',
        following: 30,
        followedBy: 10
      }
    }
  }
}
</script>

<style scoped>
.profile-panel {
  background-color:#555555;
  border-radius: 15px;
}

.profile-panel-item {
  background-color: #696464;
  border-radius: 5px;
}

.avi {
  width: 80px;
  height: 80px;
  border-radius:50%;
}
</style>
