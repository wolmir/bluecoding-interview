<script setup lang="ts">
import { useGiphySearchStore } from '@/stores/giphy-search'
import GifPreview from '@/components/GifPreview.vue'
import GifLightbox from '@/components/GifLightbox.vue'

const store = useGiphySearchStore()
</script>

<template>
  <main>
    <header>
      <h1>GIPHY Search</h1>
    </header>
    <div class="search-form">
      <input
        v-model="store.searchParams.q"
        @keyup.enter="store.search()"
        placeholder="Search for GIFS here"
      />
      <button class="search-button" @click="store.search()">Search</button>
    </div>

    <div class="gifs-container">
      <div v-for="(item, index) of store.searchResults.data" :key="item.id">
        <GifPreview :gif="item" @gif-preview-clicked="store.openLightbox(index)" />
      </div>
    </div>

    <div v-if="store.searchResults.data.length">
      <button @click="store.loadMore()">Load more</button>
    </div>

    <GifLightbox />
  </main>
</template>

<style scoped>
main {
  height: 100vh;
}
.gifs-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 1000px;
}

input {
  width: 100%;
  padding: 16px 8px;
  font-size: x-large;
}

.search-form {
  display: flex;
  padding: 16px 0 32px 0;
}

.search-button {
  width: 10%;
  font-size: 1.3em;
  background-color: lightgray;
}
</style>
