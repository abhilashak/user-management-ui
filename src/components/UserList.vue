<template>
  <div class="user-list">
    <div v-if="loading" class="loading">Loading user...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="random-user" v-if="randomUser">
        <h2>Random User</h2>
        <div class="user-card">
          <h3>{{ randomUser.name }}</h3>
          <p class="biography">{{ randomUser.biography }}</p>
          <div class="metadata">
            <small>ID: {{ randomUser.id }}</small>
            <small>Created: {{ randomUser?.created_at }}</small>
          </div>
        </div>
        <button class="refresh-button" @click="loadRandomUser" :disabled="loading">
          Get Another Random User
        </button>
      </div>

      <div class="create-user">
        <h2>Create New User</h2>
        <form @submit.prevent="handleCreateUser">
          <div class="form-group">
            <label for="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              v-model="newUser.name" 
              required
              :disabled="creating"
            >
          </div>
          <div class="form-group">
            <label for="biography">Biography:</label>
            <textarea 
              id="biography" 
              v-model="newUser.biography" 
              required
              :disabled="creating"
            ></textarea>
          </div>
          <button type="submit" :disabled="creating">
            {{ creating ? 'Creating...' : 'Create User' }}
          </button>
          <p v-if="createError" class="error-message">{{ createError }}</p>
          <p v-if="createSuccess" class="success-message">User created successfully!</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { User } from '../types/user';
import { UserService } from '../services/UserService';

const randomUser = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const creating = ref(false);
const createError = ref<string | null>(null);
const createSuccess = ref(false);
const newUser = ref({
  name: '',
  biography: ''
});

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

const loadRandomUser = async () => {
  try {
    loading.value = true;
    error.value = null;
    randomUser.value = await UserService.getRandomUser();
  } catch (e) {
    error.value = 'Failed to load user';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleCreateUser = async () => {
  try {
    creating.value = true;
    createError.value = null;
    createSuccess.value = false;
    
    await UserService.createUser({
      name: newUser.value.name,
      biography: newUser.value.biography
    });
    
    createSuccess.value = true;
    newUser.value = { name: '', biography: '' };
    
    // Refresh the random user to potentially show the newly created one
    await loadRandomUser();
  } catch (e) {
    createError.value = 'Failed to create user (50% chance of failure by design)';
    console.error(e);
  } finally {
    creating.value = false;
  }
};

onMounted(() => {
  loadRandomUser();
});
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.random-user {
  margin-bottom: 40px;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}

.user-card h3 {
  margin: 0 0 10px;
  color: #2c3e50;
}

.biography {
  color: #666;
  line-height: 1.5;
  margin: 10px 0;
}

.metadata {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.85em;
  margin-top: 10px;
}

h2 {
  color: #2c3e50;
  margin: 20px 0;
}

.loading, .error {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
}

.refresh-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.refresh-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.create-user {
  margin-top: 40px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 10px;
}

.success-message {
  color: #28a745;
  margin-top: 10px;
}
</style> 