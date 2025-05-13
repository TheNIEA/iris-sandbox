<template>
  <div 
    class="bg-gray-900/40 p-4 rounded-lg border backdrop-blur-sm mb-4"
    :class="[
      { 'border-l-4': type === 'ticket' && showBorder }, 
      { 'border-l-blue-500': type === 'ticket' && showBorder }, 
      { 'border-blue-800/50': type !== 'ticket' || !showBorder }
    ]"
  >
    <!-- Header with title, user, and status -->
    <div class="flex justify-between items-start mb-2">
      <div>
        <div class="flex items-center">
          <h4 class="font-medium text-white">{{ title }}</h4>
          <span 
            v-if="type === 'ticket'" 
            class="ml-2 text-xs px-2 py-0.5 bg-blue-500/30 rounded-full text-blue-300"
          >
            Service
          </span>
          <span 
            v-else 
            class="ml-2 text-xs px-2 py-0.5 bg-purple-500/30 rounded-full text-purple-300"
          >
            Assessment
          </span>
        </div>
        <p class="text-sm text-blue-300">by {{ user }}</p>
      </div>
      <div class="bg-blue-800/50 px-2 py-1 rounded text-sm font-medium text-blue-300">
        {{ displayStatus }}
      </div>
    </div>
    
    <!-- Record specific content will be inserted through the default slot -->
    <slot></slot>
    
    <!-- Common fields at the bottom -->
    <p class="text-gray-300 text-sm mt-3 italic" v-if="comment">
      "{{ comment }}"
    </p>
    <div class="text-xs text-gray-400 mt-2">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatDate } from '~/utils/formatter';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['assessment', 'ticket'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: [String, Number],
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  date: {
    type: [String, Date],
    required: true
  },
  showBorder: {
    type: Boolean,
    default: true
  }
});

// Format date for display
const formattedDate = computed(() => {
  // If it's already a formatted string like "April 28, 2025", return as is
  if (typeof props.date === 'string' && !props.date.includes('T')) {
    return props.date;
  }
  
  // Otherwise format the date
  return new Date(props.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
});

// Format status for display
const displayStatus = computed(() => {
  if (props.type === 'ticket') {
    return props.status;
  } else {
    // For assessments, status is the rating
    return `${props.status}/5`;
  }
});
</script>