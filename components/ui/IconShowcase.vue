<template>
  <div class="bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-800/30">
    <h2 class="text-2xl font-bold text-white mb-6">Icon System Showcase</h2>
    
    <!-- Icon Size Variations -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-blue-300 mb-4">Icon Sizes</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="size in [16, 24, 32, 48]" :key="size" class="flex flex-col items-center">
          <HomeIcon :size="size" />
          <span class="text-xs text-gray-400 mt-2">{{ size }}px</span>
        </div>
      </div>
    </div>
    
    <!-- Icon Color Variations -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold text-blue-300 mb-4">Icon Colors</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div v-for="color in ['text-blue-500', 'text-purple-500', 'text-green-500', 'text-yellow-500', 'text-red-500', 'text-gray-300']" 
             :key="color" 
             class="flex flex-col items-center">
          <HomeIcon size="24" :custom-class="color" />
          <span class="text-xs text-gray-400 mt-2">{{ color.replace('text-', '') }}</span>
        </div>
      </div>
    </div>
    
    <!-- All Icons -->
    <div>
      <h3 class="text-lg font-semibold text-blue-300 mb-4">All Available Icons</h3>
      <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-6">
        <div class="flex flex-col items-center">
          <HomeIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">HomeIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <ChevronDownIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">ChevronDownIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <ChevronUpIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">ChevronUpIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <ChevronLeftIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">ChevronLeftIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <ChevronRightIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">ChevronRightIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <CloseIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">CloseIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <PlusIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">PlusIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <MinusIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">MinusIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <SearchIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">SearchIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <UserIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">UserIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <DocumentIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">DocumentIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <TicketIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">TicketIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <ShareIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">ShareIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <DownloadIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">DownloadIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <GlobeIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">GlobeIcon</span>
        </div>
        <div class="flex flex-col items-center">
          <CheckIcon size="24" />
          <span class="text-xs text-gray-400 mt-2">CheckIcon</span>
        </div>
      </div>
    </div>
    
    <!-- Dynamic Icon Usage Example -->
    <div class="mt-8 pt-6 border-t border-gray-800">
      <h3 class="text-lg font-semibold text-blue-300 mb-4">Dynamic Icon Usage</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="iconName in ['home', 'search', 'check', 'close']" :key="iconName" class="flex flex-col items-center">
          <DynamicIcon :name="iconName" size="24" />
          <span class="text-xs text-gray-400 mt-2">{{ iconName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  HomeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  SearchIcon,
  UserIcon,
  DocumentIcon,
  TicketIcon,
  ShareIcon,
  DownloadIcon,
  GlobeIcon,
  CheckIcon,
  DynamicIcon
} from '~/components/ui/icons';
</script>