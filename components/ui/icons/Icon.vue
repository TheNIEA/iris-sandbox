<template>
  <svg 
    :width="size" 
    :height="size" 
    :viewBox="viewBox" 
    :aria-labelledby="titleId"
    :class="svgClasses"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
  >
    <title :id="titleId">{{ title }}</title>
    <g :stroke-width="strokeWidth">
      <slot />
    </g>
  </svg>
</template>

<script setup>
import { computed, useId } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 24
  },
  viewBox: {
    type: String,
    default: '0 0 24 24'
  },
  color: {
    type: String,
    default: 'currentColor'
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  },
  customClass: {
    type: String,
    default: ''
  }
});

// Generate a unique ID for SVG title accessibility
const uniqueId = useId();
const titleId = computed(() => `icon-${props.name}-${uniqueId}`);

// Compute classes based on props
const svgClasses = computed(() => {
  return [
    'icon',
    `icon-${props.name}`,
    props.color !== 'currentColor' ? `text-${props.color}` : '',
    props.customClass
  ].filter(Boolean).join(' ');
});
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  color: currentColor;
}
</style>