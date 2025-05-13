<template>
  <Icon name="minus" :title="title || 'Minus'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
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