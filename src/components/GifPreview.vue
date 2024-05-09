<script setup lang="ts">
import type { GIF } from '@/api/giphy'

export interface GifPreviewProps {
  gif: GIF
}
const props = defineProps<GifPreviewProps>()
const emit = defineEmits<{
  (e: 'gif-preview-clicked', gif: GIF): void
}>()

function previewClicked() {
  emit('gif-preview-clicked', props.gif)
}
</script>

<template>
  <img :src="gif.images.fixed_height.url" @click="previewClicked()" />
</template>
