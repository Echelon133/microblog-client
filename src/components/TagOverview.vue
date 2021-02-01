<template>
  <h1>Tag: {{ $route.params.tagname }}</h1>
</template>

<script>
export default {
  name: 'TagOverview'
}
</script>

<style scoped>
h1 {
  padding-top:200px;
  text-align: center;
}
</style>
