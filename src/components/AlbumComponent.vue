<template>
  <div>
    <h1>Album Gambar</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <div class="albums">
      <div v-for="album in filteredAlbums" :key="album.id" class="album">
        <h3>{{ album.title }}</h3>
        <div class="photos">
          <div v-for="photo in album.photos" :key="photo.id" class="photo" @click="openLightbox(photo)">
            <img :src="photo.thumbnailUrl" alt="Album Photo">
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxPhoto" class="lightbox">
      <div class="lightbox-content">
        <span class="close" @click="closeLightbox">&times;</span>
        <img :src="lightboxPhoto.url" :alt="lightboxPhoto.title">
        <p>{{ lightboxPhoto.title }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const selectedUser = ref(1); 
const users = ref([]);
const albums = ref([]);
const lightboxPhoto = ref(null);

const filteredAlbums = computed(() => {
  return albums.value.filter(album => album.userId === selectedUser.value);
});

onMounted(async () => {
  try {
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await usersResponse.json();
    
    const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
    albums.value = await albumsResponse.json();
    
    // Fetch photos for each album
    for (const album of albums.value) {
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=5`);
      album.photos = await photosResponse.json();
    }
  } catch (error) {
    console.error('Error fetching users, albums, and photos:', error);
  }
});

const openLightbox = (photo) => {
  lightboxPhoto.value = photo;
};

const closeLightbox = () => {
  lightboxPhoto.value = null;
};
</script>

<style scoped>
.album {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.photos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
}

.photo {
  width: calc(20% - 10px); 
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
}

.photo img {
  max-width: 100%;
  height: auto;
}

.select {
  padding: 5px;
  margin-bottom: 10px;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-content {
  position: relative;
  text-align: center;
}

.lightbox-content img {
  max-width: 80%;
  max-height: 80%;
}

.lightbox-content .close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
}
</style>
