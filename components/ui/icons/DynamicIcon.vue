<template>
  <component :is="iconComponent" v-bind="$attrs" />
</template>

<script setup>
import { computed } from 'vue';
import { iconMap } from './index';

const props = defineProps({
  name: {
    type: String,
    required: true
  }
});

// Dynamically look up the icon component by name
const iconComponent = computed(() => {
  if (!props.name || !iconMap[props.name]) {
    console.warn(`Icon "${props.name}" not found.`);
    return null;
  }
  return iconMap[props.name];
});
</script>