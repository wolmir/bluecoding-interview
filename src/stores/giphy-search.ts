import { ref } from 'vue'
import { defineStore } from 'pinia'
import * as giphy from '@/api/giphy'

export const useGiphySearchStore = defineStore('giphy-search', () => {
  // State
  const searchParams = ref<giphy.SearchParams>({
    q: '',
    offset: 0,
    limit: 10
  })
  const searchResults = ref<giphy.SearchResults>({
    data: [],
    pagination: {
      offset: 0,
      total_count: 0,
      count: 0
    }
  })

  const lightbox = ref<{
    previous: giphy.GIF | null
    next: giphy.GIF | null
    current: giphy.GIF | null
    currentIndex: number | null
    open: boolean
  }>({
    open: false,
    previous: null,
    next: null,
    current: null,
    currentIndex: null
  })

  async function search() {
    const params = searchParams.value
    if (!params.q.length) {
      return
    }
    try {
      const results = await giphy.search(params)
      searchResults.value = results
    } catch (err) {
      // TODO: Handle this
    }
  }

  async function loadMore() {
    const currentResults = searchResults.value
    searchParams.value.offset = currentResults.pagination.offset + currentResults.pagination.count
    const results = await giphy.search(searchParams.value)
    searchResults.value.pagination = results.pagination
    searchResults.value.data.push(...results.data)
  }

  function openLightbox(gifIndex: number) {
    const currentGifs = searchResults.value.data

    if (currentGifs[gifIndex]) {
      const current = currentGifs[gifIndex]
      lightbox.value.current = current
      lightbox.value.currentIndex = gifIndex
      const [nextIndex, previousIndex] = [gifIndex + 1, gifIndex - 1]

      let next: giphy.GIF | null = null
      if (nextIndex < currentGifs.length) {
        next = currentGifs[nextIndex]
      }
      lightbox.value.next = next

      let previous: giphy.GIF | null = null
      if (previousIndex >= 0) {
        previous = currentGifs[previousIndex]
      }
      lightbox.value.previous = previous

      lightbox.value.open = true
    }
  }

  function closeLightbox() {
    lightbox.value.open = false
  }

  function lightboxNextGif() {
    if (lightbox.value.currentIndex !== null) {
      openLightbox(lightbox.value.currentIndex + 1)
    }
  }

  function lightboxPreviousGif() {
    if (lightbox.value.currentIndex !== null) {
      openLightbox(lightbox.value.currentIndex - 1)
    }
  }

  return {
    searchParams,
    searchResults,
    lightbox,
    search,
    loadMore,
    openLightbox,
    closeLightbox,
    lightboxNextGif,
    lightboxPreviousGif
  }
})
