<template>
  <div class="user-card">
    <h2>{{ user.name }}</h2>
    <p class="biography">{{ user.biography }}</p>
    <div class="metadata">
      <small>ID: {{ user.id }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{
  user: User
}>()

</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.biography {
  color: #666;
  line-height: 1.5;
  margin: 10px 0;
}

.metadata {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  color: #999;
  font-size: 0.85em;
}
</style> 