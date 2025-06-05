<template>
  <div class="section random-user-section">
    <div class="section-content">
      <div v-if="loading" class="loading">Loading user...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="randomUser" class="random-user">
        <h2>Random User</h2>
        <div class="user-card">
          <h3>{{ randomUser.name }}</h3>
          <p class="biography">{{ randomUser.biography }}</p>
          <div class="metadata">
            <small>ID: {{ randomUser.id }}</small>
          </div>
        </div>
        <button class="refresh-button" @click="loadRandomUser" :disabled="loading">
          Get Another Random User
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '../types/user'
import { UserService } from '../services/UserService'

const randomUser = ref<User | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const loadRandomUser = async () => {
  try {
    loading.value = true
    error.value = null
    randomUser.value = await UserService.getRandomUser()
  } catch (e) {
    error.value = 'Failed to load random user'
    console.error(e)
  } finally {
    loading.value = false
  }
}

// Expose loadRandomUser for parent components
defineExpose({
  loadRandomUser
})

onMounted(() => {
  loadRandomUser()
})
</script>

<style scoped>
.section {
  width: 100%;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.section-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.random-user-section {
  background-color: #f8f9fa;
}

.user-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.25rem;
}

.biography {
  color: #666;
  line-height: 1.6;
  margin: 1rem 0;
}

.metadata {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  color: #999;
  font-size: 0.875rem;
}

.refresh-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.refresh-button:hover:not(:disabled) {
  background: #0056b3;
}

.refresh-button:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.125rem;
}

.error {
  color: #dc3545;
}
</style> 