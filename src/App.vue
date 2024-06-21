<template>
  <div class="app">
    <header>
      <nav>
        <ul>
          <li :class="{ 'active': activeMenu === 'post' }" @click="navigateTo('post')">Post</li>
          <li :class="{ 'active': activeMenu === 'todos' }" @click="navigateTo('todos')">Todos</li>
          <li :class="{ 'active': activeMenu === 'album' }" @click="navigateTo('album')">Album</li>
        </ul>
      </nav>
    </header>

    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const activeMenu = ref('post'); // Menu aktif default saat aplikasi dimuat
const router = useRouter();

const navigateTo = (menu) => {
  activeMenu.value = menu;
  router.push({ path: `/${menu}` }); // Menggunakan router untuk navigasi antar komponen
};
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
  background-color: #314c69;
  color: white;
}

nav ul {
  list-style-type: none;
  padding: 0;
  display: flex;
}

nav ul li {
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 2px solid transparent;
  transition: border-bottom-color 0.3s;
}

nav ul li.active {
  border-bottom-color: white;
}

nav ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  background-color: #f8f9fa;
  padding: 20px;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 5px 5px;
}
</style>
