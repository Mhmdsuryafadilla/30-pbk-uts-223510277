import { createRouter, createWebHistory } from 'vue-router'
import TodoComponent from '../components/TodoComponent.vue'
import PostComponent from '../components/PostComponent.vue'
import AlbumComponent from '../components/AlbumComponent.vue'
import AlbumDetailComponent from '../components/AlbumDetailComponent.vue'

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: TodoComponent },
  { path: '/posts', component: PostComponent },
  { path: '/albums', component: AlbumComponent },
  { path: '/albums/:id', component: AlbumDetailComponent, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
