<template>
  <div class="fixed left-0 top-0 h-screen w-64 bg-gray-800/95 backdrop-blur-lg border-r border-gray-700 p-4 overflow-y-auto">
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search communities..."
        class="w-full bg-gray-900/50 text-gray-100 rounded-lg px-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
      />
    </div>

    <div class="space-y-2">
      <div v-for="category in categories" :key="category.name" class="mb-4">
        <h3 class="text-gray-400 text-sm font-medium mb-2">{{ category.name }}</h3>
        <ul class="space-y-1">
          <li
            v-for="community in filteredCommunities(category.communities)"
            :key="community.name"
            class="flex items-center text-gray-300 hover:text-white cursor-pointer p-2 rounded-lg hover:bg-gray-700/50"
          >
            <span :class="[
              'w-2 h-2 rounded-full mr-2',
              `bg-${community.color}-400`
            ]"></span>
            {{ community.name }}
            <span class="ml-auto text-xs text-gray-500">{{ community.members }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const categories = ref([
  {
    name: 'Music Production',
    communities: [
      { name: 'Beat Makers', members: '1.2k', color: 'blue' },
      { name: 'Vocal Artists', members: '890', color: 'purple' },
      { name: 'Mix Masters', members: '650', color: 'pink' }
    ]
  },
  {
    name: 'Instruments',
    communities: [
      { name: 'Guitar Heroes', members: '2.3k', color: 'emerald' },
      { name: 'Keys & Synthesis', members: '1.1k', color: 'blue' },
      { name: 'Drum Circle', members: '780', color: 'purple' }
    ]
  },
  {
    name: 'Industry',
    communities: [
      { name: 'Label Connect', members: '3.4k', color: 'emerald' },
      { name: 'Marketing Pros', members: '920', color: 'pink' },
      { name: 'Event Planning', members: '650', color: 'blue' }
    ]
  }
])

const filteredCommunities = (communities) => {
  return communities.filter(community => 
    community.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
}
</script>
