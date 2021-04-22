<template>
  <b-row>
    <b-col class="text-center not-found-box">
      <p class="not-found-number mb-0">404</p>
      <p class="not-found-text">{{ $t('notFound.notFound') }}</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Not Found'
}
</script>

<style scoped>
.not-found-box {
  padding-top:200px;
}

.not-found-number {
  font-size: 35px;
}

.not-found-text {
  font-size: 45px;
}
</style>
