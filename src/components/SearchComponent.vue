<template>
  <div class="search-component" ref="searchComponent">
    <div class="search-controls">
      <div class="search-type">
        <label>
          <input
            type="radio"
            v-model="searchType"
            value="teacher"
            @change="handleSearchTypeChange"
          />
          Преподаватель
        </label>
        <label>
          <input
            type="radio"
            v-model="searchType"
            value="group"
            @change="handleSearchTypeChange"
          />
          Группа
        </label>
        <label>
          <input
            type="radio"
            v-model="searchType"
            value="room"
            @change="handleSearchTypeChange"
          />
          Аудитория
        </label>
      </div>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Введите для поиска..."
        @input="handleInput"
        class="search-input"
      />
    </div>
    <ul v-if="results.length && isResultsVisible" class="search-results">
      <li v-for="result in results" :key="result.pk" class="search-item">
        <router-link
          :to="{ name: searchType, params: { id: result.pk }, query: { entityName: result.fields.name } }"
          @click="hideResults"
        >
          {{ result.fields.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";
import { onClickOutside } from "@vueuse/core";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default {
  data() {
    return {
      searchQuery: "",
      searchType: "teacher", // По умолчанию поиск по преподавателю
      results: [],
      isResultsVisible: false,
    };
  },
  methods: {
    handleInput: debounce(function () {
      if (this.searchQuery.length >= 2) {
        this.search();
        this.isResultsVisible = true;
      } else {
        this.results = [];
        this.isResultsVisible = false;
      }
    }, 300),

    async search() {
      try {
        const response = await axios.get(
          `${backendUrl}/api/search/${this.searchType}/${this.searchQuery}`
        );
        this.results = response.data;
      } catch (error) {
        console.error("Ошибка при поиске:", error);
        this.results = [];
      }
    },

    hideResults() {
      this.isResultsVisible = false;
      this.searchQuery = ""; // Очищаем поле поиска
      this.results = []; // Очищаем результаты
    },

    handleSearchTypeChange() {
      if (this.searchQuery.length >= 2) {
        this.search(); // Выполняем поиск при смене типа
      }
    },
  },
  mounted() {
    // Скрываем результаты при клике вне компонента
    onClickOutside(this.$refs.searchComponent, () => {
      this.isResultsVisible = false;
    });
  },
};
</script>

<style scoped>
.search-component {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  position: relative;
}

.search-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-type {
  display: flex;
  gap: 10px;
}

.search-type label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
}

.search-results {
  margin-top: 10px;
  list-style: none;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #3a4654;
  z-index: 1000;
}

.search-item {
  padding: 8px;
  border-bottom: 1px solid rgba(35, 35, 35, 0.98);
}

.search-item:last-child {
  border-bottom: none;
}

.search-item a {
  text-decoration: none;
  color: inherit;
}

.search-item a:hover {
  background-color: rgba(1, 10, 14, 0.96);
}
</style>