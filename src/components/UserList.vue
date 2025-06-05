<template>
  <div class="user-list">
    <!-- Auto User Creation Component -->
    <AutoUserCreation @user-created="handleUserCreated" />

    <!-- Random User Display Component -->
    <RandomUserDisplay ref="randomUserDisplay" />

    <!-- Manual User Creation Form -->
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UserService } from '../services/UserService'
import AutoUserCreation from './AutoUserCreation.vue'
import RandomUserDisplay from './RandomUserDisplay.vue'

// User creation form state  
const newUser = ref({ name: '', biography: '' })
const creating = ref(false)
const createError = ref<string | null>(null)
const createSuccess = ref(false)

// Reference to the random user display component
const randomUserDisplay = ref<InstanceType<typeof RandomUserDisplay> | null>(null)

// Handle user creation from auto-creation component
const handleUserCreated = () => {
  // Refresh random user display when auto-creation succeeds
  randomUserDisplay.value?.loadRandomUser()
}

const handleCreateUser = async () => {
  if (!newUser.value.name || !newUser.value.biography) return
  
  try {
    creating.value = true
    createError.value = null
    createSuccess.value = false
    
    await UserService.createUser({
      name: newUser.value.name,
      biography: newUser.value.biography
    })
    createSuccess.value = true
    newUser.value = { name: '', biography: '' }
    
    // Refresh random user display
    randomUserDisplay.value?.loadRandomUser()
    
    setTimeout(() => {
      createSuccess.value = false
    }, 3000)
    
  } catch (e) {
    createError.value = 'Failed to create user. Please try again.'
  } finally {
    creating.value = false
  }
}
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
  margin-top: 2rem;
}

.section:first-child {
  margin-top: 0;
}

.section-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.create-user-section {
  background-color: #f8f9fa;
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
</style> 