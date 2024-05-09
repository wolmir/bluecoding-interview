<script setup lang="ts">
import { useGiphySearchStore } from '@/stores/giphy-search'

const store = useGiphySearchStore()
</script>

<template>
  <div class="backdrop" v-if="store.lightbox.open" @click="store.closeLightbox()">
    <div class="content-container">
      <div>
        <button class="nav-button" @click.stop="store.lightboxPreviousGif()">Previous</button>
      </div>
      <div v-if="store.lightbox.current">
        <img :src="store.lightbox.current.images.original.url" />
      </div>
      <div>
        <button class="nav-button" @click.stop="store.lightboxNextGif()">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-container {
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    margin-left: 32px;
    margin-right: 32px;
    max-width: 80vw;
    max-height: 80vh;
  }

  .nav-button {
    width: 100px;
    padding: 8px;
    font-size: 1.3em;
    background-color: lightgray;
  }
}
</style>
