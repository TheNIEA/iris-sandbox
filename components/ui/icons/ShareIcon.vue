<template>
  <Icon name="share" :title="title || 'Share'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
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