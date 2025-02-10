<template>
  <header class="navbar bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-between">
    <!-- Информация о пользователе -->
    <div class="user-info flex items-center gap-4">
      <div class="flex items-center gap-2 relative">
        <!-- Иконка пользователя -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <!-- Username с выпадающим списком -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="username text-gray-800 dark:text-gray-200 font-bold text-base flex items-center gap-1 focus:outline-none"
          >
            {{ state.user.username }}
            <!-- Иконка стрелочки вниз -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': isDropdownOpen }"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          <!-- Выпадающий список -->
          <div
            v-if="isDropdownOpen"
            class="dropdown absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-50"
          >
              <router-link :to="{ name: 'help'}" class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">Помощь</router-link>
            <button
              @click="handleLogout"
              class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ссылка на расписание -->
    <div class="schedule-link">
      <div v-if="state.localUser.type == 'teacher'">
        <router-link
          :to="{ name: 'teacher', params: { id: state.localUser.teacherId } }"
          class="text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors duration-300 flex items-center gap-2"
        >
          <!-- Иконка календаря -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          Моё расписание
        </router-link>
      </div>
      <div v-else-if="state.localUser.type == 'student'">
        <router-link
          :to="{ name: 'group', params: { id: state.localUser.groupId } }"
          class="text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1 rounded transition-colors duration-300 flex items-center gap-2"
        >
          <!-- Иконка календаря -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          Моё расписание
        </router-link>
      </div>
    </div>
    <!-- Компонент поиска -->
    <div class="search-section flex-grow mx-5 max-w-md">
      <SearchComponent class="w-full" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { state } from "@/config/msalConfig.ts";
import SearchComponent from "@/components/SearchComponent.vue";
import {useAuth} from "@/config/useAuth.ts";
import router from "@/router/router.ts";
const { login, handleRedirect, registerAuthorizationHeaderInterceptor, logout } = useAuth()

// Логика для выпадающего списка
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleLogout = () => {
  // Логика для выхода
  console.log("Выход из системы");
  logout()
  isDropdownOpen.value = false; // Закрыть выпадающий список после выхода
};
</script>

<style scoped>
/* Дополнительные стили, если нужно переопределить Tailwind */
.dropdown {
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>