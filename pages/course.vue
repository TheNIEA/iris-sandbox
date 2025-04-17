<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div class="lg:col-span-6 z-10">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              NIEA Learning Ecosystem
            </h1>
            <p class="text-xl md:text-2xl mb-8 text-gray-300">
              A decentralized learning community integrated with the ecosystem economy. Learn, contribute, and earn.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg">
                Join Ecosystem
              </button>
              <button class="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all">
                Browse Learning Paths
              </button>
            </div>
          </div>
          <div class="mt-12 lg:mt-0 lg:col-span-6 relative">
            <div class="bg-indigo-900/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-indigo-500/20">
              <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                <div class="relative w-full h-full flex items-center justify-center">
                  <!-- Interactive visualization of interconnected learning elements -->
                  <div class="absolute w-40 h-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <!-- Central node -->
                    <div class="absolute w-16 h-16 rounded-full bg-indigo-600/80 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-sm font-medium border border-indigo-400/30 animate-pulse-slow z-20">
                      Your Learning
                    </div>
                    
                    <!-- Orbiting nodes -->
                    <div class="absolute w-12 h-12 rounded-full bg-cyan-600/70 top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-xs border border-cyan-400/30 z-10">Skills</div>
                    <div class="absolute w-12 h-12 rounded-full bg-purple-600/70 top-1/2 left-0 transform -translate-y-1/2 flex items-center justify-center text-xs border border-purple-400/30 z-10">Projects</div>
                    <div class="absolute w-12 h-12 rounded-full bg-blue-600/70 top-1/2 right-0 transform -translate-y-1/2 flex items-center justify-center text-xs border border-blue-400/30 z-10">Community</div>
                    <div class="absolute w-12 h-12 rounded-full bg-emerald-600/70 bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center text-xs border border-emerald-400/30 z-10">Earnings</div>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 grid grid-cols-3 gap-3">
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">50+</div>
                  <div class="text-sm text-gray-400">Learning Paths</div>
                </div>
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">2.4K</div>
                  <div class="text-sm text-gray-400">Learners</div>
                </div>
                <div class="bg-gray-800/60 rounded-lg p-3 text-center">
                  <div class="font-bold text-cyan-400">12.5K</div>
                  <div class="text-sm text-gray-400">EC Earned</div>
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

    <!-- Ecosystem Integration Banner -->
    <section class="py-10 px-4 sm:px-6 lg:px-8 mb-6">
      <div class="max-w-7xl mx-auto bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 relative overflow-hidden">
        <div class="absolute inset-0 bg-grid-white/5 bg-[length:16px_16px]"></div>
        <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="md:w-2/3">
            <h2 class="text-2xl font-bold mb-2">Learning-to-Earning Pipeline</h2>
            <p class="text-gray-300">
              Everything you learn directly contributes to ecosystem value. Complete courses, work on real projects, and earn Envalumental Coin (EC) through your contributions to the network.
            </p>
          </div>
          <div class="md:w-1/3 flex justify-center">
            <div class="bg-indigo-900/40 p-4 rounded-lg border border-indigo-500/30 flex items-center space-x-4">
              <div class="text-center">
                <div class="text-indigo-400 text-sm mb-1">My Balance</div>
                <div class="text-2xl font-bold">245 EC</div>
              </div>
              <div class="h-10 w-px bg-indigo-500/30"></div>
              <div class="text-center">
                <div class="text-indigo-400 text-sm mb-1">Earn Rate</div>
                <div class="text-2xl font-bold">12 EC<span class="text-xs text-indigo-300">/week</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Paths Section -->
    <section class="py-10 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-2">Curated Learning Paths</h2>
        <p class="text-gray-400 mb-8 max-w-3xl">
          Each path combines foundational knowledge with practical projects and community validation to ensure you're building verifiable skills.
        </p>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Path 1 -->
          <div class="bg-gradient-to-br from-indigo-900/40 to-indigo-800/40 rounded-xl p-6 border border-indigo-700/30 hover:border-indigo-500/50 transition-all group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            
            <div class="flex justify-between items-start mb-4">
              <div class="text-indigo-400 group-hover:text-indigo-300 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex space-x-1">
                <div class="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full border border-indigo-500/20">Level 3</div>
                <div class="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/20">High Demand</div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-1">AI Systems Architecture</h3>
            <p class="text-sm text-indigo-200 mb-2">15-20 hrs • Earn up to 85 EC</p>
            
            <p class="text-gray-400 mb-4">
              Learn to design and implement scalable AI systems that integrate with existing infrastructures to solve real-world problems.
            </p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-indigo-600 border-2 border-indigo-900 flex items-center justify-center text-xs">JD</div>
                <div class="w-6 h-6 rounded-full bg-purple-600 border-2 border-indigo-900 flex items-center justify-center text-xs">KL</div>
                <div class="w-6 h-6 rounded-full bg-blue-600 border-2 border-indigo-900 flex items-center justify-center text-xs">TM</div>
                <div class="w-6 h-6 rounded-full bg-gray-700 border-2 border-indigo-900 flex items-center justify-center text-xs">+12</div>
              </div>
              <div class="text-xs text-gray-400">425 enrolled</div>
            </div>
            
            <div class="relative pt-2">
              <div class="overflow-hidden h-2 text-xs flex rounded-full bg-indigo-900/40">
                <div class="w-3/4 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>75% completion rate</span>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.8
                </div>
              </div>
            </div>
            
            <button class="mt-6 w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors">
              Start Learning Path
            </button>
          </div>
          
          <!-- Path 2 -->
          <div class="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 rounded-xl p-6 border border-cyan-700/30 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            
            <div class="flex justify-between items-start mb-4">
              <div class="text-cyan-400 group-hover:text-cyan-300 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <div class="flex space-x-1">
                <div class="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full border border-cyan-500/20">Level 2</div>
                <div class="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full border border-emerald-500/20">New</div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-1">Decentralized App Development</h3>
            <p class="text-sm text-cyan-200 mb-2">12-16 hrs • Earn up to 70 EC</p>
            
            <p class="text-gray-400 mb-4">
              Build applications that leverage blockchain and decentralized technologies to create trustless, transparent systems.
            </p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-cyan-600 border-2 border-cyan-900 flex items-center justify-center text-xs">RK</div>
                <div class="w-6 h-6 rounded-full bg-emerald-600 border-2 border-cyan-900 flex items-center justify-center text-xs">AP</div>
                <div class="w-6 h-6 rounded-full bg-teal-600 border-2 border-cyan-900 flex items-center justify-center text-xs">SJ</div>
                <div class="w-6 h-6 rounded-full bg-gray-700 border-2 border-cyan-900 flex items-center justify-center text-xs">+8</div>
              </div>
              <div class="text-xs text-gray-400">312 enrolled</div>
            </div>
            
            <div class="relative pt-2">
              <div class="overflow-hidden h-2 text-xs flex rounded-full bg-cyan-900/40">
                <div class="w-4/5 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>80% completion rate</span>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.7
                </div>
              </div>
            </div>
            
            <button class="mt-6 w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-medium transition-colors">
              Start Learning Path
            </button>
          </div>
          
          <!-- Path 3 -->
          <div class="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border border-purple-700/30 hover:border-purple-500/50 transition-all group relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full transform translate-x-8 -translate-y-8"></div>
            
            <div class="flex justify-between items-start mb-4">
              <div class="text-purple-400 group-hover:text-purple-300 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div class="flex space-x-1">
                <div class="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/20">Level 1</div>
                <div class="bg-pink-500/20 text-pink-300 text-xs px-2 py-1 rounded-full border border-pink-500/20">Popular</div>
              </div>
            </div>
            
            <h3 class="text-xl font-semibold mb-1">Human-AI Collaboration</h3>
            <p class="text-sm text-purple-200 mb-2">8-10 hrs • Earn up to 45 EC</p>
            
            <p class="text-gray-400 mb-4">
              Master techniques for effective collaboration between humans and AI systems to enhance productivity and creativity.
            </p>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex -space-x-2">
                <div class="w-6 h-6 rounded-full bg-purple-600 border-2 border-purple-900 flex items-center justify-center text-xs">MJ</div>
                <div class="w-6 h-6 rounded-full bg-pink-600 border-2 border-purple-900 flex items-center justify-center text-xs">LS</div>
                <div class="w-6 h-6 rounded-full bg-indigo-600 border-2 border-purple-900 flex items-center justify-center text-xs">BT</div>
                <div class="w-6 h-6 rounded-full bg-gray-700 border-2 border-purple-900 flex items-center justify-center text-xs">+24</div>
              </div>
              <div class="text-xs text-gray-400">640 enrolled</div>
            </div>
            
            <div class="relative pt-2">
              <div class="overflow-hidden h-2 text-xs flex rounded-full bg-purple-900/40">
                <div class="w-11/12 shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
              </div>
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>92% completion rate</span>
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  4.9
                </div>
              </div>
            </div>
            
            <button class="mt-6 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors">
              Start Learning Path
            </button>
          </div>
        </div>
        
        <div class="mt-8 text-center">
          <button class="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all hover:scale-105 shadow-lg">
            Explore All Learning Paths
          </button>
        </div>
      </div>
    </section>

    <!-- Learning + Ecosystem Integration -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col lg:flex-row gap-10">
          <!-- Left side: School Features -->
          <div class="lg:w-1/2">
            <h2 class="text-3xl font-bold mb-6">How Our Learning Ecosystem Works</h2>
            
            <div class="space-y-6">
              <!-- Feature 1 -->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600/20 text-indigo-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-white mb-1">Learn By Doing</h3>
                  <p class="text-gray-400">Courses are built around practical projects that produce real-world outputs. Your work contributes directly to ecosystem solutions.</p>
                </div>
              </div>
              
              <!-- Feature 2 -->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-cyan-600/20 text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-white mb-1">Peer Validation</h3>
                  <p class="text-gray-400">Your learning is verified through community validation, creating trust and accountability in skill acquisition.</p>
                </div>
              </div>
              
              <!-- Feature 3 -->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-emerald-600/20 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-white mb-1">Earn While You Learn</h3>
                  <p class="text-gray-400">Every completed module, project, and contribution generates Envalumental Coin (EC) rewards based on value creation.</p>
                </div>
              </div>
              
              <!-- Feature 4 -->
              <div class="flex">
                <div class="flex-shrink-0">
                  <div class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600/20 text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-semibold text-white mb-1">Direct Studio Pipeline</h3>
                  <p class="text-gray-400">Learning paths connect directly to roles in studios and collaborative projects, creating a seamless pathway to productive work.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right side: Ecosystem visualization -->
          <div class="lg:w-1/2 mt-10 lg:mt-0">
            <div class="bg-gray-800/80 rounded-xl border border-gray-700 p-6 h-full">
              <h3 class="text-xl font-semibold mb-4">Your Learning Journey</h3>
              
              <!-- Interactive journey visualization -->
              <div class="relative h-96 overflow-hidden">
                <!-- The visualization would be a network graph connecting learning with earning opportunities -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full"></div>
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500"></div>
                
                <!-- Journey Stages -->
                <div class="absolute top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg border border-indigo-500/30 p-3 w-60 shadow-lg">
                  <div class="text-sm font-medium text-indigo-400 mb-1">Stage 1: Knowledge Acquisition</div>
                  <div class="text-xs text-gray-400">Complete foundational modules in your chosen learning path</div>
                  <div class="mt-2 text-xs text-emerald-400">+15 EC earned</div>
                </div>
                
                <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg border border-cyan-500/30 p-3 w-60 shadow-lg">
                  <div class="text-sm font-medium text-cyan-400 mb-1">Stage 2: Applied Projects</div>
                  <div class="text-xs text-gray-400">Use your skills to complete real-world ecosystem projects</div>
                  <div class="mt-2 text-xs text-emerald-400">+45 EC earned</div>
                </div>
                
                <div class="absolute top-2/3 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg border border-purple-500/30 p-3 w-60 shadow-lg">
                  <div class="text-sm font-medium text-purple-400 mb-1">Stage 3: Peer Teaching</div>
                  <div class="text-xs text-gray-400">Share knowledge with others through mentorship</div>
                  <div class="mt-2 text-xs text-emerald-400">+30 EC earned</div>
                </div>
                
                <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-lg border border-emerald-500/30 p-3 w-60 shadow-lg">
                  <div class="text-sm font-medium text-emerald-400 mb-1">Stage 4: Studio Integration</div>
                  <div class="text-xs text-gray-400">Join a studio and contribute to ecosystem products</div>
                  <div class="mt-2 text-xs text-emerald-400">+120 EC / month</div>
                </div>
                
                <!-- Connection nodes -->
                <div class="absolute top-[30%] right-[30%] w-3 h-3 bg-indigo-400/50 rounded-full animate-pulse"></div>
                <div class="absolute top-[45%] left-[20%] w-2 h-2 bg-cyan-400/50 rounded-full animate-pulse"></div>
                <div class="absolute top-[60%] right-[25%] w-4 h-4 bg-purple-400/50 rounded-full animate-pulse"></div>
                <div class="absolute top-[80%] left-[30%] w-3 h-3 bg-emerald-400/50 rounded-full animate-pulse"></div>
              </div>
              
              <div class="mt-4 flex space-x-2">
                <button class="flex-1 text-sm px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                  View My Progress
                </button>
                <button class="flex-1 text-sm px-3 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors">
                  Connect to Studios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- School Educators -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-2">Meet Our Community Educators</h2>
        <p class="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
          Our educators are ecosystem participants who combine expertise with practical experience in their fields.
        </p>
        
        <div class="grid md:grid-cols-4 gap-8">
          <!-- Educator 1 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500/50 transition-all group">
            <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-indigo-900/30 to-gray-900/30 relative">
              <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://placehold.co/300/333/888?text=Educator')"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-lg font-semibold group-hover:text-indigo-400 transition-all">Dr. Maya Chen</h3>
                <p class="text-indigo-400 text-sm">AI Systems Architect</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex space-x-2 mb-3">
                <span class="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">12 Courses</span>
                <span class="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-full">4.9 Rating</span>
              </div>
              <p class="text-gray-400 text-sm mb-4">
                Former lead AI researcher who now specializes in teaching practical implementation of AI systems.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">2,405 students</span>
                <button class="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          
          <!-- Educator 2 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500/50 transition-all group">
            <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-cyan-900/30 to-gray-900/30 relative">
              <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://placehold.co/300/333/888?text=Educator')"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-lg font-semibold group-hover:text-cyan-400 transition-all">Alex Rodriguez</h3>
                <p class="text-cyan-400 text-sm">Blockchain Developer</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex space-x-2 mb-3">
                <span class="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full">8 Courses</span>
                <span class="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-full">4.7 Rating</span>
              </div>
              <p class="text-gray-400 text-sm mb-4">
                Blockchain expert focused on bridging the gap between theory and practical implementation in decentralized systems.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">1,840 students</span>
                <button class="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          
          <!-- Educator 3 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group">
            <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-purple-900/30 to-gray-900/30 relative">
              <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://placehold.co/300/333/888?text=Educator')"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-lg font-semibold group-hover:text-purple-400 transition-all">Sasha Williams</h3>
                <p class="text-purple-400 text-sm">Interface Designer</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex space-x-2 mb-3">
                <span class="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">15 Courses</span>
                <span class="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-full">4.8 Rating</span>
              </div>
              <p class="text-gray-400 text-sm mb-4">
                Designer specializing in human-AI interfaces that create intuitive and effective ways for people to work with AI systems.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">3,120 students</span>
                <button class="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
          
          <!-- Educator 4 -->
          <div class="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-emerald-500/50 transition-all group">
            <div class="aspect-w-1 aspect-h-1 bg-gradient-to-br from-emerald-900/30 to-gray-900/30 relative">
              <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('https://placehold.co/300/333/888?text=Educator')"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h3 class="text-lg font-semibold group-hover:text-emerald-400 transition-all">Jordan Taylor</h3>
                <p class="text-emerald-400 text-sm">Ecosystem Economist</p>
              </div>
            </div>
            <div class="p-4">
              <div class="flex space-x-2 mb-3">
                <span class="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-1 rounded-full">6 Courses</span>
                <span class="bg-gray-700/60 text-gray-300 text-xs px-2 py-1 rounded-full">4.9 Rating</span>
              </div>
              <p class="text-gray-400 text-sm mb-4">
                Economic theorist implementing new models for digital value exchange and alternative economics in practice.
              </p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">2,240 students</span>
                <button class="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <button class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all">
            Become an Educator
          </button>
          <p class="mt-2 text-sm text-gray-400">Earn EC rewards for sharing knowledge and guiding others</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-indigo-900/30 to-purple-900/30"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="max-w-4xl mx-auto relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Join Our Learning Ecosystem</h2>
        <p class="text-xl text-gray-300 mb-8">
          Learn skills that have real economic value, contribute to digital ecosystem projects, and earn rewards for your verified contributions.
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <button class="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg">
            Enroll Now
          </button>
          <button class="px-8 py-4 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all">
            Browse Learning Paths
          </button>
        </div>
        <div class="mt-8 flex items-center justify-center">
          <div class="flex -space-x-3">
            <div class="w-10 h-10 rounded-full bg-indigo-600 border-2 border-gray-900"></div>
            <div class="w-10 h-10 rounded-full bg-cyan-600 border-2 border-gray-900"></div>
            <div class="w-10 h-10 rounded-full bg-purple-600 border-2 border-gray-900"></div>
            <div class="w-10 h-10 rounded-full bg-emerald-600 border-2 border-gray-900"></div>
            <div class="w-10 h-10 rounded-full bg-gray-700 border-2 border-gray-900 flex items-center justify-center font-medium text-sm">+2.4K</div>
          </div>
          <div class="ml-4 text-gray-300">Learners already joined</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <h3 class="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">
              NIEA Learning Ecosystem
            </h3>
          </div>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Learning Paths</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Studios</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Ecosystem</a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
        <div class="mt-8 text-center text-gray-500 text-sm">
          © 2025 Network for Integrated Ecosystem Advancement (NIEA). Empowering human potential through connected learning.
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// No additional logic required at this time - enhanced functionality would be added as needed
</script>

<style scoped>
.text-gradient {
  @apply bg-clip-text text-transparent;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

.bg-grid-white\/5 {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255 255 255 / 0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
</style>
