<template>
  <div id="app">
    <Header :user="this.$store.state.user"/>
    <main>
      <b-container fluid>
        <b-row>
          <b-col sm="6" offset-sm="3" class="mt-5 text-center">
            <h3>{{ $t('reportsPanel.reportsPanel') }}</h3>
          </b-col>
        </b-row>
        <b-row class="mt-5">
          <b-col sm="12">
            <b-form inline>
              <b-form-checkbox @change="reloadReports" v-model="checked" name="check-button" switch>
                <b>{{ $t('reportsPanel.showAlreadyModerated') }}</b>
              </b-form-checkbox>
              <b-button variant="primary" @click.prevent="loadReports" class="ml-3">{{ $t('reportsPanel.loadMore') }}</b-button>
            </b-form>
            <b-table-simple responsive hover fixed sticky-header="700px" class="mt-2">
              <b-thead>
                <b-tr>
                  <b-th>{{ $t('reportsPanel.reportedBy') }}</b-th>
                  <b-th>{{ $t('reportsPanel.postAuthor') }}</b-th>
                  <b-th>{{ $t('reportsPanel.postContent') }}</b-th>
                  <b-th>{{ $t('reportsPanel.deleted') }}</b-th>
                  <b-th>{{ $t('reportsPanel.reason') }}</b-th>
                  <b-th>{{ $t('reportsPanel.description') }}</b-th>
                  <b-th>{{ $t('reportsPanel.reportChecked') }}</b-th>
                  <b-th>{{ $t('reportsPanel.action') }}</b-th>
                </b-tr>
              </b-thead>
              <b-tbody>
                <ReportsPanelRow @reload="reloadReports" v-for="report in reports" :report="report" :key="report.uuid"/>
              </b-tbody>
            </b-table-simple>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import ReportsPanelRow from '@/components/ReportsPanelRow'
import Header from '@/components/Header'

export default {
  name: 'ReportsPanel',
  title () {
    return this.$i18n.t('reportsPanel.title')
  },
  components: {
    ReportsPanelRow, Header
  },
  data () {
    return {
      reports: [],
      checked: false
    }
  },
  methods: {
    reloadReports () {
      this.reports = []
      this.loadReports()
    },
    loadReports () {
      let skip = this.reports.length
      let checked = this.checked
      let params = {
        checked: checked,
        skip: skip
      }
      this.axios.get('/reports', {params: params, withCredentials: true})
        .then((response) => {
          this.reports.push(...response.data)
        }).catch((err) => {
          if (err.response.status === 403) {
            this.$router.push({path: '/'})
          }
        })
    }
  },
  mounted () {
    this.$store.dispatch('check_auth')
      .then(() => {
        this.loadReports()
      })
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

main {
  margin-top: 55px;
  background-color:#f7f7f7;
  font-family: 'Roboto', sans-serif;
  color: black;
  min-height: calc(100vh - 55px); /* full vh - margin-top of this block */
}

tbody {
  background-color: white;
  min-height: 1000px;
}
</style>
