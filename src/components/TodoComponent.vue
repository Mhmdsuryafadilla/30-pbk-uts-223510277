<template>
    <div>
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
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
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
  </script>
  
  <style scoped>
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
  </style>
  