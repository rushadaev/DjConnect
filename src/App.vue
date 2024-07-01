<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}

a {
  text-decoration: none;
  color: #42b983;
}

a:hover {
  text-decoration: underline;
}
</style>