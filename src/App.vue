<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="brand">
          <img alt="Company logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
          <span class="brand-name">User Management</span>
        </div>
      </div>
    </nav>

    <RouterView />
  </div>
</template>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f8f9fa;
}

/* App layout */
.app {
  min-height: 100vh;
}

.main-nav {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.logo {
  vertical-align: middle;
}

/* Global utility classes */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Global form styles */
input, textarea, select {
  font-family: inherit;
  font-size: inherit;
}

button {
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
