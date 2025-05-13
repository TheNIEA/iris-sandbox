<template>
  <div class="flex flex-col items-center mb-6 relative z-10">
    <!-- Container for the value display with free-flowing animations -->
    <div class="relative w-full h-40">
      <!-- Animated background elements that flow freely -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- Subtle glowing particles -->
        <div v-for="i in 12" :key="i" class="absolute rounded-full opacity-50 hidden"
          :style="{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 255, ${0.3 + Math.random() * 0.7})`,
            animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`,
            transform: `scale(${0.5 + Math.random() * 1.5})`,
          }"
        ></div>
        
        <!-- Star decoration in the flowing background -->
        <div class="stars-container absolute inset-0 pointer-events-none hidden">
          <div v-for="i in 8" :key="i" class="absolute star opacity-70"
            :style="{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 7}s`,
              transform: `scale(${0.3 + Math.random() * 0.7})`,
            }"
          >
            ★
          </div>
        </div>
      </div>
      
      <!-- Glass panel for the envalumental value -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div class="px-8 py-4 bg-white/5 backdrop-blur-md border border-blue-400/20 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <!-- Wealth value with glass morphism effect -->
          <div class="flex flex-col items-center justify-center">
            <h3 class="text-gray-300 mb-1">Envalumental Wealth</h3>
            <div class="flex justify-center items-baseline">
              <div class="wealth-value-container relative overflow-hidden text-center" style="min-width: 9.5rem;">
                <div ref="wealthValueRef" class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 tabular-nums">
                  <span class="text-xl text-blue-400 font-medium">$</span>{{ formattedWealthDisplay }}
                </div>
              </div>
            </div>
            <div class="flex items-center mt-1">
              <span class="text-xs text-blue-300">In Envalument (USD)</span>
              <button @click="$emit('show-info')" class="ml-1 text-blue-300 hover:text-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            
            <!-- Growth indicator -->
            <div class="flex items-center justify-center mt-1" v-if="growthPercentage">
              <span class="flex items-center text-sm" :class="growthPercentage >= 0 ? 'text-green-400' : 'text-red-400'">
                <svg v-if="growthPercentage >= 0" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                </svg>
                {{ growthPercentage >= 0 ? '+' : '' }}{{ growthPercentage }}%
              </span>
              <span v-if="timePeriod" class="text-gray-500 text-xs ml-2">{{ timePeriod }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Animated particles in the background -->
      <div v-for="i in 6" :key="`particle-${i}`" class="absolute rounded-full hidden"
        :style="{
          width: `${4 + Math.random() * 6}px`,
          height: `${4 + Math.random() * 6}px`,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          backgroundColor: `rgba(${150 + Math.random() * 105}, ${150 + Math.random() * 105}, 255, ${0.4 + Math.random() * 0.6})`,
          animation: `float ${10 + Math.random() * 20}s infinite ease-in-out`,
          animationDelay: `${Math.random() * 5}s`,
        }"
      ></div>
      
      <!-- Background glow effect -->
      <div class="absolute top-0 left-1/4 w-1/2 h-1/3 bg-blue-500/20 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-1/2 h-1/3 bg-purple-500/20 rounded-full filter blur-3xl"></div>
    </div>
  </div>
</template>

<script setup>
import { formatNumber } from '~/utils/formatter';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  wealthAmount: {
    type: Number,
    required: true
  },
  growthPercentage: {
    type: Number,
    default: null
  },
  timePeriod: {
    type: String,
    default: null
  }
});

defineEmits(['show-info']);

// Reference to the wealth value element for animation
const wealthValueRef = ref(null);
const currentDisplayValue = ref(0);

// Format numbers with commas
const formattedWealthDisplay = computed(() => {
  return new Intl.NumberFormat().format(currentDisplayValue.value);
});

// Animate the counter on mount
onMounted(() => {
  animateValue(0, props.wealthAmount, 2000);
});

// Number animation function
const animateValue = (start, end, duration) => {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    currentDisplayValue.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
</script>

<style scoped>
.star {
  font-size: 10px;
  color: rgba(150, 200, 255, 0.7);
  animation: twinkle infinite ease-in-out;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(5px);
  }
  50% {
    transform: translateY(-5px) translateX(10px);
  }
  75% {
    transform: translateY(5px) translateX(-10px);
  }
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>