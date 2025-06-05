<template>
  <div class="user-list">
    <div v-if="loading" class="loading">Loading user...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div class="section auto-create-section">
        <div class="section-content">
          <div class="auto-create-status">
            <h2>Auto User Creation (Level 2)</h2>
            <div class="status-indicator" :class="{ creating: autoCreating, completed: !autoCreating }">
              <p>{{ autoCreateStatus }}</p>
              <div v-if="autoCreating" class="spinner"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="section random-user-section">
        <div class="section-content">
          <div v-if="randomUser" class="random-user">
            <h2>Random User</h2>
            <div class="user-card">
              <h3>{{ randomUser.name }}</h3>
              <p class="biography">{{ randomUser.biography }}</p>
              <div class="metadata">
                <small>ID: {{ randomUser.id }}</small>
                <small>Created: {{ formatDate(randomUser.created_at) }}</small>
              </div>
            </div>
            <button class="refresh-button" @click="loadRandomUser" :disabled="loading">
              Get Another Random User
            </button>
          </div>
        </div>
      </div>

      <div class="section create-user-section">
        <div class="section-content">
          <div class="create-user">
            <h2>Manual User Creation</h2>
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

// Random user display state
const randomUser = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// User creation form state  
const newUser = ref({ name: '', biography: '' });
const creating = ref(false);
const createError = ref<string | null>(null);
const createSuccess = ref(false);

// Auto-creation state (Level 2 requirement)
const autoCreating = ref(false);
const autoCreateAttempts = ref(0);
const autoCreateStatus = ref<string>('Creating user automatically...');

const loadRandomUser = async () => {
  try {
    loading.value = true;
    error.value = null;
    randomUser.value = await UserService.getRandomUser();
  } catch (e) {
    error.value = 'Failed to load random user';
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// Generate random user data for auto-creation
const generateRandomUserData = () => {
  const names = [
    'Alex Johnson',
    'Taylor Smith',
    'Jordan Brown',
    'Casey Williams',
    'Morgan Davis',
    'Avery Chen',
    'Riley Patel',
    'Sam Rodriguez',
    'Quinn O\'Connor',
    'Jamie Kim'
  ]
  const biographies = [
    'A passionate software developer with expertise in full-stack development.',
    'Creative UI/UX designer focused on creating intuitive user experiences.',
    'Data scientist specializing in machine learning and analytics.',
    'DevOps engineer with experience in cloud infrastructure and automation.',
    'Product manager with a background in agile development methodologies.'
  ]
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    biography: biographies[Math.floor(Math.random() * biographies.length)]
  }
};

// Auto-create user on page load (Level 2 requirement)
const autoCreateUser = async () => {
  autoCreating.value = true;
  autoCreateAttempts.value = 0;
  autoCreateStatus.value = 'Creating user automatically...';
  
  const userData = generateRandomUserData();
  
  while (true) {
    try {
      autoCreateAttempts.value++;
      autoCreateStatus.value = `Creating user automatically... (Attempt ${autoCreateAttempts.value})`;
      
      const newUser = await UserService.createUser({
        name: userData.name,
        biography: userData.biography
      });
      autoCreateStatus.value = `✓ User created successfully: ${newUser.name} (after ${autoCreateAttempts.value} attempts)`;
      
      // Refresh random user display after successful creation
      await loadRandomUser();
      break;
      
    } catch (e) {
      console.log(`Auto-creation attempt ${autoCreateAttempts.value} failed, retrying...`);
      autoCreateStatus.value = `Creating user automatically... (Attempt ${autoCreateAttempts.value} failed, retrying...)`;
      
      // Small delay before retry
      // TODO - This is for Testing purpose. In production, we should not have a delay.
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  autoCreating.value = false;
};

const handleCreateUser = async () => {
  if (!newUser.value.name || !newUser.value.biography) return;
  
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
    
    // Refresh random user display
    await loadRandomUser();
    
    setTimeout(() => {
      createSuccess.value = false;
    }, 3000);
    
  } catch (e) {
    createError.value = 'Failed to create user. Please try again.';
  } finally {
    creating.value = false;
  }
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

// On page load: auto-create user AND load random user
onMounted(async () => {
  // Start both operations in parallel
  await Promise.all([
    autoCreateUser(), // Level 2 requirement: auto-create on page load
    loadRandomUser()  // Load random user for display
  ]);
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
  margin-top: 2rem;
}

.section-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.auto-create-section {
  background-color: #e8f4fd;
  border-left: 4px solid #007bff;
}

.auto-create-status h2 {
  color: #007bff;
  margin-bottom: 1rem;
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background: white;
}

.status-indicator.creating {
  border-left: 4px solid #ffc107;
}

.status-indicator.completed {
  border-left: 4px solid #28a745;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.random-user-section {
  background-color: #f8f9fa;
}

.create-user-section {
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

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

button[type="submit"] {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

button[type="submit"]:hover:not(:disabled) {
  background: #218838;
}

button[type="submit"]:disabled {
  background: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  font-size: 0.875rem;
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