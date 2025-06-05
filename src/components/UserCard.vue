<template>
  <div class="user-card">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="user-info">
      <h2>{{ user?.name }}</h2>
      <p class="biography">{{ user?.biography }}</p>
      <div class="metadata">
        <small>ID: {{ user?.id }}</small>
        <small>Created: {{ user?.created_at }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { User } from '../types/user';
import { UserService } from '../services/UserService';

const props = defineProps<{
  userId?: string;
}>();

const user = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

const loadRandomUser = async () => {
  try {
    loading.value = true;
    error.value = null;
    user.value = await UserService.getRandomUser();
  } catch (e) {
    error.value = 'Failed to load user';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadRandomUser();
});
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

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
}

.user-info h2 {
  margin: 0 0 10px;
  color: #333;
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