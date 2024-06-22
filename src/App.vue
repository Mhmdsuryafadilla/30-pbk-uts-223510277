<template>
  <div id="app">
    <header>
      <div class="tabs">
        <div
          v-for="tab in tabs"
          :key="tab.path"
          @click="navigateTo(tab.path)"
          :class="{ 'active': currentRoute === tab.path }"
        >
          {{ tab.label }}
        </div>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const currentRoute = useRoute().path;

const tabs = [
  { path: '/posts', label: 'Posts' },
  { path: '/todos', label: 'Todos' },
  { path: '/albums', label: 'Albums' },
];

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

header {
  margin-bottom: 20px;
}

.tabs {
  display: flex;
  background-color: #eeeeee;
  border-bottom: 1px solid #dddddd;
}

.tabs > div {
  padding: 12px 20px;
  cursor: pointer;
  color: #555555;
  font-weight: bold;
  border-left: 1px solid transparent;
  transition: all 0.3s ease;
}

.tabs > div:hover {
  background-color: #1d2c28;
  color: #ffffff;
  border-left-color: #1ab587;
  transform: scale(1.05);
}

.tabs > div.active {
  background-color: #ffffff;
  border-left-color: #fdfdfd;
}

.tabs > div:not(:last-child) {
  margin-right: 0;
}

router-view {
  margin-top: 20px;
}
</style>
