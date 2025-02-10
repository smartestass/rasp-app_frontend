<template>
    <div class="access-denied">
    <p class="pt-2">
      Данное расписание содержит ТОЛЬКО занятия АПП ЮФУ.
    </p>
    <p>
      Здесь нет информации о МУАМ и практиках.
    </p>
        <p class="pt-2">
            Если вы не видите кнопку "Моё расписание", сообщите об этом на почту: erodionov@sfedu.ru
        </p>

        <p class="pt-2">На эту же почту вы можете писать по любым вопросам, связанным с этой платформой.</p>

    <!-- Иконка поиска (пример с использованием FontAwesome) -->
    <router-link to="/search" class="search-icon">
      <i class="fas fa-search"></i>
    </router-link>
  </div>
</template>

<script>
import NavBar from "@/App.vue";

export default {
  name: 'Help',
    components: {NavBar},
};
</script>

<style scoped>
.access-denied {
  text-align: center;
  margin-top: 50px;
}

.search-icon {
  font-size: 24px;
  color: #42b983;
  text-decoration: none;
}

.search-icon:hover {
  color: #2c3e50;
}
</style>