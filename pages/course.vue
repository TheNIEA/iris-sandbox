<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-6 z-10">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              Transform Your Future with AI Learning
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-300">
              Join our cutting-edge courses and master the skills that will define tomorrow's tech landscape.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg">
                Enroll Now
              </button>
              <button class="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all">
                Explore Courses
              </button>
            </div>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-6 relative">
            <div class="bg-indigo-900/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-indigo-500/20">
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <div class="text-2xl text-center p-12">
                  Interactive Course Preview
                </div>
              </div>
              
              <div class="mt-6 grid grid-cols-3 gap-3">
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">50+</div>
                  <div class="text-sm text-gray-400">Courses</div>
                </div>
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">24/7</div>
                  <div class="text-sm text-gray-400">Support</div>
                </div>
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">100%</div>
                  <div class="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-1/4 right-0 w-72 h-72 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
    </section>

    <!-- Features Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-2">Why Choose Our Platform</h2>
        <p class="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our innovative approach combines cutting-edge technology with expert instruction
          to deliver an unparalleled learning experience.
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/80 transition-all hover:scale-105 border border-gray-700">
            <div class="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">AI-Powered Learning</h3>
            <p class="text-gray-400">
              Personalized learning paths adapt to your progress, ensuring you master concepts at your own pace.
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/80 transition-all hover:scale-105 border border-gray-700">
            <div class="w-12 h-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p class="text-gray-400">
              Learn from industry veterans with real-world experience in cutting-edge technologies.
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/80 transition-all hover:scale-105 border border-gray-700">
            <div class="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Community Learning</h3>
            <p class="text-gray-400">
              Connect with peers, collaborate on projects, and build a network of like-minded professionals.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Course Categories Section -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-2">Explore Course Categories</h2>
        <p class="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Dive into our comprehensive curriculum covering the most in-demand skills in AI and technology.
        </p>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Category 1 -->
          <div class="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 rounded-xl p-6 border border-indigo-700/30 hover:border-indigo-500/50 transition-all group">
            <div class="mb-4 text-indigo-400 group-hover:text-indigo-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Machine Learning</h3>
            <p class="text-gray-400 mb-4">
              From fundamentals to advanced algorithms and model deployment.
            </p>
            <span class="text-indigo-400 group-hover:text-indigo-300 flex items-center">
              12 Courses
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
          
          <!-- Category 2 -->
          <div class="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 rounded-xl p-6 border border-cyan-700/30 hover:border-cyan-500/50 transition-all group">
            <div class="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Programming</h3>
            <p class="text-gray-400 mb-4">
              Master the languages powering today's AI and tech innovations.
            </p>
            <span class="text-cyan-400 group-hover:text-cyan-300 flex items-center">
              18 Courses
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
          
          <!-- Category 3 -->
          <div class="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border border-purple-700/30 hover:border-purple-500/50 transition-all group">
            <div class="mb-4 text-purple-400 group-hover:text-purple-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">NLP & Chatbots</h3>
            <p class="text-gray-400 mb-4">
              Build intelligent conversational agents and text processors.
            </p>
            <span class="text-purple-400 group-hover:text-purple-300 flex items-center">
              9 Courses
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
          
          <!-- Category 4 -->
          <div class="bg-gradient-to-br from-pink-900/40 to-pink-800/40 rounded-xl p-6 border border-pink-700/30 hover:border-pink-500/50 transition-all group">
            <div class="mb-4 text-pink-400 group-hover:text-pink-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">Data Science</h3>
            <p class="text-gray-400 mb-4">
              Extract insights and make data-driven decisions with confidence.
            </p>
            <span class="text-pink-400 group-hover:text-pink-300 flex items-center">
              15 Courses
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-2">Featured Courses</h2>
        <p class="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our most popular courses selected by our community of learners.
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Course 1 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all hover:transform hover:scale-[1.02] group">
            <div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-indigo-400 font-bold">Course Preview</span>
              </div>
              <div class="absolute top-2 right-2 bg-indigo-600/90 text-white text-xs rounded-full px-2 py-1">
                Bestseller
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-all">Deep Learning Fundamentals</h3>
              <p class="text-gray-400 mb-4 line-clamp-2">
                Master neural networks, backpropagation, and build your first deep learning models.
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-gray-300 ml-1">4.9</span>
                  </div>
                  <span class="mx-2 text-gray-500">•</span>
                  <span class="text-gray-400">6,240 students</span>
                </div>
                <span class="font-medium text-white">$89</span>
              </div>
            </div>
          </div>
          
          <!-- Course 2 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all hover:transform hover:scale-[1.02] group">
            <div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-cyan-400 font-bold">Course Preview</span>
              </div>
              <div class="absolute top-2 right-2 bg-cyan-600/90 text-white text-xs rounded-full px-2 py-1">
                New
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-all">AI for Creative Professionals</h3>
              <p class="text-gray-400 mb-4 line-clamp-2">
                Learn how to integrate AI into your creative workflow for enhanced productivity.
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-gray-300 ml-1">4.7</span>
                  </div>
                  <span class="mx-2 text-gray-500">•</span>
                  <span class="text-gray-400">3,150 students</span>
                </div>
                <span class="font-medium text-white">$79</span>
              </div>
            </div>
          </div>
          
          <!-- Course 3 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all hover:transform hover:scale-[1.02] group">
            <div class="aspect-w-16 aspect-h-9 bg-gradient-to-r from-purple-900/20 to-pink-900/20 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-purple-400 font-bold">Course Preview</span>
              </div>
              <div class="absolute top-2 right-2 bg-purple-600/90 text-white text-xs rounded-full px-2 py-1">
                Advanced
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-all">Building AI-Powered Apps</h3>
              <p class="text-gray-400 mb-4 line-clamp-2">
                Design, develop, and deploy full-stack applications with integrated AI capabilities.
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span class="text-gray-300 ml-1">4.8</span>
                  </div>
                  <span class="mx-2 text-gray-500">•</span>
                  <span class="text-gray-400">4,890 students</span>
                </div>
                <span class="font-medium text-white">$99</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <button class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg">
            View All Courses
          </button>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="max-w-4xl mx-auto relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
        <p class="text-xl text-gray-300 mb-8">
          Join our community of learners today and start your journey toward mastering AI and technology.
        </p>
        <form class="max-w-md mx-auto">
          <div class="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button class="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-all">
              Join Waitlist
            </button>
          </div>
          <p class="text-gray-500 text-sm mt-3">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="font-bold text-xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              AI Learning Academy
            </h3>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Courses</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Contact</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-500 text-sm">
          © 2025 AI Learning Academy. Created by you and your sister.
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.text-gradient {
  @apply bg-clip-text text-transparent;
}
</style>
