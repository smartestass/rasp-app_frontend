<template>
  <div class="p-4 ">
      <div class="mb-10">
          <div class="mb-4 pb-4">
        <span v-if="entityType=='Преподаватель'">
            <label class="block text-xl text-gray-600 dark:text-gray-400">
        Расписание преподавателя {{entityName}}
      </label>
        </span>
        <span v-if="entityType=='Группа'">
            <label class="block text-xl text-gray-600 dark:text-gray-400">
        Расписание группы {{entityName}}
      </label>
        </span>
        <span v-if="entityType=='Аудитория'">
            <label class="block text-xl text-gray-600 dark:text-gray-400">
        Расписание аудитории {{entityName}}
      </label>
        </span>
</div>
      <div class="p-2 border rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 relative">
        <!-- Блок с датой и кнопкой -->
        <div
          v-show="!isCalendarVisible"
          @click="toggleCalendar"
          class="cursor-pointer flex items-center justify-between"
        >
          <span>{{ formattedDate }}</span> <!-- Используем formattedDate -->
          <span class="ml-2">▼</span>
        </div>

        <!-- Календарь -->
        <div
          v-show="isCalendarVisible"
          ref="calendarRef"
          class="absolute z-10 bg-white dark:bg-gray-700 mt-1 rounded-lg shadow-lg"
        >
          <DatePicker v-model="date" mode="date" @dayclick="handleDateSelect" :attributes="attrs" />
        </div>
      </div>
    </div>

    <!-- Отображение дней с занятиями -->
    <div v-if="Object.keys(data).length > 0">
      <Day
        v-for="(lessons, date) in data"
        :key="date"
        :dayDate="date"
        :lessons="lessons"
        :entitytype="entityType"
        :entityId="entityId"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { DatePicker } from 'v-calendar';
import { onClickOutside } from '@vueuse/core';
import axios from 'axios'; // Импортируем axios
import Day from "@/components/Day.vue"; // Импортируем компонент Day
import { useRoute } from 'vue-router'; // Импортируем useRoute для работы с маршрутами

const date = ref(new Date());
const data = ref({});

const lessonDates = ref([])
const isCalendarVisible = ref(false);
const calendarRef = ref<HTMLElement | null>(null);

const route = useRoute(); // Получаем текущий маршрут

const props = defineProps({
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
  },
    entityName: {
      type: String
    },
  entityRoute: {
    type: String,
  },
});

const formattedDate = computed(() => {
  return date.value.toLocaleDateString();
});

const attrs = ref([
  {
    key: 'with_lesson',
    dot: 'yellow',
    dates: lessonDates
  },
])

const toggleCalendar = () => {
  isCalendarVisible.value = !isCalendarVisible.value;
};

const closeCalendar = () => {
  isCalendarVisible.value = false;
};

async function sendDate(selectedDate: Date) {
  try {
    const response = await axios.get(`http://10.132.205.20:8081/api/${props.entityRoute}/${props.entityId}`, {
      params: {
        start_date: selectedDate, // Используем отформатированную дату
      },
    });

    console.log('Ответ от сервера:', response.data);
    data.value = response.data;
  } catch (error) {
    console.error('Ошибка при отправке даты:', error);
  }
}

async function getLessonDates() {
  try {
    const response = await axios.get(`http://10.132.205.20:8081/api/dates/${props.entityRoute}/${props.entityId}`);

    console.log('Ответ от сервера:', response.data);
    lessonDates.value = response.data;
  } catch (error) {
    console.error('Ошибка при отправке даты:', error);
  }
}

const handleDateSelect = (selectedDate: Date) => {
  date.value = selectedDate;
  sendDate(selectedDate);
  closeCalendar();
};

onClickOutside(calendarRef, () => {
  if (isCalendarVisible.value) {
    closeCalendar();
  }
});

// Отслеживаем изменения параметров маршрута
watch(
  () => route.params.id, // Следим за изменением параметра id
  (newId) => {
    if (newId) {
      // Обновляем данные при изменении параметра
      sendDate(date.value);
      getLessonDates();
    }
  }
);

// Загружаем данные при монтировании компонента
onMounted(() => {
  sendDate(date.value);
  getLessonDates();
});
</script>

<style>
/* Убираем кастомные стили и используем только Tailwind */
</style>