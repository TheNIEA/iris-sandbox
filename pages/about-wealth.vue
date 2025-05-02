<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900">
    <!-- Main Content Area -->
    <div class="max-w-md mx-auto pt-12 pb-24 px-4 sm:px-6 relative">
      <!-- Wealth Display Section -->
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
          $577,900
        </h1>
        <div class="inline-flex items-center text-green-400 text-lg font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
          </svg>
          <span>+5,200</span>
        </div>
        
        <div class="h-0.5 w-full bg-gray-700 my-8"></div>
      </div>
      
      <!-- Information Section -->
      <div class="bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-700/50 p-6 mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">About Envalumental Wealth</h2>
        
        <div class="space-y-6 text-gray-300">
          <p>
            Envalumental Wealth reflects unseen value accumulated through niconmoral contributions to society. This revolutionary concept goes beyond traditional financial metrics to measure your societal impact.
          </p>
          
          <p>
            Each verified interaction that adds value to the NIEA knowledge ecosystem increases your Envalumental Wealth score. This includes sharing information, verifying data, participating in community discussions, and developing skills that benefit society.
          </p>
          
          <p>
            Your current score of $577,900 represents the cumulative value of your contributions, with a recent increase of +5,200 from your latest activities.
          </p>
        </div>
      </div>
      
      <!-- Improvement Section -->
      <div class="bg-blue-900/30 backdrop-blur-sm rounded-xl border border-blue-700/50 p-6 mb-8">
        <h2 class="text-xl font-bold text-white mb-4">To Increase Your Score</h2>
        
        <ul class="space-y-4">
          <li class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-gray-300">Consider upskilling by learning new abilities that are valuable to society</p>
          </li>
          
          <li class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-gray-300">Engage in new opportunities to share knowledge and verify information</p>
          </li>
          
          <li class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-gray-300">Participate actively in community initiatives and collaborative projects</p>
          </li>
          
          <li class="flex items-start">
            <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-gray-300">Assess your skills and develop those with high societal value ratings</p>
          </li>
        </ul>
      </div>
      
      <!-- Get Started Button -->
      <div class="text-center">
        <NuxtLink 
          to="/skills" 
          class="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 text-white text-lg"
        >
          Explore Your Skills
        </NuxtLink>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-1/3 right-0 w-48 h-48 bg-blue-500/10 rounded-full filter blur-3xl -translate-y-1/2"></div>
      <div class="absolute bottom-0 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
    </div>
    
    <!-- Navigation Bar -->
    <div class="fixed bottom-0 inset-x-0 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
      <div class="max-w-md mx-auto">
        <div class="flex justify-around items-center py-3 px-4">
          <NuxtLink to="/profile" class="flex flex-col items-center px-3 py-2 text-blue-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-xs mt-1">Home</span>
          </NuxtLink>
          
          <NuxtLink to="/about-wealth" class="flex flex-col items-center px-3 py-2 text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span class="text-xs mt-1">Analytics</span>
          </NuxtLink>
          
          <NuxtLink to="/skills" class="flex flex-col items-center px-3 py-2 text-blue-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <span class="text-xs mt-1">Skills</span>
          </NuxtLink>
          
          <NuxtLink to="/profile" class="flex flex-col items-center px-3 py-2 text-blue-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-xs mt-1">Profile</span>
          </NuxtLink>
        </div>
        
        <!-- Navigation Position Indicator -->
        <div class="flex justify-around items-center pb-1 px-4">
          <div class="h-1 w-3 rounded-full bg-gray-700"></div>
          <div class="h-1 w-8 rounded-full bg-blue-500"></div>
          <div class="h-1 w-3 rounded-full bg-gray-700"></div>
          <div class="h-1 w-3 rounded-full bg-gray-700"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script required for this page
</script>