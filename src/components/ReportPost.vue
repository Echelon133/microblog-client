<template>
  <b-modal title="Report post" ref="reportPost" id="reportPostModal" hide-footer>
    <form class="report" @submit.prevent="onReport">
      <b-alert show v-if="success" variant="success">Post reported</b-alert>
      <b-alert show v-if="failure" variant="danger">Failed to report post</b-alert>
      <b-form-group label="Report reason">
        <b-form-radio v-model="report.reason" value="spam">Spam</b-form-radio>
        <b-form-radio v-model="report.reason" value="abusive">Abusive</b-form-radio>
        <b-form-radio v-model="report.reason" value="against_tos">Against ToS</b-form-radio>
      </b-form-group>
      <label for="displayedUsername" class="visually-hidden mt-2">Description</label>
      <textarea
        v-model="report.description"
        v-bind:class="{invalidval: descriptionInvalid()}"
        type="text" id="description" class="form-control mt-2" placeholder="Description" autofocus="" rows="5"></textarea>
      <b-button class="w-100 mt-5" variant="danger" type="submit">Report</b-button>
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
  props: ['uuid'],
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
            this.$root.$emit('bv::hide::modal', 'reportPostModal', '#btnShowReportModal')
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
