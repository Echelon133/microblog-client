<template>
  <b-tr>
    <b-th @click="goToUser(report.reportAuthorUsername)" class="clickable">
      @{{ report.reportAuthorUsername }}
    </b-th>
    <b-th @click="goToUser(report.postAuthorUsername)" class="clickable">
      @{{ report.postAuthorUsername }}
    </b-th>
    <b-th>{{ report.postContent }}</b-th>
    <b-th class="text-center">
      <span v-if="report.postDeleted">
        <b-icon class="green-icon" icon="check-circle-fill" scale="2"></b-icon>
      </span>
      <span v-else>
        <b-icon class="red-icon" icon="x-circle-fill" scale="2"></b-icon>
      </span>
    </b-th>
    <b-th>{{ displayReason(report.reason) }}</b-th>
    <b-th>{{ report.description }}</b-th>
    <b-th class="text-center">
      <span v-if="report.checked">
        <b-icon class="green-icon" icon="check-circle-fill" scale="2"></b-icon>
      </span>
      <span v-else>
        <b-icon class="red-icon" icon="x-circle-fill" scale="2"></b-icon>
      </span>
    </b-th>
    <b-th>
      <b-button-group vertical>
        <b-button variant="success" @click.prevent="acceptReport()" :disabled="report.checked">{{ $t('reportsPanelRow.accept') }}</b-button>
        <b-button variant="danger" @click.prevent="rejectReport()" :disabled="report.checked">{{ $t('reportsPanelRow.reject') }}</b-button>
      </b-button-group>
    </b-th>
  </b-tr>
</template>

<script>
import { BIcon, BIconCheckCircleFill, BIconXCircleFill } from 'bootstrap-vue'
import i18n from '@/i18n'

export default {
  props: ['report'],
  components: {
    BIcon, BIconCheckCircleFill, BIconXCircleFill, i18n
  },
  methods: {
    acceptReport () {
      let uuid = this.report.uuid
      this.axios.post('/reports/' + uuid + '?accept=true',
        {}, {withCredentials: true})
        .then((response) => {
          if (response.data.checked) {
            this.$emit('reload')
          }
        })
    },
    rejectReport () {
      let uuid = this.report.uuid
      this.axios.post('/reports/' + uuid + '?accept=false',
        {}, {withCredentials: true})
        .then((response) => {
          if (response.data.checked) {
            this.$emit('reload')
          }
        })
    },
    displayReason (reason) {
      let value = ''
      switch (reason) {
        case 'SPAM':
          value = i18n.t('reportsPanelRow.spam')
          break
        case 'AGAINST_TOS':
          value = i18n.t('reportsPanelRow.againstTos')
          break
        case 'ABUSIVE':
          value = i18n.t('reportsPanelRow.abusive')
          break
        default:
          break
      }
      return value
    },
    goToUser (username) {
      this.$router.push({path: `/user/${username}`})
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}

.clickable:hover {
  text-decoration: underline;
}

.green-icon {
  color: green;
}

.red-icon {
  color: red;
}
</style>
