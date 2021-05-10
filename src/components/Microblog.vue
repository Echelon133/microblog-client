<template>
  <div id="app">
    <Header :user="this.$store.state.user"/>
    <main>
      <b-container fluid>
        <div>
          <b-button v-b-toggle.popular variant="primary">{{ $t('microblog.showPopular') }}</b-button>
          <SidePanel/>
        </div>
        <b-row>
          <b-col offset-sm="1" sm="10">
            <span v-b-hover="hoverBackButton">
              <b-icon v-if="isBackButtonHovered"
              class="back-button"
              icon="arrow-left-circle-fill"
              scale="3"
              @click.prevent="goBack()"
              ></b-icon>
              <b-icon v-else
              class="back-button"
              icon="arrow-left-circle"
              scale="3"
              @click.prevent="goBack()"
              ></b-icon>
            </span>
            <router-view/>
          </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'
import SidePanel from '@/components/SidePanel'
import { BIcon, BIconArrowLeftCircle, BIconArrowLeftCircleFill } from 'bootstrap-vue'

export default {
  name: 'Microblog',
  components: {
    Header, SidePanel, BIcon, BIconArrowLeftCircle, BIconArrowLeftCircleFill
  },
  data () {
    return {
      isBackButtonHovered: false
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    hoverBackButton (status) {
      this.isBackButtonHovered = status
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

main {
  margin-top: 55px;
  background-color:#303030;
  font-family: 'Roboto', sans-serif;
  color: white;
  min-height: calc(100vh - 55px); /* full vh - margin-top of this block */
}

.back-button {
  cursor: pointer;
  margin-top: 45px;
  margin-left: 15px;
}
</style>
