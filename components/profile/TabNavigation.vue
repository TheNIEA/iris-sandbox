<template>
  <div>
    <!-- Navigation Bar -->
    <div class="flex justify-around items-center pt-4 pb-2 border-t border-blue-800/50">
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'dashboard' }"
        @click="setActiveTab('dashboard')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span class="text-xs mt-1">Home</span>
      </button>
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'documentation' }"
        @click="setActiveTab('documentation')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span class="text-xs mt-1">Records</span>
      </button>
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'value' }"
        @click="setActiveTab('value')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-xs mt-1">Value</span>
      </button>
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'service' }"
        @click="setActiveTab('service')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="text-xs mt-1">Service</span>
      </button>
    </div>
    
    <!-- Position Indicator for Navigation -->
    <div class="flex justify-around items-center">
      <div v-for="(tab, index) in tabs" :key="tab" 
        class="h-1 rounded-full transition-all duration-300 ease-in-out"
        :class="[
          activeTab === tab ? 'w-8 bg-gradient-to-r from-blue-400 to-purple-400' : 'w-3 bg-blue-800/50',
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:activeTab']);

const tabs = ['dashboard', 'documentation', 'value', 'service'];

const setActiveTab = (tab) => {
  emit('update:activeTab', tab);
};
</script>