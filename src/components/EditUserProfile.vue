<template>
  <b-modal :title="$t('editUserProfile.editProfile')" ref="editProfile" id="editProfileModal" hide-footer>
    <form class="edit" @submit.prevent="onEdit">
      <b-alert show v-if="success" variant="success">{{ $t('editUserProfile.success') }}</b-alert>
      <b-alert show v-if="failure" variant="danger">{{ $t('editUserProfile.failure') }}</b-alert>
      <label for="displayedUsername" class="visually-hidden mt-2">{{ $t('editUserProfile.displayedUsername') }}</label>
      <input
        v-model="userUpdate.displayedUsername"
        v-bind:class="{invalidval: displayedUsernameInvalid()}"
        type="text" id="displayedUsername" class="form-control mt-2" :placeholder="$t('editUserProfile.displayedUsername')" autofocus="">
      <label for="description" class="visually-hidden mt-2">{{ $t('editUserProfile.description') }}</label>
      <textarea
        v-model="userUpdate.description"
        v-bind:class="{invalidval: descriptionInvalid()}"
        type="text" id="description" class="form-control mt-2" :placeholder="$t('editUserProfile.description')" autofocus="" rows="5"></textarea>
      <label for="aviURL" class="visually-hidden mt-2">{{ $t('editUserProfile.aviURL') }}</label>
      <input
        v-model="userUpdate.aviURL"
        type="text" id="aviURL" class="form-control mt-2" :placeholder="$t('editUserProfile.aviURL')" autofocus="">
      <button class="w-100 btn btn-lg btn-primary mt-5" type="submit" :disabled="disableEdit()">{{ $t('editUserProfile.saveEdit') }}</button>
    </form>
  </b-modal>
</template>

<style scoped>
.invalidval {
  border: 3px solid red;
}
</style>

<script>
export default {
  methods: {
    displayedUsernameInvalid () {
      return this.userUpdate.displayedUsername.length < 1 || this.userUpdate.displayedUsername.length > 70
    },
    descriptionInvalid () {
      return this.userUpdate.description.length < 1 || this.userUpdate.description.length > 200
    },
    disableEdit () {
      return this.displayedUsernameInvalid() || this.descriptionInvalid()
    },
    onEdit () {
      this.$store.dispatch('check_auth')
        .then(() => {
          let userUpdate = this.userUpdate
          this.axios.put('/users/me',
            userUpdate,
            { withCredentials: true })
            .then(() => {
              this.failure = false
              this.success = true
              // reload the user in the localStorage
              this.$store.dispatch('get_user')
                .then(() => {
                  setTimeout(() => this.$router.go(), 500)
                })
            })
            .catch(() => {
              this.success = false
              this.failure = true
            })
        })
    }
  },
  data () {
    return {
      success: false,
      failure: false,
      userUpdate: {
        displayedUsername: this.$store.state.user.displayedUsername,
        aviURL: this.$store.state.user.aviURL,
        description: this.$store.state.user.description
      }
    }
  }
}
</script>
