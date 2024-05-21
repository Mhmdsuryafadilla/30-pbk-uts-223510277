<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li @click="activeMenu = 'post'" :class="{ active: activeMenu === 'post' }">Post</li>
          <li @click="activeMenu = 'todos'" :class="{ active: activeMenu === 'todos' }">Todos</li>
        </ul>
      </nav>
    </header>

    <div v-if="activeMenu === 'todos'">
      <TodoComponent />
    </div>

    <div v-else-if="activeMenu === 'post'">
      <PostComponent />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PostComponent from './components/PostComponent.vue';
import TodoComponent from './components/TodoComponent.vue';

const activeMenu = ref('todos');
</script>

<style scoped>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

header {
  margin-bottom: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

nav ul li.active {
  font-weight: bold;
}
</style>
