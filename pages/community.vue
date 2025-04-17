<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <CommunitySidebar />
    <div class="ml-80 p-6">
      <div class="mb-8">
        <Title tag="h1" class="mb-2">Ecosystems Marketplace</Title>
        <p class="text-gray-400 text-lg">Discover, measure, and participate in digital micro-economies.</p>
      </div>

      <!-- Featured Ecosystem with Network Worth Visualization -->
      <section class="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-lg rounded-xl shadow-lg border border-blue-900/30 p-6 mb-8">
        <div class="flex flex-col lg:flex-row">
          <!-- Ecosystem Info -->
          <div class="lg:w-1/2 mb-6 lg:mb-0 lg:pr-8">
            <div class="flex items-center mb-4">
              <span class="w-3 h-3 bg-blue-400 rounded-full mr-2"></span>
              <Title tag="h2">AI Innovators Ecosystem</Title>
              <span class="ml-3 px-2 py-0.5 bg-blue-500/20 rounded-full text-blue-300 text-xs border border-blue-500/30">Featured</span>
            </div>
            
            <p class="text-gray-300 mb-6">
              A thriving community of AI researchers, engineers, and entrepreneurs building the next generation of intelligent systems. This ecosystem has generated significant network value through collaborative projects and innovative ventures.
            </p>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div class="bg-gray-800/70 rounded-lg p-4">
                <p class="text-gray-400 text-sm">Network Worth</p>
                <p class="font-semibold text-2xl bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">$3.8M</p>
              </div>
              <div class="bg-gray-800/70 rounded-lg p-4">
                <p class="text-gray-400 text-sm">Daily Circulation</p>
                <p class="font-semibold text-2xl text-blue-400">$42K</p>
              </div>
              <div class="bg-gray-800/70 rounded-lg p-4">
                <p class="text-gray-400 text-sm">Participants</p>
                <p class="font-semibold text-2xl text-cyan-400">2.3K</p>
              </div>
              <div class="bg-gray-800/70 rounded-lg p-4">
                <p class="text-gray-400 text-sm">Open Positions</p>
                <p class="font-semibold text-2xl text-emerald-400">24</p>
              </div>
            </div>
            
            <div class="flex space-x-4">
              <Button class="px-6">Join Ecosystem</Button>
              <Button class="px-6 bg-gray-800 hover:bg-gray-700">View Details</Button>
            </div>
          </div>
          
          <!-- Network Worth Visualization -->
          <div class="lg:w-1/2 bg-gray-800/60 rounded-xl overflow-hidden border border-gray-700 p-4 flex flex-col">
            <h3 class="text-lg font-medium mb-2">Network Worth Growth</h3>
            <div class="text-xs text-gray-400 mb-4">Visualization of value creation and circulation</div>
            
            <!-- Placeholder for visualization - would be replaced with actual chart -->
            <div class="flex-1 min-h-[250px] relative">
              <!-- SVG Visualization Placeholder -->
              <svg class="w-full h-full" viewBox="0 0 400 200">
                <!-- Network Growth Line -->
                <path d="M20,180 C40,120 80,140 120,100 C160,60 200,80 240,50 C280,30 320,40 380,20" 
                      stroke="url(#blueGradient)" stroke-width="3" fill="none" />
                
                <!-- Area under the line -->
                <path d="M20,180 C40,120 80,140 120,100 C160,60 200,80 240,50 C280,30 320,40 380,20 L380,180 L20,180 Z" 
                      fill="url(#areaGradient)" opacity="0.3" />
                
                <!-- Markers for significant events -->
                <circle cx="120" cy="100" r="4" fill="#3B82F6" />
                <circle cx="240" cy="50" r="4" fill="#3B82F6" />
                <circle cx="320" cy="40" r="4" fill="#3B82F6" />
                
                <!-- Gradient definitions -->
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#60A5FA" />
                    <stop offset="100%" stop-color="#2DD4BF" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.5" />
                    <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.05" />
                  </linearGradient>
                </defs>
              </svg>
              
              <!-- Circulation nodes (animated in real implementation) -->
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                <div class="absolute top-[30%] left-[20%] w-4 h-4 bg-blue-500/30 rounded-full border border-blue-500 pulse"></div>
                <div class="absolute top-[60%] left-[45%] w-3 h-3 bg-cyan-500/30 rounded-full border border-cyan-500 pulse-delay"></div>
                <div class="absolute top-[40%] left-[70%] w-5 h-5 bg-emerald-500/30 rounded-full border border-emerald-500 pulse"></div>
                <div class="absolute top-[75%] left-[85%] w-3 h-3 bg-blue-500/30 rounded-full border border-blue-500 pulse-delay"></div>
              </div>
            </div>
            
            <div class="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div class="text-center px-2 py-1 rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20">Value Creation</div>
              <div class="text-center px-2 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">Circulation</div>
              <div class="text-center px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">UBI Distribution</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Ecosystem Analytics -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <Title tag="h2">Ecosystem Analytics</Title>
          <div class="flex items-center space-x-2 text-sm">
            <span class="text-gray-400">Time Period:</span>
            <select class="bg-gray-800 text-gray-300 rounded border border-gray-700 px-3 py-1">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
        
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Total Network Value Card -->
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-5 relative overflow-hidden">
            <div class="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            
            <h3 class="text-gray-400 mb-1 text-sm">Total Network Value</h3>
            <div class="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">$47.6M</div>
            
            <div class="flex items-center">
              <span class="text-emerald-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                +8.2%
              </span>
              <span class="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
          
          <!-- Daily Deal Flow Card -->
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-5 relative overflow-hidden">
            <div class="absolute right-0 top-0 w-24 h-24 bg-cyan-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            
            <h3 class="text-gray-400 mb-1 text-sm">Daily Deal Flow</h3>
            <div class="text-2xl font-bold mb-2 text-cyan-400">831</div>
            
            <div class="flex items-center">
              <span class="text-emerald-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                +12.5%
              </span>
              <span class="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
          
          <!-- UBI Distribution Card -->
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-5 relative overflow-hidden">
            <div class="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            
            <h3 class="text-gray-400 mb-1 text-sm">UBI Distribution</h3>
            <div class="text-2xl font-bold mb-2 text-emerald-400">$367K</div>
            
            <div class="flex items-center">
              <span class="text-emerald-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                +5.7%
              </span>
              <span class="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
          
          <!-- Active Participants Card -->
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-5 relative overflow-hidden">
            <div class="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
            
            <h3 class="text-gray-400 mb-1 text-sm">Active Participants</h3>
            <div class="text-2xl font-bold mb-2 text-purple-400">24.7K</div>
            
            <div class="flex items-center">
              <span class="text-emerald-400 text-sm flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                </svg>
                +3.2%
              </span>
              <span class="text-xs text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Your Ecosystem Profile -->
      <section class="mb-8">
        <Title tag="h2" class="mb-4">Your Ecosystem Profile</Title>
        <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Profile Stats -->
            <div class="lg:w-1/2">
              <div class="flex items-center mb-6">
                <div class="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
                  AM
                </div>
                <div class="ml-4">
                  <h3 class="text-xl font-semibold">Alex Mayo</h3>
                  <div class="flex items-center">
                    <span class="text-gray-400 text-sm">Ecosystem Participant • </span>
                    <span class="text-blue-400 text-sm ml-1">Workflow Contributor</span>
                  </div>
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-800/80 p-4 rounded-lg">
                  <p class="text-gray-400 mb-1">Envalumental Coin Balance</p>
                  <p class="font-semibold text-2xl bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">1,427 EC</p>
                  <p class="text-xs text-blue-400">≈ $285.40</p>
                </div>
                <div class="bg-gray-800/80 p-4 rounded-lg">
                  <p class="text-gray-400 mb-1">XP Accrued</p>
                  <p class="font-semibold text-2xl text-purple-400">4,812</p>
                  <p class="text-xs text-gray-500">Level 4 Contributor</p>
                </div>
                <div class="bg-gray-800/80 p-4 rounded-lg">
                  <p class="text-gray-400 mb-1">Workflow Inputs</p>
                  <p class="font-semibold text-2xl text-emerald-400">87</p>
                  <p class="text-xs text-gray-500">Last 30 days</p>
                </div>
                <div class="bg-gray-800/80 p-4 rounded-lg">
                  <p class="text-gray-400 mb-1">Network Multiplier</p>
                  <p class="font-semibold text-2xl text-amber-400">1.4x</p>
                  <p class="text-xs text-gray-500">+0.1x this month</p>
                </div>
              </div>
              
              <Button class="w-full">View Complete Profile</Button>
            </div>
            
            <!-- UBI Earnings Chart -->
            <div class="lg:w-1/2 bg-gray-800/80 p-4 rounded-xl border border-gray-700/50">
              <h3 class="text-lg font-medium mb-1">UBI Earnings</h3>
              <p class="text-sm text-gray-400 mb-4">Based on your ecosystem contributions</p>
              
              <!-- Simple bar chart representation -->
              <div class="h-56 flex items-end space-x-2 mb-2 pl-6 pr-4">
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[30%]"></div>
                  <div class="hidden group-hover:flex absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    $42.15 • Apr 1
                  </div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[45%]"></div>
                  <div class="hidden group-hover:flex absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    $63.70 • Apr 3
                  </div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[25%]"></div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[55%]"></div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[35%]"></div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-blue-500 rounded-t h-[60%]"></div>
                </div>
                <div class="flex-1 bg-blue-500/20 hover:bg-blue-500/30 transition-all rounded-t relative group">
                  <div class="absolute bottom-0 w-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-t h-[70%]"></div>
                  <div class="hidden group-hover:flex absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                    $98.55 • Today
                  </div>
                </div>
              </div>
              
              <!-- X-axis labels -->
              <div class="flex justify-between text-xs text-gray-500 px-6">
                <div>Apr 7</div>
                <div>Apr 9</div>
                <div>Apr 11</div>
                <div>Today</div>
              </div>
              
              <!-- Stats summary -->
              <div class="mt-4 grid grid-cols-3 gap-2">
                <div class="text-center">
                  <p class="text-xs text-gray-400">Weekly Average</p>
                  <p class="text-lg font-medium text-blue-400">$58.32</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-gray-400">Monthly Total</p>
                  <p class="text-lg font-medium text-cyan-400">$285.40</p>
                </div>
                <div class="text-center">
                  <p class="text-xs text-gray-400">Next Payment</p>
                  <p class="text-lg font-medium text-emerald-400">Apr 15</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Open Positions Section -->
      <section class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <Title tag="h2">Open Ecosystem Positions</Title>
          <Button class="text-xs px-4">View All Positions</Button>
        </div>
        
        <div class="grid md:grid-cols-3 gap-4">
          <!-- Position 1 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-emerald-900/30 hover:border-emerald-500/30 transition-all p-5">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="font-semibold text-lg">Data Validation Specialist</p>
                <p class="text-emerald-400 text-sm">AI Innovators Ecosystem</p>
              </div>
              <span class="px-2 py-1 bg-emerald-500/10 text-emerald-300 text-xs rounded-full border border-emerald-500/20">
                25 EC/hr
              </span>
            </div>
            
            <p class="text-gray-400 text-sm mb-4">
              Validate and categorize AI training datasets. Help build more ethical and accurate AI systems through human supervision of machine learning outputs.
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Remote</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Tier 2</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">15-20 hrs/week</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Posted 2 days ago</span>
              <Button class="text-xs px-4 py-2">Apply</Button>
            </div>
          </div>
          
          <!-- Position 2 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-blue-900/30 hover:border-blue-500/30 transition-all p-5">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="font-semibold text-lg">Content Reviewer</p>
                <p class="text-blue-400 text-sm">Media Production Ecosystem</p>
              </div>
              <span class="px-2 py-1 bg-blue-500/10 text-blue-300 text-xs rounded-full border border-blue-500/20">
                20 EC/hr
              </span>
            </div>
            
            <p class="text-gray-400 text-sm mb-4">
              Review and approve content submissions for the Media Production ecosystem. Ensure quality standards and community guidelines are followed.
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Flexible</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Tier 1</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">10-15 hrs/week</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Posted 5 days ago</span>
              <Button class="text-xs px-4 py-2">Apply</Button>
            </div>
          </div>
          
          <!-- Position 3 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-purple-900/30 hover:border-purple-500/30 transition-all p-5">
            <div class="flex items-start justify-between mb-4">
              <div>
                <p class="font-semibold text-lg">Transaction Validator</p>
                <p class="text-purple-400 text-sm">DeFi Alliance Ecosystem</p>
              </div>
              <span class="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20">
                30 EC/hr
              </span>
            </div>
            
            <p class="text-gray-400 text-sm mb-4">
              Validate blockchain transactions and help maintain the integrity of the DeFi ecosystem. Experience with smart contracts and blockchain technologies required.
            </p>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Global</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">Tier 3</span>
              <span class="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">10-30 hrs/week</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Posted 1 day ago</span>
              <Button class="text-xs px-4 py-2">Apply</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- Human Input Nodes Section -->
      <section class="mb-12">
        <Title tag="h2" class="mb-4">Human Input Nodes (HINs)</Title>
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
          <p class="text-gray-300 mb-6">
            Human Input Nodes are key interaction points where your contributions directly enhance ecosystem value. Each validated human action feeds into the Bank of Human History and Interaction (BHHI), generating Envalumental Coin rewards.
          </p>
          
          <div class="grid md:grid-cols-3 gap-6">
            <!-- HIN Card 1 -->
            <div class="bg-gray-800/80 rounded-lg p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 class="font-medium">Tier 1: Verification</h3>
              </div>
              
              <ul class="space-y-3 mb-4">
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Review AI outputs for accuracy
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Vote on community decisions
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                  Flag inappropriate content
                </li>
              </ul>
              
              <div class="flex items-center justify-between">
                <span class="text-xs text-blue-300">1-5 EC per action</span>
                <span class="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">Low effort</span>
              </div>
            </div>
            
            <!-- HIN Card 2 -->
            <div class="bg-gray-800/80 rounded-lg p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 class="font-medium">Tier 2: Creation</h3>
              </div>
              
              <ul class="space-y-3 mb-4">
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                  Edit and enhance content
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                  Provide detailed feedback
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                  Categorize & organize data
                </li>
              </ul>
              
              <div class="flex items-center justify-between">
                <span class="text-xs text-purple-300">5-15 EC per action</span>
                <span class="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Medium effort</span>
              </div>
            </div>
            
            <!-- HIN Card 3 -->
            <div class="bg-gray-800/80 rounded-lg p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
                <h3 class="font-medium">Tier 3: Innovation</h3>
              </div>
              
              <ul class="space-y-3 mb-4">
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                  Create original content
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                  Develop new approaches
                </li>
                <li class="flex items-center text-sm text-gray-400">
                  <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                  Train & validate AI models
                </li>
              </ul>
              
              <div class="flex items-center justify-between">
                <span class="text-xs text-emerald-300">15-50 EC per action</span>
                <span class="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">High effort</span>
              </div>
            </div>
          </div>
          
          <div class="mt-6 flex justify-center">
            <Button class="px-8">Access Available Tasks</Button>
          </div>
        </div>
      </section>

      <!-- Footer Philosophy -->
      <footer class="text-center text-sm text-gray-500 mt-12 pb-8">
        <div class="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2 font-medium">
          Human Input as Value • Network = NetWorth • Ecosystems as Economy
        </div>
        <p>The NIEA Ecosystems Initiative © 2025 - Building a Human Input-Based Economy (HIBE)</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import CommunitySidebar from '~/components/CommunitySidebar.vue'
// No additional logic required at this time - enhanced functionality would be added as needed
</script>

<style scoped>
/* Pulse animation for network nodes */
.pulse {
  animation: pulse 2s infinite;
}

.pulse-delay {
  animation: pulse 2s infinite 0.5s;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}
</style>
