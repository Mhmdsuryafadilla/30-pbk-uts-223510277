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
      <h1>Daftar Kegiatan</h1>
      <div class="add-activity">
        <input v-model="newActivity" type="text" placeholder="Tambahkan kegiatan baru" />
        <button @click="addActivity">Tambah</button>
      </div>
      <div class="activities">
        <div v-for="activity in filteredActivities" :key="activity.id" class="activity">
          <div class="activity-content">
            <input type="checkbox" v-model="activity.completed" />
            <span :class="{ 'completed-text': activity.completed }" @click="toggleCompleted(activity)">{{ activity.name }}</span>
          </div>
          <button @click="cancelActivity(activity)">Batalkan</button>
        </div>
      </div>
      <div class="filter">
        <input type="checkbox" v-model="showIncompleteOnly" /> Tampilkan hanya yang belum selesai
      </div>
    </div>

    <div v-else-if="activeMenu === 'post'">
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser">
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-for="post in filteredPosts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const activeMenu = ref('todos');
const activities = ref([
  { id: 1, name: 'Membuat aplikasi Vue.js', completed: false },
  { id: 2, name: 'Belajar CSS styling', completed: true },
]);
const newActivity = ref('');
const showIncompleteOnly = ref(false);
const filteredActivities = computed(() => {
  if (showIncompleteOnly.value) {
    return activities.value.filter(activity => !activity.completed);
  } else {
    return activities.value;
  }
});

// Data and methods for fetching and displaying posts
const selectedUser = ref(1);
const users = ref([]);
const posts = ref([]);
const filteredPosts = computed(() => {
  return posts.value.filter(post => post.userId === selectedUser.value);
});

const addActivity = () => {
  if (newActivity.value.trim() !== '') {
    activities.value.push({ id: activities.value.length + 1, name: newActivity.value, completed: false });
    newActivity.value = '';
  }
};

const cancelActivity = (activity) => {
  const index = activities.value.findIndex(a => a.id === activity.id);
  if (index !== -1) {
    activities.value.splice(index, 1);
  }
};

const toggleCompleted = (activity) => {
  activity.completed = !activity.completed;
};

// Fetch users and posts data
onMounted(async () => {
  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  users.value = await usersResponse.json();

  const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  posts.value = await postsResponse.json();
});
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

.add-activity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-activity input[type="text"] {
  flex: 1;
  padding: 8px;
  margin-right: 8px;
}

.add-activity button {
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.activities {
  margin-top: 20px;
}

.activity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.activity-content {
  display: flex;
  align-items: center;
}

.completed-text {
  text-decoration: line-through;
  cursor: pointer;
}

.filter {
  margin-top: 20px;
}

.post {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

select {
  padding: 5px;
  margin-bottom: 10px;
}
</style>
