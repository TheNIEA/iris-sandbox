<template>
  <div class="fixed left-0 top-0 h-screen w-64 bg-gray-800/95 backdrop-blur-lg border-r border-gray-700 p-4 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
    <!-- Logo/Header -->
    <div class="mb-6 flex items-center justify-between">
      <h2 class="text-lg font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Communities</h2>
      <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Beta</span>
    </div>

    <!-- Search and filters -->
    <div class="mb-6 space-y-3">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search communities..."
          class="w-full bg-gray-900/50 text-gray-100 rounded-lg pl-9 pr-4 py-2 border border-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <!-- Filter options -->
      <div class="bg-gray-900/30 rounded-lg p-3 border border-gray-700/50">
        <div class="flex justify-between items-center mb-2">
          <span class="text-xs text-gray-400 font-medium">FILTERS</span>
          <button @click="resetFilters" class="text-xs text-blue-400 hover:text-blue-300">Reset</button>
        </div>
        
        <!-- Revenue filter -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 block mb-1">Min Revenue</label>
          <select v-model="filters.minRevenue" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-2 py-1.5 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="0">Any amount</option>
            <option value="10000">$10k+</option>
            <option value="50000">$50k+</option>
            <option value="100000">$100k+</option>
            <option value="1000000">$1M+</option>
          </select>
        </div>
        
        <!-- Cost filter -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 block mb-1">Max Entry Cost</label>
          <select v-model="filters.maxCost" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-2 py-1.5 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="10000">Any cost</option>
            <option value="0">Free</option>
            <option value="100">Under $100</option>
            <option value="500">Under $500</option>
            <option value="1000">Under $1,000</option>
          </select>
        </div>
        
        <!-- Size filter -->
        <div>
          <label class="text-xs text-gray-500 block mb-1">Community Size</label>
          <div class="flex space-x-2">
            <button 
              v-for="size in ['Any', 'Small', 'Medium', 'Large']" 
              :key="size"
              @click="filters.size = size === 'Any' ? null : size.toLowerCase()"
              :class="[
                'text-xs px-2 py-1 rounded-full border',
                filters.size === (size === 'Any' ? null : size.toLowerCase())
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
              ]"
            >
              {{ size }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Categories & Communities -->
    <div class="space-y-2">
      <div v-for="(category, index) in categories" :key="category.name" class="mb-3">
        <!-- Category Header (Accordion) -->
        <div 
          @click="toggleCategory(index)"
          class="flex items-center justify-between text-gray-300 cursor-pointer p-2 rounded-lg hover:bg-gray-700/30 transition-colors"
        >
          <h3 class="font-medium text-sm">{{ category.name }}</h3>
          <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">{{ category.communities.length }}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              :class="[
                'h-4 w-4 text-gray-400 transition-transform',
                activeCategory === index ? 'transform rotate-180' : ''
              ]"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        <!-- Communities List (Expandable) -->
        <transition name="expand">
          <ul v-if="activeCategory === index" class="mt-1 space-y-1 pl-1">
            <li
              v-for="community in filteredCommunities(category.communities)"
              :key="community.name"
              class="bg-gray-800/40 rounded-lg mb-2 hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-gray-700 overflow-hidden"
            >
              <div class="p-3">
                <div class="flex items-center mb-2">
                  <span :class="[
                    'w-2 h-2 rounded-full mr-2',
                    `bg-${community.color}-400`
                  ]"></span>
                  <span class="font-medium text-sm text-gray-200">{{ community.name }}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="flex flex-col">
                    <span class="text-gray-500">Members</span>
                    <span class="text-gray-300 font-medium">{{ community.members }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Revenue</span>
                    <span :class="`text-${community.color}-400 font-medium`">${{ formatNumber(community.revenue) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Cost to Join</span>
                    <span class="text-gray-300 font-medium">{{ community.cost === 0 ? 'Free' : '$' + community.cost }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Activity</span>
                    <div class="flex items-center">
                      <span :class="[
                        'w-1.5 h-1.5 rounded-full mr-1',
                        community.activity > 70 ? 'bg-green-400' : 
                        community.activity > 30 ? 'bg-yellow-400' : 'bg-red-400'
                      ]"></span>
                      <span class="text-gray-300">{{ community.activity }}%</span>
                    </div>
                  </div>
                </div>

                <button class="mt-2 w-full py-1 rounded text-xs font-medium bg-gray-700/50 hover:bg-gray-700 text-gray-300 transition-colors">
                  View Details
                </button>
              </div>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'

const searchQuery = ref('')
const activeCategory = ref(null) // Instead of expandedCategories array
const filters = reactive({
  minRevenue: 0,
  maxCost: 10000,
  size: null
})

const categories = ref([
  {
    name: 'Music Production',
    communities: [
      { name: 'Beat Makers', members: '1.2k', membersCount: 1200, revenue: 85000, cost: 50, activity: 82, color: 'blue' },
      { name: 'Vocal Artists', members: '890', membersCount: 890, revenue: 45000, cost: 75, activity: 65, color: 'purple' },
      { name: 'Mix Masters', members: '650', membersCount: 650, revenue: 120000, cost: 200, activity: 78, color: 'pink' }
    ]
  },
  {
    name: 'Instruments',
    communities: [
      { name: 'Guitar Heroes', members: '2.3k', membersCount: 2300, revenue: 210000, cost: 25, activity: 91, color: 'emerald' },
      { name: 'Keys & Synthesis', members: '1.1k', membersCount: 1100, revenue: 78000, cost: 0, activity: 73, color: 'blue' },
      { name: 'Drum Circle', members: '780', membersCount: 780, revenue: 34000, cost: 60, activity: 45, color: 'purple' }
    ]
  },
  {
    name: 'Industry',
    communities: [
      { name: 'Label Connect', members: '3.4k', membersCount: 3400, revenue: 1200000, cost: 500, activity: 88, color: 'emerald' },
      { name: 'Marketing Pros', members: '920', membersCount: 920, revenue: 67000, cost: 150, activity: 63, color: 'pink' },
      { name: 'Event Planning', members: '650', membersCount: 650, revenue: 93000, cost: 100, activity: 71, color: 'blue' }
    ]
  },
  {
    name: 'Music Business',
    communities: [
      { name: 'Licensing Guild', members: '1.8k', membersCount: 1800, revenue: 430000, cost: 350, activity: 76, color: 'amber' },
      { name: 'Sync Opportunities', members: '760', membersCount: 760, revenue: 280000, cost: 250, activity: 82, color: 'emerald' },
      { name: 'Rights Management', members: '1.2k', membersCount: 1200, revenue: 155000, cost: 0, activity: 68, color: 'violet' }
    ]
  }
])

onMounted(() => {
  // Initialize the first category as open
  activeCategory.value = 0
})

const filteredCommunities = (communities) => {
  return communities.filter(community => {
    // Text search filter
    const textMatch = community.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Revenue filter
    const revenueMatch = community.revenue >= filters.minRevenue
    
    // Cost filter
    const costMatch = community.cost <= filters.maxCost
    
    // Size filter
    let sizeMatch = true
    if (filters.size) {
      if (filters.size === 'small' && community.membersCount >= 1000) sizeMatch = false
      if (filters.size === 'medium' && (community.membersCount < 1000 || community.membersCount >= 2000)) sizeMatch = false
      if (filters.size === 'large' && community.membersCount < 2000) sizeMatch = false
    }
    
    return textMatch && revenueMatch && costMatch && sizeMatch
  })
}

const toggleCategory = (index) => {
  // If clicking on already active category, close it (set to null)
  // Otherwise set the active category to the clicked index
  activeCategory.value = activeCategory.value === index ? null : index
}

const resetFilters = () => {
  filters.minRevenue = 0
  filters.maxCost = 10000
  filters.size = null
  searchQuery.value = ''
}

const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 1000px;
  opacity: 1;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}

/* Custom select styling to remove browser default appearance */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1rem;
  padding-right: 2.5rem;
}

/* Scrollbar styling for webkit browsers */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-track-gray-800::-webkit-scrollbar-track {
  background: #1f2937;
}

.scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 20px;
}
</style>
