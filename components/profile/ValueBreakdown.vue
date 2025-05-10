<template>
  <div class="bg-gray-900/60 backdrop-blur-md rounded-lg p-6 border border-blue-500/20">
    <h2 class="text-xl font-semibold mb-4 text-white">Value Breakdown</h2>
    
    <!-- Value Distribution Chart -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-gray-300 font-medium">Distribution</h3>
      </div>
      <div class="flex gap-6">
        <!-- Donut Chart Placeholder -->
        <div class="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center relative">
          <div class="absolute inset-0 rounded-full border-t-8 border-r-8 border-purple-500 transform rotate-45"></div>
          <div class="absolute inset-0 rounded-full border-t-8 border-green-500 transform rotate-[210deg]"></div>
          <div class="text-white text-2xl font-bold">{{ totalValue }}K</div>
        </div>
        
        <div class="flex flex-col justify-center gap-2">
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
            <div class="text-gray-300 text-sm">Skills ({{ calculatePercentage(skills) }}%)</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-purple-500"></div>
            <div class="text-gray-300 text-sm">Community ({{ calculatePercentage(community) }}%)</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <div class="text-gray-300 text-sm">Application ({{ calculatePercentage(application) }}%)</div>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div class="text-gray-300 text-sm">Records ({{ calculatePercentage(records) }}%)</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Monthly Growth Analysis -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-gray-300 font-medium">Monthly Growth</h3>
        <div class="text-sm px-2 py-1 bg-green-500/20 text-green-400 rounded">+{{ growthRate }}%</div>
      </div>
      
      <!-- Simple chart visualization -->
      <div class="h-16 bg-gray-800/50 rounded flex items-end gap-1 px-2">
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[30%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[40%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[35%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[50%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[45%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[60%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[65%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[70%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[75%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[80%]"></div>
        <div class="w-1/12 bg-blue-500/70 rounded-t h-[85%]"></div>
        <div class="w-1/12 bg-blue-500 rounded-t h-[90%]"></div>
      </div>
    </div>
    
    <!-- Projection -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-gray-300 font-medium">Projection</h3>
        <div class="text-blue-400 text-sm">Next month</div>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="text-2xl font-bold text-white">{{ nextMonthProjection.toFixed(1) }}K</div>
          <div class="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
            +{{ ((nextMonthProjection - totalValue) / totalValue * 100).toFixed(1) }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  totalValue: {
    type: Number,
    default: 0
  },
  skills: {
    type: Number,
    default: 0
  },
  community: {
    type: Number,
    default: 0
  },
  application: {
    type: Number,
    default: 0
  },
  records: {
    type: Number,
    default: 0
  },
  growthRate: {
    type: Number,
    default: 0
  },
  nextMonthProjection: {
    type: Number,
    default: 0
  }
});

const total = computed(() => {
  return props.skills + props.community + props.application + props.records;
});

const calculatePercentage = (value) => {
  if (total.value === 0) return 0;
  return Math.round((value / total.value) * 100);
};
</script>

<style scoped>
/* No additional styling needed beyond Tailwind classes */
</style>