<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 flex items-center justify-center py-12 px-4 sm:px-6">
    <div class="max-w-md w-full space-y-8 bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl border border-blue-700/50">
      <!-- Header Section -->
      <div class="flex flex-col items-center relative">
        <div class="absolute left-0 top-0">
          <button @click="$router.back()" class="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800/50 hover:bg-blue-700/50 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <h1 class="text-3xl font-bold text-white">Sweet!</h1>
        <p class="mt-3 text-center text-gray-300">
          Enter your details and submit your rating
        </p>
      </div>

      <!-- Form Fields -->
      <form @submit.prevent="submitForm" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="sr-only">Full Name</label>
            <div class="relative">
              <input 
                id="name" 
                v-model="formData.name" 
                name="name" 
                type="text" 
                required 
                class="w-full px-5 py-4 border-0 bg-blue-800/60 placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all" 
                placeholder="Full Name"
              />
              <div v-if="errors.name" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                {{ errors.name }}
              </div>
            </div>
          </div>

          <div class="mt-6">
            <label for="email" class="sr-only">Email Address</label>
            <div class="relative">
              <input 
                id="email" 
                v-model="formData.email" 
                name="email" 
                type="email" 
                required 
                class="w-full px-5 py-4 border-0 bg-blue-800/60 placeholder-gray-400 text-white rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all" 
                placeholder="Email Address"
              />
              <div v-if="errors.email" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                {{ errors.email }}
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-12">
          <button 
            type="submit"
            :disabled="submitting" 
            :class="[
              'w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-lg font-medium text-white bg-blue-600 hover:bg-blue-500 focus:outline-none transition-colors shadow-lg hover:shadow-blue-500/20 relative overflow-hidden',
              submitting ? 'opacity-70 cursor-not-allowed' : ''
            ]"
          >
            <span v-if="!submitting">Submit</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
            
            <!-- Decorative ripple effect on hover -->
            <span class="absolute inset-0 overflow-hidden rounded-xl ripple-effect"></span>
          </button>
        </div>
      </form>
      
      <!-- Success Message (shown after submission) -->
      <div v-if="submitted" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/70 backdrop-blur-sm">
        <div class="bg-gradient-to-b from-blue-800 to-blue-900 p-8 rounded-xl border border-blue-500/30 max-w-md w-full text-center relative overflow-hidden shadow-xl">
          <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          
          <div class="w-20 h-20 bg-blue-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h3 class="text-2xl font-bold text-white mb-3">Submission Successful!</h3>
          <p class="text-gray-300 mb-6">
            Thank you for submitting your details. Your Envalumental Wealth journey begins now.
          </p>
          
          <div class="flex space-x-4">
            <NuxtLink 
              to="/about-wealth" 
              class="flex-1 py-3 px-5 bg-blue-700 hover:bg-blue-600 rounded-lg font-medium text-white transition-colors"
            >
              Learn More
            </NuxtLink>
            <NuxtLink 
              to="/profile" 
              class="flex-1 py-3 px-5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 rounded-lg font-medium text-white transition-colors"
            >
              Go to Profile
            </NuxtLink>
          </div>
          
          <!-- Decorative elements -->
          <div class="absolute top-1/4 right-0 w-40 h-40 bg-blue-500/10 rounded-full filter blur-2xl"></div>
          <div class="absolute bottom-0 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full filter blur-2xl"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

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

<style scoped>
.ripple-effect {
  background-position: center;
  transition: background 0.8s;
}

.ripple-effect:hover {
  background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 10%, transparent 10.01%) center/15000%;
}

.ripple-effect:active {
  background-color: rgba(59, 130, 246, 0.3);
  background-size: 100%;
  transition: background 0s;
}
</style>