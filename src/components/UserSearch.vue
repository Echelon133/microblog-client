<template>
  <h1>Szukany: {{ $route.params.searchname }}</h1>
</template>

<script>
export default {
  name: 'UserSearch'
}
</script>

<style scoped>
h1 {
  padding-top:200px;
  text-align: center;
}
</style>
