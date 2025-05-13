<template>
  <Icon name="home" :title="title || 'Home'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </Icon>
</template>

<script setup>
import Icon from './Icon.vue';

defineProps({
  title: String,
  size: {
    type: [Number, String],
    default: 24
  },
  viewBox: {
    type: String,
    default: '0 0 24 24'
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  },
  customClass: String
});
</script>