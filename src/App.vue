<template>
  <div class="app-container min-h-screen bg-white dark:bg-gray-900 flex flex-col items-center">
    <!-- Авторизованное состояние -->
    <div v-if="state.isAuthenticated" class="authenticated-view flex flex-col flex-grow w-full max-w-7xl mx-auto">
      <!-- Навбар -->
      <NavBar class="navbar w-full sticky top-0 z-50" />
      <!-- Основной контент -->
      <div class="main-content flex-grow p-5 w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <RouterView class="router-view w-full" />
      </div>
    </div>

    <!-- Неавторизованное состояние -->
    <div v-else class="unauthenticated-view min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <button
        class="login-button bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300 flex items-center gap-2"
        @click="handleLogin"
      >
        <!-- Иконка входа -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Log In
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from './config/useAuth'
import { myMsalObj, state } from './config/msalConfig'
const { login, handleRedirect, registerAuthorizationHeaderInterceptor, logout } = useAuth()
import NavBar from "@/components/NavBar.vue";

const handleLogin = async () => {
  await login()
}

const handleLogout = () => {
  logout();
}

const initialize = async () => {
  try {
    await myMsalObj.initialize()
    registerAuthorizationHeaderInterceptor()
  } catch (error) {
    console.log('Initialization error', error)
  }
}

onMounted(async () => {
  await initialize();
  await handleRedirect();
})
</script>

<style>
/* Включение темной темы */
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
</style>