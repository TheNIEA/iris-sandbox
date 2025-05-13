<template>
  <Icon name="document" :title="title || 'Document'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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