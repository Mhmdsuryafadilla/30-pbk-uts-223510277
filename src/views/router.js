import { createRouter, createWebHistory } from 'vue-router';
import AlbumComponent from '../components/AlbumComponent.vue';
import PostComponent from '../components/PostComponent.vue';
import TodoComponent from '../components/TodoComponent.vue';

const routes = [
  { path: '/', redirect: '/albums' }, // Redirect root to /albums
  { path: '/albums', component: AlbumComponent },
  { path: '/posts', component: PostComponent },
  { path: '/todos', component: TodoComponent }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
