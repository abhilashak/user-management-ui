<template>
  <div class="user-list">
    <div v-if="loading" class="loading">Loading user...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="section random-user-section">
        <div class="section-content">
          <div v-if="randomUser" class="random-user">
            <h2>Random User
              <button class="refresh-button" @click="loadRandomUser" :disabled="loading">
                Get Another Random User
              </button>
            </h2>
            <div class="user-card">
              <h3>{{ randomUser.name }}</h3>
              <p class="biography">{{ randomUser.biography }}</p>
              <div class="metadata">
                <small>ID: {{ randomUser.id }}</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section create-user-section">
        <div class="section-content">
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
  width: 100%;
  display: flex;
  flex-direction: column;
}

.section {
  width: 100%;
  background-color: #f8f9fa;
  padding: 2rem 0;
}

.section + .section {
  margin-top: 2rem; /* Spacing between sections */
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

.create-user-section {
  background-color: #f8f9fa;
}

.random-user {
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 2rem;
  background: white;
  margin-top: 1rem;
}

.user-card h3 {
  margin: 0 0 1rem;
  color: #2c3e50;
  font-size: 1.5rem;
}

.biography {
  color: #666;
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 1.1rem;
}

.metadata {
  display: flex;
  justify-content: space-between;
  color: #999;
  font-size: 0.9rem;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

h2 {
  color: #2c3e50;
  margin: 0 0 1.5rem;
  font-size: 1.8rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 2rem;
}

.error {
  color: #dc3545;
}

.refresh-button {
  margin-top: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transition: background-color 0.2s ease;
}

.refresh-button:hover {
  background-color: #45a049;
}

.refresh-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.create-user {
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  width: 100%;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

button[type="submit"] {
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  display: block;
  margin: 2rem auto 0;
  transition: background-color 0.2s ease;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="submit"]:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;
}
</style> 