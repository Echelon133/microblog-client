<template>
  <b-row>
    <b-col>
      <p>{{ post.author.displayedUsername }}</p>
      <p>{{ post.author.username }}</p>
      <p>{{ post.content }}</p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Post',
  props: ['post']
}
</script>
