<template>
  <h1>Użytkownik: {{ $route.params.username }}</h1>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>

<style scoped>
h1 {
  padding-top:200px;
  text-align: center;
}
</style>
