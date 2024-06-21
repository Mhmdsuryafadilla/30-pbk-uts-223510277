

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
  const activities = ref([
    { id: 1, name: 'Membuat aplikasi Vue.js', completed: false },
    { id: 2, name: 'Belajar CSS styling', completed: true },
  ]);

  const addActivity = (name) => {
    activities.value.push({
      id: activities.value.length + 1,
      name: name,
      completed: false,
    });
  };

  const cancelActivity = (id) => {
    const index = activities.value.findIndex(activity => activity.id === id);
    if (index !== -1) {
      activities.value.splice(index, 1);
    }
  };

  const toggleCompleted = (id) => {
    const activity = activities.value.find(activity => activity.id === id);
    if (activity) {
      activity.completed = !activity.completed;
    }
  };

  return {
    activities,
    addActivity,
    cancelActivity,
    toggleCompleted,
  };
});
