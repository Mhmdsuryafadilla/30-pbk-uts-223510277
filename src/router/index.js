import { createRouter, createWebHistory } from 'vue-router'
import TodoComponent from '../components/TodoComponent.vue'
import PostComponent from '../components/PostComponent.vue'
import AlbumComponent from '../components/AlbumComponent.vue'

const routes = [
  { path: '/', component: PostComponent }, // Halaman default untuk '/'
  { path: '/posts', component: PostComponent },
  { path: '/todos', component: TodoComponent },
  { path: '/albums', component: AlbumComponent },
  // tambahkan rute lainnya jika diperlukan
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
