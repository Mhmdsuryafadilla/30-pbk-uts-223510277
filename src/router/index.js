import { createRouter, createWebHistory } from 'vue-router';
import PostComponent from '../components/PostComponent.vue';
import TodoComponent from '../components/TodoComponent.vue';
import AlbumComponent from '../components/AlbumComponent.vue';

const routes = [
  { path: '/post', component: PostComponent },
  { path: '/todos', component: TodoComponent },
  { path: '/album', component: AlbumComponent },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
