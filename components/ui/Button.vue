<template>
  <button
    :class="[
      'px-4 py-2 rounded-md transition-all duration-300',
      'bg-gradient-to-r from-pink-500 to-rose-500',
      'hover:from-rose-500 hover:to-pink-500',
      'text-white font-medium'
    ]"
  >
    <slot></slot>
  </button>
</template>
