<template>
  <div id="app">
    <Header :user="this.$store.state.user"/>
    <main>
      <b-container fluid>
        <b-row>
          <b-col sm="4" md="3" lg="3" xl="2" offset-xl="1">
            <SidePanel/>
          </b-col>
          <b-col sm="8" md="9" lg="9" xl="9">
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
