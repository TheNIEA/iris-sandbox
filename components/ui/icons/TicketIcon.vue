<template>
  <Icon name="ticket" :title="title || 'Ticket'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
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