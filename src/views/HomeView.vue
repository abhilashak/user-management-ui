<script setup lang="ts">
import UserList from '../components/UserList.vue';
</script>

<template>
  <main class="home">
    <h1>User Management</h1>
    <UserList />
  </main>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
}
</style>
