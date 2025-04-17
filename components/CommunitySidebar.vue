<template>
  <div class="fixed left-0 top-0 h-screen w-80 bg-gray-800/95 backdrop-blur-lg border-r border-gray-700 p-5 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
    <!-- Logo/Header -->
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Ecosystems</h2>
      <span class="text-xs px-2 py-1 bg-blue-900/50 border border-blue-700/30 rounded-full text-blue-300">Beta 2.0</span>
    </div>

    <!-- Search and filters -->
    <div class="mb-8 space-y-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search ecosystems..."
          class="w-full bg-gray-900/50 text-gray-100 rounded-lg pl-10 pr-4 py-3 border border-gray-700 focus:border-blue-500 focus:outline-none"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <!-- Filter options -->
      <div class="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
        <div class="flex justify-between items-center mb-3">
          <span class="text-xs text-gray-400 font-medium">FILTERS</span>
          <button @click="resetFilters" class="text-xs text-blue-400 hover:text-blue-300">Reset</button>
        </div>
        
        <!-- Network Worth filter -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Min Network Worth</label>
          <select v-model="filters.minRevenue" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="0">Any amount</option>
            <option value="10000">$10k+</option>
            <option value="50000">$50k+</option>
            <option value="100000">$100k+</option>
            <option value="1000000">$1M+</option>
          </select>
        </div>
        
        <!-- Access Cost filter -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Max Access Cost</label>
          <select v-model="filters.maxCost" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="10000">Any cost</option>
            <option value="0">Free</option>
            <option value="100">Under $100</option>
            <option value="500">Under $500</option>
            <option value="1000">Under $1,000</option>
          </select>
        </div>
        
        <!-- Circulation filter (new) -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Min Daily Circulation</label>
          <select v-model="filters.minCirculation" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="0">Any amount</option>
            <option value="1000">$1k+</option>
            <option value="5000">$5k+</option>
            <option value="10000">$10k+</option>
            <option value="50000">$50k+</option>
          </select>
        </div>
        
        <!-- Ecosystem Size filter -->
        <div>
          <label class="text-xs text-gray-500 block mb-2">Ecosystem Size</label>
          <div class="flex space-x-2">
            <button 
              v-for="size in ['Any', 'Micro', 'Small', 'Large']" 
              :key="size"
              @click="filters.size = size === 'Any' ? null : size.toLowerCase()"
              :class="[
                'text-xs px-3 py-1.5 rounded-full border',
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

    <!-- Categories & Ecosystems -->
    <div class="space-y-3">
      <div v-for="(category, index) in categories" :key="category.name" class="mb-4">
        <!-- Category Header (Accordion) -->
        <div 
          @click="toggleCategory(index)"
          class="flex items-center justify-between text-gray-300 cursor-pointer p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
        >
          <h3 class="font-medium text-sm">{{ category.name }}</h3>
          <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">{{ category.ecosystems.length }}</span>
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
        
        <!-- Ecosystems List (Expandable) -->
        <transition name="expand">
          <ul v-if="activeCategory === index" class="mt-2 space-y-2 pl-2">
            <li
              v-for="ecosystem in filteredEcosystems(category.ecosystems)"
              :key="ecosystem.name"
              class="bg-gray-800/40 rounded-lg mb-3 hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-gray-700 overflow-hidden"
            >
              <div class="p-4">
                <div class="flex items-center mb-3">
                  <span :class="[
                    'w-2 h-2 rounded-full mr-2',
                    `bg-${ecosystem.color}-400`
                  ]"></span>
                  <span class="font-medium text-sm text-gray-200">{{ ecosystem.name }}</span>
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="flex flex-col">
                    <span class="text-gray-500">Participants</span>
                    <span class="text-gray-300 font-medium">{{ ecosystem.members }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Network Worth</span>
                    <span :class="`text-${ecosystem.color}-400 font-medium`">${{ formatNumber(ecosystem.revenue) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Daily Circulation</span>
                    <span :class="`text-${ecosystem.color}-300 font-medium`">${{ formatNumber(ecosystem.circulation) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Deal Flow</span>
                    <div class="flex items-center">
                      <span :class="[
                        'w-1.5 h-1.5 rounded-full mr-1',
                        ecosystem.dealFlow > 70 ? 'bg-green-400' : 
                        ecosystem.dealFlow > 30 ? 'bg-yellow-400' : 'bg-red-400'
                      ]"></span>
                      <span class="text-gray-300">{{ ecosystem.dealFlow }}%</span>
                    </div>
                  </div>
                </div>

                <div class="mt-3 flex space-x-2">
                  <button class="flex-1 py-1.5 rounded text-xs font-medium bg-gray-700/50 hover:bg-gray-700 text-gray-300 transition-colors">
                    View Data
                  </button>
                  <button class="flex-1 py-1.5 rounded text-xs font-medium bg-blue-700/40 hover:bg-blue-700/60 text-blue-300 transition-colors">
                    Join
                  </button>
                </div>
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
const activeCategory = ref(null)
const filters = reactive({
  minRevenue: 0,
  maxCost: 10000,
  minCirculation: 0,
  size: null
})

const categories = ref([
  {
    name: 'Technology',
    ecosystems: [
      { 
        name: 'AI Innovators', 
        members: '2.3k', 
        membersCount: 2300, 
        revenue: 3850000, 
        circulation: 42000,
        cost: 150, 
        dealFlow: 89, 
        color: 'blue',
        openPositions: 24
      },
      { 
        name: 'Web3 Builders', 
        members: '1.8k', 
        membersCount: 1800, 
        revenue: 2450000, 
        circulation: 28000,
        cost: 200, 
        dealFlow: 76, 
        color: 'purple',
        openPositions: 17
      },
      { 
        name: 'Data Science Hub', 
        members: '1.5k', 
        membersCount: 1500, 
        revenue: 1820000, 
        circulation: 15000,
        cost: 100, 
        dealFlow: 82, 
        color: 'emerald',
        openPositions: 12
      }
    ]
  },
  {
    name: 'Entertainment',
    ecosystems: [
      { 
        name: 'Creator Economy', 
        members: '4.2k', 
        membersCount: 4200, 
        revenue: 5600000, 
        circulation: 76000,
        cost: 75, 
        dealFlow: 91, 
        color: 'pink',
        openPositions: 38
      },
      { 
        name: 'Media Production', 
        members: '2.4k', 
        membersCount: 2400, 
        revenue: 3200000, 
        circulation: 45000,
        cost: 125, 
        dealFlow: 84, 
        color: 'amber',
        openPositions: 26
      },
      { 
        name: 'Gaming Collective', 
        members: '3.5k', 
        membersCount: 3500, 
        revenue: 4100000, 
        circulation: 67000,
        cost: 50, 
        dealFlow: 88, 
        color: 'indigo',
        openPositions: 31
      }
    ]
  },
  {
    name: 'Finance',
    ecosystems: [
      { 
        name: 'DeFi Alliance', 
        members: '1.7k', 
        membersCount: 1700, 
        revenue: 8200000, 
        circulation: 145000,
        cost: 500, 
        dealFlow: 79, 
        color: 'emerald',
        openPositions: 14
      },
      { 
        name: 'FinTech Innovators', 
        members: '1.9k', 
        membersCount: 1900, 
        revenue: 6700000, 
        circulation: 98000,
        cost: 350, 
        dealFlow: 85, 
        color: 'blue',
        openPositions: 22
      },
      { 
        name: 'Impact Investing', 
        members: '1.1k', 
        membersCount: 1100, 
        revenue: 4300000, 
        circulation: 55000,
        cost: 250, 
        dealFlow: 71, 
        color: 'violet',
        openPositions: 9
      }
    ]
  },
  {
    name: 'Platforms',
    ecosystems: [
      { 
        name: 'SaaS Ecosystem', 
        members: '2.6k', 
        membersCount: 2600, 
        revenue: 7400000, 
        circulation: 110000,
        cost: 300, 
        dealFlow: 87, 
        color: 'cyan',
        openPositions: 29
      },
      { 
        name: 'Marketplace Builders', 
        members: '1.8k', 
        membersCount: 1800, 
        revenue: 5200000, 
        circulation: 78000,
        cost: 200, 
        dealFlow: 82, 
        color: 'amber',
        openPositions: 20
      },
      { 
        name: 'Open Source Network', 
        members: '3.2k', 
        membersCount: 3200, 
        revenue: 1950000, 
        circulation: 32000,
        cost: 0, 
        dealFlow: 93, 
        color: 'emerald',
        openPositions: 41
      }
    ]
  }
])

onMounted(() => {
  // Initialize the first category as open
  activeCategory.value = 0
})

const filteredEcosystems = (ecosystems) => {
  return ecosystems.filter(ecosystem => {
    // Text search filter
    const textMatch = ecosystem.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Network worth filter
    const revenueMatch = ecosystem.revenue >= filters.minRevenue
    
    // Cost filter
    const costMatch = ecosystem.cost <= filters.maxCost
    
    // Circulation filter (new)
    const circulationMatch = ecosystem.circulation >= filters.minCirculation
    
    // Size filter
    let sizeMatch = true
    if (filters.size) {
      if (filters.size === 'micro' && ecosystem.membersCount >= 1500) sizeMatch = false
      if (filters.size === 'small' && (ecosystem.membersCount < 1500 || ecosystem.membersCount >= 3000)) sizeMatch = false
      if (filters.size === 'large' && ecosystem.membersCount < 3000) sizeMatch = false
    }
    
    return textMatch && revenueMatch && costMatch && circulationMatch && sizeMatch
  })
}

const toggleCategory = (index) => {
  activeCategory.value = activeCategory.value === index ? null : index
}

const resetFilters = () => {
  filters.minRevenue = 0
  filters.maxCost = 10000
  filters.minCirculation = 0
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
