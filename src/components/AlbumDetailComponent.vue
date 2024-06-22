<template>
    <div>
      <h1>Detail Album</h1>
      <div class="photos">
        <div v-for="photo in photos" :key="photo.id" class="photo" @click="openLightbox(photo)">
          <div class="image-container">
            <img :src="photo.thumbnailUrl" :alt="photo.title">
            <div class="photo-overlay">
              <p>{{ photo.title }}</p>
            </div>
          </div>
        </div>
      </div>
  
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
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const albumId = route.params.id;
  const photos = ref([]);
  const lightboxPhoto = ref(null);
  
  onMounted(async () => {
    try {
      const photosResponse = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
      photos.value = await photosResponse.json();
    } catch (error) {
      console.error('Error fetching photos:', error);
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .photo img {
    max-width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease; 
  }
  
  .photo:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  }
  
  .image-container {
    position: relative;
    overflow: hidden;
  }
  
  .photo-overlay {
    position: absolute;
    bottom: 0;
    left: -5%;
    width: 110%;
    height: 50%;
    background-color: rgba(0, 0, 0, 0.5);
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
  