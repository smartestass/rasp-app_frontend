import { createRouter, createWebHistory } from 'vue-router'
import App from "@/App.vue";
import GroupRasp from "@/components/GroupRasp.vue";
import TeacherRasp from "@/components/TeacherRasp.vue";
import RaspEntity from "@/components/RaspEntity.vue";
import NavBar from "@/components/NavBar.vue";
import {state} from "@/config/msalConfig.ts";
import Help from "@/components/Help.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: App,
    // },
    {
      path: '/group/:id',
      name: 'group',
      component: RaspEntity,
      props: route => ({
        entityType: 'Группа',
        entityId: route.params.id,
        entityRoute: 'group',
        entityName: route.query.entityName
      })
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: RaspEntity,
      props: route => ({
        entityType: 'Преподаватель',
        entityId: route.params.id,
        entityRoute: 'teacher',
        entityName: route.query.entityName
      })
    },
    {
      path: '/room/:id',
      name: 'room',
      component: RaspEntity,
      props: route => ({
        entityType: 'Аудитория',
        entityId: route.params.id,
        entityRoute: 'room',
        entityName: route.query.entityName
      })
    },
      {
      path: '/help',
      name: 'help',
      component: Help,
      // props: route => ({
      //   entityType: 'Аудитория',
      //   entityId: route.params.id,
      //   entityRoute: 'room',
      //   entityName: route.query.entityName
      // })
    },
    //         {
    //   path: '/',
    //   name: 'home',
    //   redirect: (to) => {
    //     // Используем state для проверки условий
    //     if (state.localUser.type === 'teacher') {
    //       return { name: 'teacher', params: { id: state.localUser.teacherId }, query: { entityName: state.localUser.teacherName } };
    //     } else if (state.localUser.type === 'student') {
    //       return { name: 'group', params: { id: state.localUser.groupId }, query: { entityName: state.localUser.groupName } };
    //     } else {
    //       return { name: 'access-denied' };
    //     }
    //   }
    // },
  ],
})

export default router
