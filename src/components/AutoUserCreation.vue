<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { UserService } from '../services/UserService'
import { generateRandomUserData } from '../utils/userDataGenerator'

// Auto-creation state
const autoCreating = ref(false)
const autoCreateAttempts = ref(0)
const autoCreateStatus = ref<string>('Creating user automatically...')

// Emit event when user is created successfully
const emit = defineEmits<{
  userCreated: []
}>()

// Auto-create user on page load (Level 2 requirement)
const autoCreateUser = async () => {
  autoCreating.value = true
  autoCreateAttempts.value = 0
  autoCreateStatus.value = 'Creating user automatically...'
  
  const userData = generateRandomUserData()
  
  while (true) {
    try {
      autoCreateAttempts.value++
      autoCreateStatus.value = `Creating user automatically... (Attempt ${autoCreateAttempts.value})`
      
      const newUser = await UserService.createUser({
        name: userData.name,
        biography: userData.biography
      })
      autoCreateStatus.value = `✓ User created successfully: ${newUser.name} (after ${autoCreateAttempts.value} attempts)`
      
      // Notify parent component
      emit('userCreated')
      break
      
    } catch (e) {
      console.log(`Auto-creation attempt ${autoCreateAttempts.value} failed, retrying...`)
      autoCreateStatus.value = `Creating user automatically... (Attempt ${autoCreateAttempts.value} failed, retrying...)`
      
      // Small delay before retry
      // TODO - This is for Testing purpose. In production, we should not have a delay.
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
  
  autoCreating.value = false
}

// Start auto-creation when component mounts
onMounted(() => {
  autoCreateUser()
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
</style> 