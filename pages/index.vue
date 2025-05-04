<template>
  <div class="relative min-h-screen w-full bg-gray-950 text-white overflow-x-hidden">
    <canvas id="background-canvas" class="absolute inset-0 -z-10"></canvas>
    
    <!-- Header -->
    <header class="relative z-10 py-6">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <img src="https://s3.us-east-2.amazonaws.com/theniea.com/TheNIEA-icon.png" alt="NIEA Logo" class="h-12 w-auto mr-3" />
            <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">NIEA</span>
          </div>
          
          <!-- Add signup link with + circle -->
          <NuxtLink to="/signup" class="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/20 transition-all transform hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </NuxtLink>
          
          <nav class="hidden md:flex space-x-8">
            <a href="#about" class="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#components" class="text-gray-300 hover:text-white transition-colors">Components</a>
            <a href="#how-it-works" class="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#impact" class="text-gray-300 hover:text-white transition-colors">Impact</a>
            <a href="#get-involved" class="text-gray-300 hover:text-white transition-colors">Get Involved</a>
          </nav>
          <div class="md:hidden">
            <button class="text-gray-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- + Circle Link to Signup -->
    <NuxtLink to="/signup" class="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </NuxtLink>

    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div class="lg:col-span-6 mb-12 lg:mb-0">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              <span class="block">Revolutionizing How We Value</span>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Human Contribution</span>
            </h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl">
              The National Information Exchange Agency (NIEA) is fostering a new era of knowledge sharing and economic empowerment, addressing inequality and unlocking humanity's collective potential.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <a href="#about" class="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg inline-block text-center">
                Discover More
              </a>
              <NuxtLink to="/community" class="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium transition-all border border-gray-700 inline-block text-center">
                Join Community
              </NuxtLink>
            </div>
          </div>
          <div class="lg:col-span-6 relative">
            <div class="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-sm border border-blue-500/20">
              <!-- This is where an interactive visualization would go -->
              <div class="absolute inset-0 flex items-center justify-center">
                <img src="https://s3.us-east-2.amazonaws.com/theniea.com/TheNIEA-icon.png" alt="NIEA Logo" class="h-32 w-auto animate-float opacity-60" />
              </div>
              
              <!-- Decorative elements -->
              <div class="absolute top-10 left-10 w-20 h-20 bg-blue-500/20 rounded-full filter blur-xl"></div>
              <div class="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/20 rounded-full filter blur-xl"></div>
              
              <!-- Connection lines animation would go here -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-full h-full absolute">
                  <!-- This div would contain canvas or SVG elements for data visualization -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Decorative background elements -->
      <div class="absolute top-1/3 right-0 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-950/80 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">About NIEA</h2>
          <div class="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <p class="text-xl leading-relaxed text-gray-300 mb-8">
            At a fork in the road, faced with the opportunity to integrate massive innovations in technology or address the many pressing challenges of society, The National Information Exchange Agency demands a dynamic solution. By creating a framework that transcends preconceived limits, we start our work by activating an untapped level of human potential – recognizing and rewarding societal contributions.
          </p>
          <p class="text-xl leading-relaxed text-gray-300">
            Our vision is to build a future where every human interaction, every piece of knowledge shared, every moment of connection, has real value; fostering a society that thrives on collaboration, trust, and shared progress.
          </p>
        </div>
      </div>
    </section>

    <!-- Components Section -->
    <section id="components" class="py-20 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Our Components</h2>
          <div class="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Component 1 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all transform hover:scale-[1.02] group">
            <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-blue-400 transition-all">Knowledge Exchange Platform (KEP)</h3>
            <p class="text-gray-400">
              A secure hub for sharing, validating, and transforming vast amounts of anonymously shared information into valuable, actionable knowledge. KEP enables private contributions while ensuring transparency.
            </p>
          </div>
          
          <!-- Component 2 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all transform hover:scale-[1.02] group">
            <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-blue-400 transition-all">Bank of Human History and Interaction (BHHI)</h3>
            <p class="text-gray-400">
              A dynamic database capturing human contributions, growing in value with each verified interaction to power Envalumental Coin (EC).
            </p>
          </div>
          
          <!-- Component 3 -->
          <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all transform hover:scale-[1.02] group">
            <div class="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-blue-300 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3 group-hover:text-blue-400 transition-all">Universal Basic Income (UBI)</h3>
            <p class="text-gray-400">
              A revolutionary system that distributes accumulated wealth tied to BHHI's growth, combating economic disparity and rewarding individual contributions.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute top-1/2 right-0 w-72 h-72 bg-blue-500/5 rounded-full filter blur-3xl -translate-y-1/2"></div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="py-20 bg-gray-950/80 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">How It Works</h2>
          <div class="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
        </div>
        
        <div class="relative">
          <!-- Vertical line for timeline -->
          <div class="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 transform -translate-x-1/2"></div>
          
          <!-- Step 1 -->
          <div class="relative grid md:grid-cols-2 gap-8 mb-12">
            <div class="md:text-right md:pr-12">
              <div class="hidden md:flex absolute top-0 right-0 transform translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full items-center justify-center font-bold text-xl z-10">
                1
              </div>
              <h3 class="text-2xl font-bold mb-3">Share Information</h3>
              <p class="text-gray-400">
                Contribute knowledge, anonymously share news, and conduct research via the Knowledge Exchange Platform (KEP)
              </p>
            </div>
            <div class="md:hidden flex items-center mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                1
              </div>
              <h3 class="text-xl font-bold">Share Information</h3>
            </div>
            <div class="md:pl-12">
              <!-- Mobile image would go here -->
            </div>
          </div>
          
          <!-- Step 2 -->
          <div class="relative grid md:grid-cols-2 gap-8 mb-12">
            <div class="md:order-2 md:text-left md:pl-12">
              <div class="hidden md:flex absolute top-0 left-0 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full items-center justify-center font-bold text-xl z-10">
                2
              </div>
              <h3 class="text-2xl font-bold mb-3">Verify Contributions</h3>
              <p class="text-gray-400">
                Information is diversely validated through community checks, machine learning, and a novel pay-to-verify system
              </p>
            </div>
            <div class="md:hidden flex items-center mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                2
              </div>
              <h3 class="text-xl font-bold">Verify Contributions</h3>
            </div>
            <div class="md:order-1 md:pr-12">
              <!-- Mobile image would go here -->
            </div>
          </div>
          
          <!-- Step 3 -->
          <div class="relative grid md:grid-cols-2 gap-8 mb-12">
            <div class="md:text-right md:pr-12">
              <div class="hidden md:flex absolute top-0 right-0 transform translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full items-center justify-center font-bold text-xl z-10">
                3
              </div>
              <h3 class="text-2xl font-bold mb-3">Enrich BHHI</h3>
              <p class="text-gray-400">
                Every verified contribution enhances the stored value of The Bank of Human History and Interaction
              </p>
            </div>
            <div class="md:hidden flex items-center mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                3
              </div>
              <h3 class="text-xl font-bold">Enrich BHHI</h3>
            </div>
            <div class="md:pl-12">
              <!-- Mobile image would go here -->
            </div>
          </div>
          
          <!-- Step 4 -->
          <div class="relative grid md:grid-cols-2 gap-8 mb-12">
            <div class="md:order-2 md:text-left md:pl-12">
              <div class="hidden md:flex absolute top-0 left-0 transform -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full items-center justify-center font-bold text-xl z-10">
                4
              </div>
              <h3 class="text-2xl font-bold mb-3">Boost Envalumental Wealth</h3>
              <p class="text-gray-400">
                As BHHI's database increases, the value of the Envalumental Coin (EC) grows, empowering citizens to further develop their skills and education
              </p>
            </div>
            <div class="md:hidden flex items-center mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                4
              </div>
              <h3 class="text-xl font-bold">Boost Envalumental Wealth</h3>
            </div>
            <div class="md:order-1 md:pr-12">
              <!-- Mobile image would go here -->
            </div>
          </div>
          
          <!-- Step 5 -->
          <div class="relative grid md:grid-cols-2 gap-8">
            <div class="md:text-right md:pr-12">
              <div class="hidden md:flex absolute top-0 right-0 transform translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full items-center justify-center font-bold text-xl z-10">
                5
              </div>
              <h3 class="text-2xl font-bold mb-3">Collect and Distribute UBI</h3>
              <p class="text-gray-400">
                EC is distributed biweekly, rewarding the most engaged contributors with incentives for individual multipliers
              </p>
            </div>
            <div class="md:hidden flex items-center mb-4">
              <div class="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                5
              </div>
              <h3 class="text-xl font-bold">Collect and Distribute UBI</h3>
            </div>
            <div class="md:pl-12">
              <!-- Mobile image would go here -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section id="impact" class="py-20 relative">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">Societal Impact</h2>
          <div class="h-1 w-20 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Impact 1 -->
          <div class="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all text-center">
            <div class="text-4xl mb-4">🌍</div>
            <p class="text-gray-300">
              We will work to see a bold decrease in economic disparity. Using our unique model for UBI, The NIEA wants to enable a <span class="text-blue-400 font-bold">50% reduction in absolute poverty</span> by the year 2035.
            </p>
          </div>
          
          <!-- Impact 2 -->
          <div class="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all text-center">
            <div class="text-4xl mb-4">🤝</div>
            <p class="text-gray-300">
              Through implementing social value incentives, we're creating and empowering the increase of local participation. To produce an <span class="text-blue-400 font-bold">80% engagement rate</span> within all associated communities, we have standardized our method for unlocking human potential.
            </p>
          </div>
          
          <!-- Impact 3 -->
          <div class="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all text-center">
            <div class="text-4xl mb-4">📚</div>
            <p class="text-gray-300">
              For us to capture the next 100 years of individual and collective evolution and become one of the most comprehensive databases of all human history and interaction, we must advocate to recognize <span class="text-blue-400 font-bold">Envalumental Wealth</span> as the new indication of societal progress.
            </p>
          </div>
          
          <!-- Impact 4 -->
          <div class="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-blue-500/30 transition-all text-center">
            <div class="text-4xl mb-4">🌟</div>
            <p class="text-gray-300">
              To see substantial growth and development within our nation, The NIEA is planning to onboard <span class="text-blue-400 font-bold">1 Billion people</span> by the year 2035.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Decorative elements -->
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
    </section>

    <!-- Get Involved Section -->
    <section id="get-involved" class="py-20 bg-gray-950/80 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-cyan-900/20"></div>
      <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-2xl mx-auto text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">Get Involved</h2>
          <p class="text-xl text-gray-300 mb-10">
            There is a future where doing good and doing well become mutually aligned. Join our mission to reimagine how society organizes itself to recognize, reward, and amplify collective potential.
          </p>
          
          <form class="max-w-md mx-auto">
            <div class="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-all">
                Subscribe
              </button>
            </div>
          </form>
          
          <p class="mt-6 text-gray-400">
            Contact us at <a href="mailto:thenieaorg@gmail.com" class="text-blue-400 hover:underline">thenieaorg@gmail.com</a>
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <img src="https://s3.us-east-2.amazonaws.com/theniea.com/TheNIEA-icon.png" alt="NIEA Logo" class="h-8 w-auto mr-2" />
            <span class="text-gray-300">© 2025 National Information Exchange Agency. All rights reserved.</span>
          </div>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  const { initThreeJS } = await import('~/assets/script.js')
  initThreeJS()
})
</script>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
