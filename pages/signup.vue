<template>
  <div class="relative min-h-screen w-full bg-gray-950 text-white overflow-x-hidden">
    <canvas id="background-canvas" class="absolute inset-0 -z-10"></canvas>
    
    <!-- Header -->
    <div class="relative z-10 pt-6 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-start items-center mb-8">
          <button @click="$router.back()" class="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800/50 hover:bg-gray-700/50 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="text-center max-w-md mx-auto">
          <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Join Us</h1>
          <p class="mt-3 text-gray-400">
            Enter your details to get started on your journey
          </p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-md mx-auto relative">
        <!-- Decorative elements -->
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
        
        <div class="relative z-10 bg-gray-900/40 backdrop-blur-sm p-8 rounded-xl border border-gray-800 shadow-lg shadow-blue-900/20">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <div class="relative">
                  <input 
                    id="name" 
                    v-model="formData.name" 
                    name="name" 
                    type="text" 
                    required 
                    class="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all" 
                    placeholder="Enter your name"
                  />
                  <div v-if="errors.name" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                    {{ errors.name }}
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <label for="email" class="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                <div class="relative">
                  <input 
                    id="email" 
                    v-model="formData.email" 
                    name="email" 
                    type="email" 
                    required 
                    class="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 placeholder-gray-500 text-white rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all" 
                    placeholder="name@example.com"
                  />
                  <div v-if="errors.email" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                    {{ errors.email }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-10">
              <button 
                type="submit"
                :disabled="submitting" 
                class="w-full flex justify-center py-3 px-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 focus:outline-none transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/20 relative overflow-hidden"
              >
                <span v-if="!submitting">Get Started</span>
                <span v-else class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
      
    <!-- Success Message (shown after submission) -->
    <div v-if="submitted" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70 backdrop-blur-md">
      <div class="bg-gray-900 p-8 rounded-xl border border-gray-800 max-w-md w-full text-center relative overflow-hidden shadow-xl">
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-600"></div>
        
        <div class="w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-3">Welcome Aboard!</h3>
        <p class="text-gray-400 mb-6">
          Thank you for signing up. Your journey begins now.
        </p>
        
        <div class="flex space-x-4">
          <NuxtLink 
            to="/profile" 
            class="flex-1 py-3 px-5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 rounded-lg font-medium text-white transition-all transform hover:scale-105"
          >
            Go to Profile
          </NuxtLink>
          <button 
            @click="submitted = false" 
            class="flex-1 py-3 px-5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium text-white transition-colors"
          >
            Close
          </button>
        </div>
        
        <!-- Decorative elements -->
        <div class="absolute top-1/4 right-0 w-40 h-40 bg-blue-500/10 rounded-full filter blur-2xl"></div>
        <div class="absolute bottom-0 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const formData = reactive({
  name: '',
  email: ''
});

const errors = reactive({
  name: '',
  email: ''
});

const submitting = ref(false);
const submitted = ref(false);

// Animation for background
onMounted(() => {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  // Particle settings
  const particleCount = 100;
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.2
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    
    // Draw and update particles
    particles.forEach(particle => {
      // Move particle
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
      
      // Draw particle
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, `rgba(56, 182, 255, ${particle.opacity})`);
      gradient.addColorStop(1, 'rgba(56, 182, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Handle resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
  
  animate();
});

const validateForm = () => {
  let valid = true;
  
  // Reset errors
  errors.name = '';
  errors.email = '';
  
  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Name is required';
    valid = false;
  }
  
  // Validate email
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
    valid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
    valid = false;
  }
  
  return valid;
};

const submitForm = async () => {
  if (!validateForm()) {
    return;
  }
  
  submitting.value = true;
  
  try {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store user data (in a real app, this would be a proper API call)
    localStorage.setItem('userData', JSON.stringify({
      name: formData.name,
      email: formData.email,
      dateJoined: new Date().toISOString()
    }));
    
    submitted.value = true;
  } catch (error) {
    console.error('Error submitting form:', error);
  } finally {
    submitting.value = false;
  }
};
</script>