<template>
  <div class="day-container mb-10 p-4 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
    <h3 class="day-date mb-4 text-xl font-bold text-gray-800 dark:text-gray-200 bg-gray-600/50 px-4 py-2 rounded-lg">
  {{ formattedDate }}
    </h3>
    <div class="lessons-list flex flex-col gap-2">
      <Lesson
        v-for="lesson in lessons"
        :key="lesson.id"
        :lesson="lesson"
        :entityType="entityType"
        :entityId="entityID"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import Lesson from './Lesson.vue';

const props = defineProps({
  dayDate: {
    type: String,
    required: true,
  },
  lessons: {
    type: Array as () => { id: number; [key: string]: any }[],
    required: true,
  },
    entityType: String,
    entityID: String,
});

// Форматируем дату в "ДД месяц ГГГГ"
const formattedDate = computed(() => {
  const date = new Date(props.dayDate);
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', weekday: 'long' };
  return date.toLocaleDateString('ru-RU', options);
});
</script>

<style scoped>
/* Убираем кастомные стили и используем только Tailwind */
</style>