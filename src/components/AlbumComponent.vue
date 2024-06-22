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
          <div v-for="photo in album.photos" :key="photo.id" class="photo" @click="navigateToAlbumDetail(album.userId)">
            <img :src="photo.thumbnailUrl" alt="Album Photo">
            <div class="photo-overlay">
              <p>{{ photo.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const selectedUser = ref(1); 
const users = ref([]);
const albums = ref([]);
const router = useRouter();

const filteredAlbums = computed(() => {
  return albums.value.filter(album => album.userId === selectedUser.value);
});

onMounted(async () => {
  try {
    
    const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
    users.value = await usersResponse.json();

    
    const albumsResponse = await fetch('https://jsonplaceholder.typicode.com/albums');
    albums.value = await albumsResponse.json();

    
    for (const album of albums.value) {
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${album.id}&_limit=5`);
      album.photos = await photosResponse.json();
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

const navigateToAlbumDetail = (userId) => {
  router.push(`/albums/${userId}`);
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
}

.photo {
  width: 20%;
  margin: 0 1%;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ddd;
  text-align: center;
  cursor: pointer;
  position: relative; 
}

.photo img {
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease; 
}

.photo:hover img {
  transform: scale(1.1); 
}

.photo-overlay {
  position: absolute;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3); 
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0; 
  transition: opacity 0.3s ease; 
}

.photo:hover .photo-overlay {
  opacity: 1;
}

.photo-overlay p {
  margin: 0;
}
</style>
