<template>
  <div>
    <!-- Navigation Bar -->
    <div class="flex justify-around items-center pt-4 pb-2 border-t border-blue-800/50">
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'dashboard' }"
        @click="setActiveTab('dashboard')"
      >
        <HomeIcon class="h-6 w-6" />
        <span class="text-xs mt-1">Home</span>
      </button>
      <button 
        class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'documentation' }"
        @click="setActiveTab('documentation')"
      >
        <DocumentIcon class="h-6 w-6" />
        <span class="text-xs mt-1">Records</span>
      </button>
      <button 
        class="hidden flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'value' }"
        @click="setActiveTab('value')"
      >
        <UserIcon class="h-6 w-6" />
        <span class="text-xs mt-1">Value</span>
      </button>
      <button 
        class="hidden flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
        :class="{ 'text-white font-semibold': activeTab === 'service' }"
        @click="setActiveTab('service')"
      >
        <UserIcon class="h-6 w-6" />
        <span class="text-xs mt-1">Service</span>
      </button>
    </div>
    
    <!-- Position Indicator for Navigation -->
    <div class="flex justify-around items-center">
      <!-- Only showing indicators for visible tabs -->
      <div v-for="tab in visibleTabs" :key="tab" 
        class="h-1 rounded-full transition-all duration-300 ease-in-out"
        :class="[
          activeTab === tab ? 'w-8 bg-gradient-to-r from-blue-400 to-purple-400' : 'w-3 bg-blue-800/50',
        ]"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { HomeIcon, DocumentIcon, UserIcon } from '~/components/ui/icons';

const props = defineProps({
  activeTab: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:activeTab']);

const tabs = ['dashboard', 'documentation', 'value', 'service'];
// Only show dashboard and documentation tabs in the UI
const visibleTabs = computed(() => ['dashboard', 'documentation']);

const setActiveTab = (tab) => {
  emit('update:activeTab', tab);
};
</script>