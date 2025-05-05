<template>
  <div class="relative min-h-screen w-full bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 text-white overflow-hidden">
    <!-- Animated background with particles similar to mock home panel -->
    <canvas id="background-canvas" class="absolute inset-0 -z-10"></canvas>
    
    <!-- Grid patterns overlay for visual texture -->
    <div class="absolute inset-0 -z-5 opacity-20">
      <svg viewBox="0 0 100 100" class="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" patternUnits="userSpaceOnUse" width="10" height="10" x="0" y="0">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
      </svg>
    </div>
    
    <!-- Animated floating particles -->
    <div v-for="i in 12" :key="i" class="absolute rounded-full opacity-70"
      :style="{
        width: `${2 + Math.random() * 5}px`,
        height: `${2 + Math.random() * 5}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        backgroundColor: `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 255, ${0.3 + Math.random() * 0.7})`,
        animation: `float ${5 + Math.random() * 10}s infinite ease-in-out`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `scale(${0.5 + Math.random() * 1.5})`,
        zIndex: -1
      }"
    ></div>

    <!-- Decorative glowing gradient elements -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl -z-1"></div>
    <div class="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl -z-1"></div>
    <div class="absolute top-1/3 left-1/4 w-60 h-60 bg-cyan-600/10 rounded-full filter blur-3xl -z-1"></div>
    
    <!-- Header -->
    <div class="relative z-10 pt-6 pb-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Back button with glass morphism -->
        <div class="flex justify-between items-center mb-8">
          <button @click="$router.back()" class="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 text-white transition-all border border-white/10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <!-- NIEA small logo -->
          <div class="flex items-center">
            <img src="https://s3.us-east-2.amazonaws.com/theniea.com/TheNIEA-icon.png" alt="NIEA Logo" class="h-8 w-auto mr-2" />
            <span class="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">NIEA</span>
          </div>
        </div>
        
        <div class="text-center max-w-md mx-auto">
          <div class="mb-3">
            <span class="bg-blue-500/20 text-blue-300 text-xs px-3 py-1 rounded-full backdrop-blur-sm">Step 1 of 2</span>
          </div>
          <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-2">Create Your Profile</h1>
          <p class="text-blue-200/80 max-w-sm mx-auto">
            Enter your details to start your journey and join the envalumental economy
          </p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
      <div class="max-w-md mx-auto">
        <div class="backdrop-blur-md bg-gray-900/30 p-8 rounded-xl border border-blue-500/20 shadow-[0_0_25px_rgba(59,130,246,0.15)]">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="space-y-5">
              <div>
                <label for="name" class="block text-sm font-medium text-blue-200 mb-2">Full Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input 
                    id="name" 
                    v-model="formData.name" 
                    name="name" 
                    type="text" 
                    required 
                    class="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700/80 hover:border-blue-500/30 focus:border-blue-500/50 placeholder-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all backdrop-blur-sm" 
                    placeholder="Enter your name"
                  />
                  <div v-if="errors.name" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                    {{ errors.name }}
                  </div>
                </div>
              </div>

              <div class="mt-6">
                <label for="email" class="block text-sm font-medium text-blue-200 mb-2">Email Address</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input 
                    id="email" 
                    v-model="formData.email" 
                    name="email" 
                    type="email" 
                    required 
                    class="w-full pl-10 pr-4 py-3 bg-gray-800/60 border border-gray-700/80 hover:border-blue-500/30 focus:border-blue-500/50 placeholder-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all backdrop-blur-sm" 
                    placeholder="name@example.com"
                  />
                  <div v-if="errors.email" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                    {{ errors.email }}
                  </div>
                </div>
              </div>
              
              <!-- New: Password field -->
              <div class="mt-6">
                <label for="password" class="block text-sm font-medium text-blue-200 mb-2">Create Password</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input 
                    id="password" 
                    v-model="formData.password" 
                    name="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    required 
                    class="w-full pl-10 pr-10 py-3 bg-gray-800/60 border border-gray-700/80 hover:border-blue-500/30 focus:border-blue-500/50 placeholder-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all backdrop-blur-sm" 
                    placeholder="Create a strong password"
                  />
                  <button 
                    type="button" 
                    @click="showPassword = !showPassword" 
                    class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-200"
                  >
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <div v-if="errors.password" class="absolute -bottom-6 left-0 text-red-400 text-sm">
                    {{ errors.password }}
                  </div>
                </div>
                <!-- Password strength indicator -->
                <div class="mt-2">
                  <div class="flex items-center justify-between">
                    <div class="flex space-x-1 flex-grow">
                      <div 
                        v-for="i in 4" 
                        :key="i" 
                        class="h-1 w-full rounded-full transition-colors"
                        :class="[
                          passwordStrength >= i 
                            ? passwordStrength >= 3 ? 'bg-green-500' : passwordStrength >= 2 ? 'bg-yellow-500' : 'bg-red-500'
                            : 'bg-gray-600'
                        ]"
                      ></div>
                    </div>
                    <span class="text-xs ml-2 min-w-[80px]" 
                      :class="[
                        passwordStrength >= 3 ? 'text-green-400' : 
                        passwordStrength >= 2 ? 'text-yellow-400' :
                        passwordStrength >= 1 ? 'text-red-400' : 
                        'text-gray-500'
                      ]"
                    >
                      {{ passwordStrength === 0 ? 'No password' :
                         passwordStrength === 1 ? 'Weak' :
                         passwordStrength === 2 ? 'Fair' :
                         passwordStrength === 3 ? 'Good' : 
                         'Strong' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="mt-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="terms"
                    v-model="formData.terms"
                    name="terms"
                    type="checkbox"
                    required
                    class="h-4 w-4 rounded border-gray-600 text-blue-500 focus:ring-blue-500/30 bg-gray-700/80"
                  />
                </div>
                <div class="ml-3">
                  <label for="terms" class="text-sm text-gray-300">
                    I agree to the <a href="#" class="text-blue-400 hover:underline">Terms and Conditions</a> and <a href="#" class="text-blue-400 hover:underline">Privacy Policy</a>
                  </label>
                </div>
              </div>
              <div v-if="errors.terms" class="mt-1 text-red-400 text-sm">
                {{ errors.terms }}
              </div>
            </div>

            <!-- Submit Button -->
            <div class="mt-10">
              <button 
                type="submit"
                :disabled="submitting" 
                class="w-full flex justify-center py-3 px-4 rounded-lg text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none transition-all transform hover:scale-[1.01] shadow-lg hover:shadow-blue-500/20 relative overflow-hidden disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <span v-if="!submitting" class="relative z-10">Get Started</span>
                <span v-else class="flex items-center relative z-10">
                  <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
                <!-- Button glow effect -->
                <div class="absolute inset-0 flex">
                  <div class="h-full w-[20%] animate-[glow_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </div>
              </button>
            </div>
            
            <!-- Alternative login options -->
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-700/80"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-gray-900/30 text-gray-400 backdrop-blur-sm">or continue with</span>
                </div>
              </div>
              
              <div class="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  class="inline-flex justify-center py-2.5 px-4 border border-gray-700 rounded-lg backdrop-blur-sm bg-gray-800/40 hover:bg-gray-700/50 transition-all"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
                    <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
                    <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
                    <path d="M12.0004 24C15.2404 24 18.0004 22.94 19.9454 21.095L16.0804 18.075C15.0054 18.775 13.6204 19.175 12.0004 19.175C8.8704 19.175 6.21537 17.065 5.2654 14.22L1.2754 17.315C3.2504 21.225 7.3104 24 12.0004 24Z" fill="#34A853"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center py-2.5 px-4 border border-gray-700 rounded-lg backdrop-blur-sm bg-gray-800/40 hover:bg-gray-700/50 transition-all"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 16.84 5.44 20.87 10 21.8V15H8V12H10V9.5C10 7.57 11.57 6 13.5 6H16V9H14C13.45 9 13 9.45 13 10V12H16V15H13V21.95C18.05 21.45 22 17.19 22 12Z" fill="currentColor"/>
                  </svg>
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center py-2.5 px-4 border border-gray-700 rounded-lg backdrop-blur-sm bg-gray-800/40 hover:bg-gray-700/50 transition-all"
                >
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="mt-6 text-center text-sm">
              <span class="text-gray-400">Already have an account?</span>
              <a href="#" class="ml-1 text-blue-400 hover:underline">Sign in</a>
            </div>
          </form>
        </div>
      </div>
    </div>
      
    <!-- Success Modal (shown after submission) -->
    <div v-if="submitted" 
      class="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-gray-900/70"
      @click.self="submitted = false"
    >
      <div 
        class="bg-gradient-to-b from-gray-900 via-blue-950/70 to-purple-950/70 p-8 rounded-xl border border-blue-500/30 max-w-md w-full relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.25)] backdrop-blur-md transform transition-all"
        :class="{ 'scale-100 opacity-100': modalVisible, 'scale-90 opacity-0': !modalVisible }"
      >
        <!-- Top glowing border -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
        
        <!-- Success icon with animated ring -->
        <div class="relative w-20 h-20 mx-auto mb-6">
          <div class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 animate-pulse"></div>
          <div class="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-[spin_10s_linear_infinite]"></div>
          <div class="absolute inset-0 rounded-full border border-blue-400/50 animate-[spin_15s_linear_infinite_reverse]"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <!-- Success content -->
        <h3 class="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-2">Welcome Aboard!</h3>
        <p class="text-blue-200/80 text-center mb-6">
          Your profile has been created successfully. Ready to start your journey?
        </p>
        
        <!-- Steps completed indicator -->
        <div class="w-full bg-gray-800/50 h-2 rounded-full overflow-hidden mb-2">
          <div class="bg-gradient-to-r from-cyan-500 to-blue-600 h-full rounded-full" style="width: 100%"></div>
        </div>
        <div class="text-xs text-cyan-300 text-center mb-6">Account setup complete!</div>
        
        <!-- Action buttons -->
        <div class="grid grid-cols-2 gap-4">
          <NuxtLink 
            to="/profile" 
            class="py-3 px-4 flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/20"
          >
            <span>Go to Profile</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </NuxtLink>
          <button 
            @click="submitted = false" 
            class="py-3 px-4 border border-gray-700 hover:border-gray-600 rounded-lg font-medium text-gray-300 hover:text-white transition-all backdrop-blur-sm"
          >
            Close
          </button>
        </div>
        
        <!-- Decorative floating stars -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div v-for="i in 5" :key="i" class="absolute text-blue-300/50 animate-pulse"
            :style="{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 10}px`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`
            }"
          >
            ★
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  password: '',
  terms: false
});

const errors = reactive({
  name: '',
  email: '',
  password: '',
  terms: ''
});

const submitting = ref(false);
const submitted = ref(false);
const modalVisible = ref(false);
const showPassword = ref(false);

// Password strength calculation
const passwordStrength = computed(() => {
  const password = formData.password;
  if (!password) return 0;
  
  let score = 0;
  
  // Length check
  if (password.length > 7) score++;
  
  // Character variety checks
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  
  return Math.min(score, 4);
});

watch(submitted, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      modalVisible.value = true;
    }, 100);
  } else {
    modalVisible.value = false;
  }
});

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
      gradient.addColorStop(0, `rgba(99, 179, 237, ${particle.opacity})`);
      gradient.addColorStop(1, 'rgba(99, 179, 237, 0)');
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
  errors.password = '';
  errors.terms = '';
  
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
  
  // Validate password
  if (!formData.password) {
    errors.password = 'Password is required';
    valid = false;
  } else if (formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    valid = false;
  }
  
  // Validate terms
  if (!formData.terms) {
    errors.terms = 'You must accept the terms and conditions';
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

@keyframes glow {
  0%, 100% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
</style>