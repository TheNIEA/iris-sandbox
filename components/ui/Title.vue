<template>
  <component
    :is="tag"
    :class="[
      'font-bold',
      tag === 'h1' && 'text-4xl mb-4',
      tag === 'h2' && 'text-3xl mb-3',
      tag === 'h3' && 'text-2xl mb-2'
    ]"
  >
    <slot></slot>
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'h1',
    validator: (value) => ['h1', 'h2', 'h3'].includes(value)
  }
})
</script>
