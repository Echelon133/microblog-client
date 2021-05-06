<template>
  <b-modal :title="$t('reportPost.reportPost')" :id="uuid" hide-footer>
    <form class="report" @submit.prevent="onReport">
      <b-alert show v-if="success" variant="success">{{ $t('reportPost.success') }}</b-alert>
      <b-alert show v-if="failure" variant="danger">{{ $t('reportPost.failure') }}</b-alert>
      <b-form-group :label="$t('reportPost.reason')">
        <b-form-radio v-model="report.reason" value="spam">{{ $t('reportPost.spam') }}</b-form-radio>
        <b-form-radio v-model="report.reason" value="abusive">{{ $t('reportPost.abusive') }}</b-form-radio>
        <b-form-radio v-model="report.reason" value="against_tos">{{ $t('reportPost.againstTos') }}</b-form-radio>
      </b-form-group>
      <label for="displayedUsername" class="visually-hidden mt-2">{{ $t('reportPost.description') }}</label>
      <textarea
        v-model="report.description"
        v-bind:class="{invalidval: descriptionInvalid()}"
        type="text" id="description" class="form-control mt-2" autofocus="" rows="5"></textarea>
      <b-button class="w-100 mt-5" variant="danger" type="submit">{{ $t('reportPost.report') }}</b-button>
    </form>
  </b-modal>
</template>

<style scoped>
.invalidval {
  border: 3px solid red;
}
</style>

<script>
import i18n from '@/i18n'

export default {
  props: ['uuid'],
  components: {
    i18n
  },
  methods: {
    descriptionInvalid () {
      return this.report.description.length > 300
    },
    onReport () {
      this.$store.dispatch('check_auth')
        .then(() => {
          let report = this.report
          this.axios.post('http://localhost:8080/api/reports',
            report,
            { withCredentials: true })
            .then(() => {
              this.failure = false
              this.success = true
            })
            .catch(() => {
              this.success = false
              this.failure = true
            })
          setTimeout(() => {
            let uuid = this.$props.uuid
            this.$bvModal.hide(uuid)
          }, 2000)
        })
    }
  },
  data () {
    return {
      success: false,
      failure: false,
      report: {
        reportedPostUuid: this.$props.uuid,
        reason: '',
        description: ''
      }
    }
  }
}
</script>
