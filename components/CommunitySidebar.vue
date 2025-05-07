<template>
  <div class="fixed left-0 top-0 h-screen w-80 bg-gray-800/95 backdrop-blur-lg border-r border-gray-700 p-5 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
    <!-- Logo/Header -->
    <div class="mb-8 flex items-center justify-between">
      <h2 class="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Economies</h2>
      <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Beta</span>
    </div>

    <!-- Search and filters -->
    <div class="mb-8 space-y-4">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search economies..."
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
        
        <!-- Market Cap filter -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Min Market Cap</label>
          <select v-model="filters.minRevenue" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="0">Any amount</option>
            <option value="10000">$10k+</option>
            <option value="50000">$50k+</option>
            <option value="100000">$100k+</option>
            <option value="1000000">$1M+</option>
          </select>
        </div>
        
        <!-- Entry Cost filter -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Max Entry Fee</label>
          <select v-model="filters.maxCost" class="w-full bg-gray-800 text-gray-300 text-xs rounded border border-gray-700 px-3 py-2 focus:outline-none focus:border-blue-500 appearance-none">
            <option value="10000">Any cost</option>
            <option value="0">Free</option>
            <option value="100">Under $100</option>
            <option value="500">Under $500</option>
            <option value="1000">Under $1,000</option>
          </select>
        </div>
        
        <!-- Access Type filter -->
        <div class="mb-4">
          <label class="text-xs text-gray-500 block mb-2">Access Type</label>
          <div class="flex space-x-2">
            <button 
              v-for="type in ['Any', 'Token', 'Invite', 'Open']" 
              :key="type"
              @click="filters.accessType = type === 'Any' ? null : type.toLowerCase()"
              :class="[
                'text-xs px-3 py-1.5 rounded-full border',
                filters.accessType === (type === 'Any' ? null : type.toLowerCase())
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
              ]"
            >
              {{ type }}
            </button>
          </div>
        </div>
        
        <!-- Growth Rate filter -->
        <div>
          <label class="text-xs text-gray-500 block mb-2">Growth Rate</label>
          <div class="flex space-x-2">
            <button 
              v-for="rate in ['Any', 'High', 'Medium', 'Stable']" 
              :key="rate"
              @click="filters.growthRate = rate === 'Any' ? null : rate.toLowerCase()"
              :class="[
                'text-xs px-3 py-1.5 rounded-full border',
                filters.growthRate === (rate === 'Any' ? null : rate.toLowerCase())
                  ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                  : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
              ]"
            >
              {{ rate }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Economic Sectors & Economies -->
    <div class="space-y-3">
      <div v-for="(sector, index) in sectors" :key="sector.name" class="mb-4">
        <!-- Sector Header (Accordion) -->
        <div 
          @click="toggleCategory(index)"
          class="flex items-center justify-between text-gray-300 cursor-pointer p-3 rounded-lg hover:bg-gray-700/30 transition-colors"
        >
          <h3 class="font-medium text-sm">{{ sector.name }}</h3>
          <div class="flex items-center">
            <span class="text-xs text-gray-500 mr-2">{{ sector.economies.length }}</span>
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
        
        <!-- Economies List (Expandable) -->
        <transition name="expand">
          <ul v-if="activeCategory === index" class="mt-2 space-y-2 pl-2">
            <li
              v-for="economy in filteredEconomies(sector.economies)"
              :key="economy.name"
              class="bg-gray-800/40 rounded-lg mb-3 hover:bg-gray-800/80 transition-colors border border-gray-700/50 hover:border-gray-700 overflow-hidden cursor-pointer"
              @click="selectEconomy(economy)"
            >
              <div class="p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <span :class="[
                      'w-2 h-2 rounded-full mr-2',
                      `bg-${economy.color}-400`
                    ]"></span>
                    <span class="font-medium text-sm text-gray-200">{{ economy.name }}</span>
                  </div>
                  <div :class="[
                    'px-2 py-1 rounded-full text-xs',
                    economy.accessType === 'token' ? 'bg-purple-500/20 text-purple-300' : 
                    economy.accessType === 'invite' ? 'bg-blue-500/20 text-blue-300' : 
                    'bg-green-500/20 text-green-300'
                  ]">
                    {{ economy.accessType.charAt(0).toUpperCase() + economy.accessType.slice(1) }}
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <div class="flex flex-col">
                    <span class="text-gray-500">Participants</span>
                    <span class="text-gray-300 font-medium">{{ economy.members }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Market Cap</span>
                    <span :class="`text-${economy.color}-400 font-medium`">${{ formatNumber(economy.marketCap) }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Entry Fee</span>
                    <span class="text-gray-300 font-medium">{{ economy.cost === 0 ? 'Free' : '$' + economy.cost }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="text-gray-500">Growth</span>
                    <div class="flex items-center">
                      <span :class="[
                        'w-1.5 h-1.5 rounded-full mr-1',
                        economy.growthRate > 20 ? 'bg-green-400' : 
                        economy.growthRate > 5 ? 'bg-yellow-400' : 'bg-red-400'
                      ]"></span>
                      <span class="text-gray-300">{{ economy.growthRate }}%</span>
                    </div>
                  </div>
                </div>

                <div class="mt-3 grid grid-cols-2 gap-2">
                  <div class="flex items-center text-xs text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>{{ economy.transactions }} transactions/day</span>
                  </div>
                  <div class="flex items-center justify-end text-xs text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{{ economy.tokenValue }}x value</span>
                  </div>
                </div>

                <button class="mt-3 w-full py-1.5 rounded text-xs font-medium bg-gray-700/50 hover:bg-gray-700 text-gray-300 transition-colors">
                  Enter Economy
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
import { ref, computed, reactive, onMounted } from 'vue';
import { formatNumber, formatCurrency } from '~/utils/formatter';

const searchQuery = ref('')
const activeCategory = ref(null)
const selectedEconomy = ref(null)
const filters = reactive({
  minRevenue: 0,
  maxCost: 10000,
  accessType: null,
  growthRate: null
})

const sectors = ref([
  {
    name: 'Creative Markets',
    economies: [
      { 
        name: 'Beat Exchange', 
        members: '1.2k', 
        membersCount: 1200, 
        marketCap: 85000, 
        cost: 50, 
        growthRate: 18, 
        color: 'blue',
        accessType: 'token',
        transactions: 32,
        tokenValue: 2.4
      },
      { 
        name: 'Voice Assets', 
        members: '890', 
        membersCount: 890, 
        marketCap: 45000, 
        cost: 75, 
        growthRate: 12, 
        color: 'purple',
        accessType: 'invite',
        transactions: 24,
        tokenValue: 1.7
      },
      { 
        name: 'Mixing Economy', 
        members: '650', 
        membersCount: 650, 
        marketCap: 120000, 
        cost: 200, 
        growthRate: 23, 
        color: 'pink',
        accessType: 'token',
        transactions: 18,
        tokenValue: 3.2
      }
    ]
  },
  {
    name: 'Equipment Markets',
    economies: [
      { 
        name: 'Guitar Exchange', 
        members: '2.3k', 
        membersCount: 2300, 
        marketCap: 210000, 
        cost: 25, 
        growthRate: 29, 
        color: 'emerald',
        accessType: 'open',
        transactions: 46,
        tokenValue: 3.8
      },
      { 
        name: 'Synth Traders', 
        members: '1.1k', 
        membersCount: 1100, 
        marketCap: 78000, 
        cost: 0, 
        growthRate: 14, 
        color: 'blue',
        accessType: 'open',
        transactions: 28,
        tokenValue: 2.1
      },
      { 
        name: 'Percussion Market', 
        members: '780', 
        membersCount: 780, 
        marketCap: 34000, 
        cost: 60, 
        growthRate: 8, 
        color: 'purple',
        accessType: 'invite',
        transactions: 15,
        tokenValue: 1.4
      }
    ]
  },
  {
    name: 'Industry Services',
    economies: [
      { 
        name: 'Label Network', 
        members: '3.4k', 
        membersCount: 3400, 
        marketCap: 1200000, 
        cost: 500, 
        growthRate: 32, 
        color: 'emerald',
        accessType: 'token',
        transactions: 86,
        tokenValue: 5.6
      },
      { 
        name: 'Marketing Exchange', 
        members: '920', 
        membersCount: 920, 
        marketCap: 67000, 
        cost: 150, 
        growthRate: 11, 
        color: 'pink',
        accessType: 'invite',
        transactions: 22,
        tokenValue: 1.9
      },
      { 
        name: 'Event Economy', 
        members: '650', 
        membersCount: 650, 
        marketCap: 93000, 
        cost: 100, 
        growthRate: 19, 
        color: 'blue',
        accessType: 'token',
        transactions: 31,
        tokenValue: 2.7
      }
    ]
  },
  {
    name: 'Music Business',
    economies: [
      { 
        name: 'Licensing Market', 
        members: '1.8k', 
        membersCount: 1800, 
        marketCap: 430000, 
        cost: 350, 
        growthRate: 24, 
        color: 'amber',
        accessType: 'token',
        transactions: 54,
        tokenValue: 4.2
      },
      { 
        name: 'Sync Marketplace', 
        members: '760', 
        membersCount: 760, 
        marketCap: 280000, 
        cost: 250, 
        growthRate: 27, 
        color: 'emerald',
        accessType: 'invite',
        transactions: 38,
        tokenValue: 3.5
      },
      { 
        name: 'Rights Exchange', 
        members: '1.2k', 
        membersCount: 1200, 
        marketCap: 155000, 
        cost: 0, 
        growthRate: 15, 
        color: 'violet',
        accessType: 'open',
        transactions: 42,
        tokenValue: 2.3
      }
    ]
  }
])

onMounted(() => {
  // Initialize the first category as open
  activeCategory.value = 0
})

const filteredEconomies = (economies) => {
  return economies.filter(economy => {
    // Text search filter
    const textMatch = economy.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    // Market Cap filter
    const revenueMatch = economy.marketCap >= filters.minRevenue
    
    // Cost filter
    const costMatch = economy.cost <= filters.maxCost
    
    // Access Type filter
    const accessMatch = filters.accessType === null || economy.accessType === filters.accessType
    
    // Growth Rate filter
    let growthMatch = true
    if (filters.growthRate) {
      if (filters.growthRate === 'high' && economy.growthRate < 20) growthMatch = false
      if (filters.growthRate === 'medium' && (economy.growthRate < 10 || economy.growthRate >= 20)) growthMatch = false
      if (filters.growthRate === 'stable' && economy.growthRate >= 10) growthMatch = false
    }
    
    return textMatch && revenueMatch && costMatch && accessMatch && growthMatch
  })
}

const toggleCategory = (index) => {
  // If clicking on already active category, close it (set to null)
  // Otherwise set the active category to the clicked index
  activeCategory.value = activeCategory.value === index ? null : index
}

const selectEconomy = (economy) => {
  selectedEconomy.value = economy
  // Here you would typically navigate to the economy details page
  // or show a modal with more details
  console.log('Selected economy:', economy.name)
}

const resetFilters = () => {
  filters.minRevenue = 0
  filters.maxCost = 10000
  filters.accessType = null
  filters.growthRate = null
  searchQuery.value = ''
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
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
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
