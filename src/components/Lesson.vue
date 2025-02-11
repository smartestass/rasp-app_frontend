<template>
  <div class="lesson-container p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
    <!-- Время занятия -->
    <div class="lesson-timing text-gray-600 dark:text-gray-400 text-sm mb-2 flex justify-between sm:block">
        <span>{{ lesson.timing }}</span>
    </div>

    <!-- Информация о дисциплине -->
    <div class="lesson-info">
      <div class="lesson-discipline text-gray-800 dark:text-gray-200 font-bold mb-2">
        ({{lesson.lesson_type}}) {{ lesson.discipline }}
      </div>

      <!-- Преподаватели -->
      <div class="lesson-teachers flex flex-wrap gap-2 mb-2">
        <span v-for="teacher in lesson.teachers" :key="teacher.id" class="teacher-name flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
          <router-link :to="{ name: 'teacher', params: { id: teacher.id }, query: { entityName: teacher.name } }" class="text-blue-600 dark:text-blue-400 hover:underline">
            {{ teacher.name }}
          </router-link>
        </span>
      </div>

      <!-- Группы -->
      <div class="lesson-groups flex flex-wrap gap-2 mb-2">
        <span v-for="(group, index) in visibleGroups" :key="group.id" class="group-name flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <router-link :to="{ name: 'group', params: { id: group.id }, query: { entityName: group.name } }" class="text-blue-600 dark:text-blue-400 hover:underline">
            {{ group.name }}
          </router-link>
        </span>
        <button v-if="lesson.groups.length > 1" @click="toggleGroups" class="text-blue-600 dark:text-blue-400 hover:underline text-sm">
          {{ isGroupsExpanded ? '' : `и ещё ${lesson.groups.length - 1}` }}
        </button>
      </div>

      <!-- Аудитория -->
      <div class="lesson-room flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 dark:text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2v10h8V6H6z" clip-rule="evenodd" />
        </svg>
        <router-link :to="{ name: 'room', params: {id: lesson.room.id}, query: { entityName: lesson.room.name } }" class="text-blue-600 dark:text-blue-400 hover:underline">
          {{ lesson.room.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';

const props = defineProps({
  lesson: {
    type: Object,
    required: true,
  },
  entityType: String,
  entityID: String,
    group: {type: Object},
    teacher: {type: Object}
});

const isGroupsExpanded = ref(false);
const toggleGroups = () => {
  isGroupsExpanded.value = !isGroupsExpanded.value;
};

// Отсортированный список групп: если entityType === 'Группа', то entityID идёт первой
const sortedGroups = computed(() => {
  if (props.entityType === 'Группа') {
    const mainGroup = props.lesson.groups.find((group: { id: string }) => group.id === props.entityID);
    const otherGroups = props.lesson.groups.filter((group: {id: string }) => group.id !== props.entityID);
    return mainGroup ? [mainGroup, ...otherGroups] : props.lesson.groups;
  }
  return props.lesson.groups;
});

// Видимые группы: показываем первую, остальные под спойлером
const visibleGroups = computed(() => {
  return isGroupsExpanded.value ? sortedGroups.value : sortedGroups.value.slice(0, 1);
});
</script>
<style scoped>
/* Дополнительные стили не требуются, всё через Tailwind */
</style>