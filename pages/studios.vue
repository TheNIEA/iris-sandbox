<template>
  <div class="studios-page min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white pb-16">
    <!-- Hero Section -->
    <section class="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-500">
            Find Your Perfect Studio Space
          </h1>
          <p class="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto">
            Discover professional recording studios, creative workspaces, and collaborative environments tailored to your needs.
          </p>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-1/3 right-10 w-72 h-72 bg-orange-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-500/10 rounded-full filter blur-3xl"></div>
    </section>

    <!-- Filters Section -->
    <section class="px-4 sm:px-6 lg:px-8 -mt-4 mb-10">
      <div class="max-w-7xl mx-auto">
        <!-- Search Input -->
        <div class="relative mb-8 max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search studios by name or equipment..."
            class="w-full pl-10 pr-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white"
          />
        </div>

        <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 md:p-6">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 class="text-xl font-semibold mb-4 md:mb-0">Filter Studios</h2>
            <div class="flex space-x-3">
              <button @click="clearFilters" class="text-gray-400 hover:text-white transition-colors text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
              <button @click="toggleFiltersVisibility" class="text-orange-400 hover:text-orange-300 transition-colors text-sm flex items-center md:hidden">
                {{ showFilters ? 'Hide Filters' : 'Show Filters' }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="!showFilters" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Mobile Filters (Collapsible) -->
          <div :class="['md:hidden transition-all duration-300 ease-in-out overflow-hidden', 
                        showFilters ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0']">
            <div class="space-y-6 pb-4">
              <!-- Locations -->
              <div>
                <h3 class="text-sm font-medium text-gray-300 mb-3">Locations</h3>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="location in locations" 
                    :key="location"
                    @click="toggleLocation(location)"
                    :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                            selectedLocations.includes(location) 
                              ? 'bg-orange-600/80 text-white'
                              : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700']"
                  >
                    {{ location }}
                  </button>
                </div>
              </div>
              
              <!-- Services/Categories -->
              <div>
                <h3 class="text-sm font-medium text-gray-300 mb-3">Services</h3>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="service in services" 
                    :key="service"
                    @click="toggleService(service)"
                    :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                            selectedServices.includes(service) 
                              ? 'bg-orange-600/80 text-white'
                              : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700']"
                  >
                    {{ service }}
                  </button>
                </div>
              </div>
              
              <!-- Price Range -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-sm font-medium text-gray-300">Hourly Rate</h3>
                  <span class="text-sm text-gray-400">
                    ${{ priceRange[0] }} - ${{ priceRange[1] === 500 ? '500+' : priceRange[1] }}
                  </span>
                </div>
                <div class="px-2">
                  <!-- Custom slider implementation would go here, simplified for this example -->
                  <div class="h-2 bg-gray-700 rounded-full relative">
                    <div 
                      class="absolute top-0 left-0 h-full bg-orange-600 rounded-full"
                      :style="{width: `${(priceRange[1] - priceRange[0]) / 5}%`, left: `${priceRange[0] / 5}%`}"
                    ></div>
                  </div>
                  <div class="flex justify-between mt-2 text-xs text-gray-500">
                    <span>$0</span>
                    <span>$500+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Desktop Filters (Always Visible) -->
          <div class="hidden md:grid md:grid-cols-3 gap-6">
            <!-- Locations -->
            <div>
              <h3 class="text-sm font-medium text-gray-300 mb-3">Locations</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="location in locations" 
                  :key="location"
                  @click="toggleLocation(location)"
                  :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                          selectedLocations.includes(location) 
                            ? 'bg-orange-600/80 text-white'
                            : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700']"
                >
                  {{ location }}
                </button>
              </div>
            </div>
            
            <!-- Services/Categories -->
            <div>
              <h3 class="text-sm font-medium text-gray-300 mb-3">Services</h3>
              <div class="flex flex-wrap gap-2">
                <button 
                  v-for="service in services" 
                  :key="service"
                  @click="toggleService(service)"
                  :class="['px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                          selectedServices.includes(service) 
                            ? 'bg-orange-600/80 text-white'
                            : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700']"
                >
                  {{ service }}
                </button>
              </div>
            </div>
            
            <!-- Price Range -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <h3 class="text-sm font-medium text-gray-300">Hourly Rate</h3>
                <span class="text-sm text-gray-400">
                  ${{ priceRange[0] }} - ${{ priceRange[1] === 500 ? '500+' : priceRange[1] }}
                </span>
              </div>
              <div class="px-2">
                <!-- Custom slider implementation would go here, simplified for this example -->
                <div class="h-2 bg-gray-700 rounded-full relative">
                  <div 
                    class="absolute top-0 left-0 h-full bg-orange-600 rounded-full"
                    :style="{width: `${(priceRange[1] - priceRange[0]) / 5}%`, left: `${priceRange[0] / 5}%`}"
                  ></div>
                </div>
                <div class="flex justify-between mt-2 text-xs text-gray-500">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Studios Grid -->
    <section class="px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 class="text-2xl font-bold mb-2">Available Studios</h2>
            <p class="text-gray-400">{{ filteredStudios.length }} studios matching your criteria</p>
          </div>
          <div class="flex items-center space-x-3 mt-4 md:mt-0">
            <span class="text-sm text-gray-400">Sort by:</span>
            <select v-model="sortBy" class="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50">
              <option value="featured">Featured</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
              <option value="ratingDesc">Rating: Highest</option>
            </select>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredStudios.length === 0" class="flex flex-col items-center justify-center py-16">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          <h3 class="text-xl font-medium mb-2">No studios found</h3>
          <p class="text-gray-400 text-center max-w-md">
            We couldn't find any studios matching your current filters. Try adjusting your criteria or clearing filters.
          </p>
          <button @click="clearFilters" class="mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white transition-colors">
            Clear all filters
          </button>
        </div>

        <!-- Studios Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="studio in filteredStudios" 
            :key="studio.id"
            class="group bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all hover:transform hover:scale-[1.02]"
          >
            <!-- Studio Image -->
            <div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
              <div class="absolute inset-0 bg-cover bg-center" :style="{ backgroundImage: `url(${studio.imageUrl})` }"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <!-- Badges -->
              <div class="absolute top-3 left-3 flex space-x-2">
                <span v-if="studio.featured" class="bg-orange-600/90 text-white text-xs px-2 py-1 rounded-md">
                  Featured
                </span>
                <span v-if="studio.new" class="bg-blue-600/90 text-white text-xs px-2 py-1 rounded-md">
                  New
                </span>
              </div>
              
              <!-- Price Badge -->
              <div class="absolute bottom-3 right-3">
                <span class="bg-gray-900/80 text-white text-sm px-3 py-1 rounded-md font-medium">
                  ${{ studio.hourlyRate }}/hr
                </span>
              </div>
            </div>
            
            <!-- Studio Details -->
            <div class="p-5">
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-lg font-semibold mb-1 group-hover:text-orange-400 transition-all">{{ studio.name }}</h3>
                  <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="text-sm text-gray-400 ml-1">{{ studio.location }}</span>
                  </div>
                </div>
                <div class="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="text-white ml-1 font-medium">{{ studio.rating }}</span>
                </div>
              </div>
              
              <!-- Services Tags -->
              <div class="flex flex-wrap gap-2 mt-3">
                <span 
                  v-for="service in studio.services.slice(0, 3)" 
                  :key="service"
                  class="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  {{ service }}
                </span>
                <span v-if="studio.services.length > 3" class="text-gray-500 text-xs px-2 py-1">
                  +{{ studio.services.length - 3 }} more
                </span>
              </div>
              
              <!-- Studio Description -->
              <p class="text-gray-400 text-sm mt-3 line-clamp-2">{{ studio.description }}</p>
              
              <!-- Action Button -->
              <div class="mt-4 flex">
                <button @click="bookStudio(studio.id)" class="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-medium transition-colors">
                  Book Session
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Pagination -->
        <div v-if="filteredStudios.length > 0" class="mt-10 flex justify-center">
          <div class="flex space-x-1">
            <button class="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              Previous
            </button>
            <button class="px-3 py-1 rounded-md bg-orange-600 text-white">
              1
            </button>
            <button class="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              2
            </button>
            <button class="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              3
            </button>
            <button class="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Filter states
const searchQuery = ref('');
const selectedLocations = ref([]);
const selectedServices = ref([]);
const priceRange = ref([0, 500]);
const showFilters = ref(false);
const sortBy = ref('featured');

// Available filter options
const locations = [
  'Downtown',
  'West Side',
  'East Village',
  'North End',
  'Southbank',
  'Midtown'
];

const services = [
  'Recording',
  'Mixing',
  'Mastering',
  'Vocal Booth',
  'Live Room',
  'Video Production',
  'Podcast',
  'Rehearsal'
];

// Sample studio data (would typically come from an API)
const studios = ref([
  {
    id: 1,
    name: 'Skyline Sound Studios',
    description: 'Professional recording studio with state-of-the-art equipment and sound isolation. Perfect for bands, solo artists, and producers.',
    location: 'Downtown',
    services: ['Recording', 'Mixing', 'Mastering', 'Live Room'],
    hourlyRate: 95,
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+1',
    featured: true,
    new: false
  },
  {
    id: 2,
    name: 'Echo Chamber',
    description: 'Boutique recording space specializing in acoustic sessions and intimate performances with unique natural reverb.',
    location: 'West Side',
    services: ['Recording', 'Live Room', 'Acoustic Treatment'],
    hourlyRate: 75,
    rating: 4.6,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+2',
    featured: false,
    new: true
  },
  {
    id: 3,
    name: 'BeatBox Studios',
    description: 'Urban production studio focused on hip-hop, R&B, and electronic music with premium hardware and software.',
    location: 'East Village',
    services: ['Recording', 'Mixing', 'Beat Production'],
    hourlyRate: 85,
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+3',
    featured: false,
    new: false
  },
  {
    id: 4,
    name: 'PodCrafter',
    description: 'Specialized podcast recording facility with multiple microphone setups, sound dampening, and live streaming capabilities.',
    location: 'North End',
    services: ['Podcast', 'Recording', 'Live Streaming'],
    hourlyRate: 65,
    rating: 4.5,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+4',
    featured: false,
    new: false
  },
  {
    id: 5,
    name: 'Harmony Hall',
    description: 'Large tracking room with excellent acoustics for full bands, orchestras, and ensemble recordings.',
    location: 'Southbank',
    services: ['Recording', 'Live Room', 'Orchestral Recording'],
    hourlyRate: 120,
    rating: 4.9,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+5',
    featured: true,
    new: false
  },
  {
    id: 6,
    name: 'Visual Soundscape',
    description: 'Combined audio and video production facility for music videos, interviews, and visual content creation.',
    location: 'Midtown',
    services: ['Recording', 'Video Production', 'Green Screen'],
    hourlyRate: 150,
    rating: 4.7,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+6',
    featured: false,
    new: true
  },
  {
    id: 7,
    name: 'The Jam Room',
    description: 'Affordable rehearsal space with backline equipment included. Great for practicing before gigs or recording sessions.',
    location: 'West Side',
    services: ['Rehearsal', 'Backline Rental'],
    hourlyRate: 45,
    rating: 4.3,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+7',
    featured: false,
    new: false
  },
  {
    id: 8,
    name: 'Vocal Haven',
    description: 'Specialized vocal recording studio with premium microphones and acoustic treatment for perfect vocal capture.',
    location: 'Downtown',
    services: ['Recording', 'Vocal Booth', 'Mixing'],
    hourlyRate: 80,
    rating: 4.6,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+8',
    featured: false,
    new: false
  },
  {
    id: 9,
    name: 'Mastering Lab',
    description: 'Professional mastering suite with acoustic perfection and reference monitoring for the final polish on your tracks.',
    location: 'East Village',
    services: ['Mastering', 'Mixing'],
    hourlyRate: 110,
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400/333/888?text=Studio+9',
    featured: true,
    new: false
  }
]);

// Computed property for filtered and sorted studios
const filteredStudios = computed(() => {
  let result = studios.value;
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(studio => 
      studio.name.toLowerCase().includes(query) || 
      studio.description.toLowerCase().includes(query) ||
      studio.services.some(service => service.toLowerCase().includes(query))
    );
  }
  
  // Filter by selected locations
  if (selectedLocations.value.length > 0) {
    result = result.filter(studio => 
      selectedLocations.value.includes(studio.location)
    );
  }
  
  // Filter by selected services
  if (selectedServices.value.length > 0) {
    result = result.filter(studio => 
      studio.services.some(service => selectedServices.value.includes(service))
    );
  }
  
  // Filter by price range
  result = result.filter(studio => 
    studio.hourlyRate >= priceRange.value[0] && studio.hourlyRate <= priceRange.value[1]
  );
  
  // Sort results
  switch (sortBy.value) {
    case 'priceAsc':
      return result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    case 'priceDesc':
      return result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    case 'ratingDesc':
      return result.sort((a, b) => b.rating - a.rating);
    case 'featured':
    default:
      return result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.rating - a.rating);
  }
});

// Filter toggle functions
const toggleLocation = (location) => {
  if (selectedLocations.value.includes(location)) {
    selectedLocations.value = selectedLocations.value.filter(l => l !== location);
  } else {
    selectedLocations.value.push(location);
  }
};

const toggleService = (service) => {
  if (selectedServices.value.includes(service)) {
    selectedServices.value = selectedServices.value.filter(s => s !== service);
  } else {
    selectedServices.value.push(service);
  }
};

const clearFilters = () => {
  searchQuery.value = '';
  selectedLocations.value = [];
  selectedServices.value = [];
  priceRange.value = [0, 500];
  sortBy.value = 'featured';
};

const toggleFiltersVisibility = () => {
  showFilters.value = !showFilters.value;
};

// Navigation function
const bookStudio = (studioId) => {
  router.push(`/studios/${studioId}`);
};
</script>
