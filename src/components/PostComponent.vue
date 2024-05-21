<template>
    <div>
      <h1>Postingan Pengguna</h1>
      <select v-model="selectedUser">
        <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
      </select>
      <div v-for="post in filteredPosts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const selectedUser = ref(1);
  const users = ref([]);
  const posts = ref([]);
  const filteredPosts = computed(() => {
    return posts.value.filter(post => post.userId === selectedUser.value);
  });
  
  onMounted(async () => {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await usersResponse.json();
  
    const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
    posts.value = await postsResponse.json();
  });
  </script>
  
  <style scoped>
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
  