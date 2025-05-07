<template>
    <div class="user-profile-panel w-full max-w-md mx-auto rounded-xl overflow-hidden">
      <!-- Show Skills Assessment Panel when showAssessmentPanel is true -->
      <SkillsAssessmentPanel 
        v-if="showAssessmentPanel"
        :initial-skill-id="currentSkillId"
        @back="showAssessmentPanel = false"
      />

      <!-- Show TicketQueue Panel when profile tab is active -->
      <TicketQueuePanel
        v-else-if="showTicketQueue"
        @back="handleTicketQueueBack"
      />
      
      <!-- Show Global View when globalViewActive is true -->
      <GlobalView
        v-else-if="globalViewActive"
        @view-profile="viewGlobeProfile"
        @back="toggleGlobalView(false)"
      />
      
      <!-- Background gradient without wireframe globe overlay -->
      <div v-else class="relative bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 p-6 pt-10 overflow-hidden">
        
        <!-- View Toggle Control positioned at top left corner - Updated with globe icon -->
        <div v-if="activeTab === 'dashboard'" class="absolute top-3 left-3 z-20">
          <button 
            @click="toggleGlobalView()"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/70 backdrop-blur-sm hover:bg-gray-800/70 transition-colors duration-300"
            :title="globalViewActive ? 'Switch to Static View' : 'Switch to Globe View'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-colors duration-300" 
                 :class="globalViewActive ? 'text-white' : 'text-gray-500'"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Profile Header -->
        <div class="flex flex-col items-center mb-6 relative z-10">
          <div class="relative w-24 h-24 mb-4">
            <div class="absolute inset-0 rounded-full bg-blue-500/20 blur-md"></div>
            <img 
              :src="props.profileImage" 
              alt="User Profile" 
              class="w-24 h-24 rounded-full object-cover border-2 border-blue-400 relative z-10"
            />
          </div>
          <h1 class="text-white text-2xl font-bold">{{ props.userName }}</h1>
        </div>
        
        <!-- Rating Indicator with Free-flowing Animation Background -->
        <div class="flex flex-col items-center mb-4 relative z-10">
          <!-- Container for the value display with free-flowing animations -->
          <div class="relative w-full h-40">
            <!-- Animated background elements that flow freely -->
            <div class="absolute inset-0 overflow-hidden">
              <!-- Subtle glowing particles -->
              <div v-for="i in 12" :key="i" class="absolute rounded-full opacity-50"
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
              <div class="stars-container absolute inset-0 pointer-events-none">
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
                  <span class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400 drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]">
                    ${{ formatNumber(props.wealthAmount) }}
                  </span>
                  <div class="flex items-center mt-1">
                    <span class="text-xs text-blue-300">In Envalument (USD)</span>
                    <button @click="showEnvalumentInfo = true" class="ml-1 text-blue-300 hover:text-blue-200 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Draggable Tab (Positioned fixed on the screen instead of relative to content) -->
        <div
          ref="dragContainer"
          v-if="activeTab === 'dashboard'"
          class="fixed top-1/4 right-2 transform -translate-y-1/2 z-30 cursor-grab active:cursor-grabbing"
          :class="{ 'transition-transform duration-300 ease-out': !isDragging }"
          :style="{ transform: `translateX(calc(100% - 30px + ${dragPosition}px))` }"
          @mousedown="startDrag"
          @touchstart.prevent="startDrag"
        >
          <!-- The Rounded Rectangle Tab -->
          <div class="flex items-center h-16 w-64 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-l-xl shadow-lg pl-3 pr-4">
            <!-- Grip area / Icon -->
            <div class="flex items-center justify-center h-full w-8 mr-1 text-white/70 flex-shrink-0">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
               </svg>
            </div>
            <!-- Text -->
            <span class="text-white font-medium whitespace-nowrap text-sm overflow-hidden">
              Start Your Profile
            </span>
          </div>
        </div>

        <!-- Envalument Info Popup -->
        <div v-if="showEnvalumentInfo" class="fixed inset-0 flex items-center justify-center z-50" @click.self="showEnvalumentInfo = false">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
          <div class="relative z-10 bg-gradient-to-b from-gray-900 to-blue-950 p-6 rounded-xl max-w-sm mx-4 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-bold text-blue-300">About Envalument</h3>
              <button @click="showEnvalumentInfo = false" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div class="mt-4 text-sm text-gray-300 space-y-3">
              <p>
                <span class="font-medium text-blue-300">Envalument</span> is the stored potential value of an individual's contributions to society—such as knowledge sharing, community service, innovation, caregiving, and other socially beneficial actions. Envalument is earned through the recording, verification, and storage of these interactions, which are transformed into measurable and transferable economic value. This value is rewarded using a decentralized digital currency system, enabling individuals to build envalumental wealth through the use of social value incentives.
                Unlike traditional labor economics, which places value on productivity alone, the National Information Exchange Agency (NIEA) empowers businesses, organizations, and local governments to implement systems that reward personal growth, societal impact, and collective improvement.
              </p>
              <p>
                This platform uses leading currencies to represent your estimated envalumental worth based on listed skills, contributions, and community value.
              </p>
              <p>
                Your Envalument score is calculated using a proprietary algorithm that considers:
              </p>
              <ul class="list-disc pl-5 space-y-1">
                <li>Your skill assessments and proficiency levels</li>
                <li>Completed projects and their impact</li>
                <li>Community demand for your expertise</li>
                <li>Overall engagement and contribution</li>
              </ul>
              <p class="italic text-blue-300/80 text-xs mt-2">
                Note: Envalument is for informational purposes only and does not yet represent real currency or financial assets.
              </p>
            </div>
          </div>
        </div>
        
        <!-- Skills Accordion - With glass morphism -->
        <div class="mb-6">
          <div class="text-center mb-3">
            <button 
              @click="toggleSkillsAccordion" 
              class="flex items-center px-4 py-2 bg-blue-700/20 hover:bg-blue-600/30 rounded-lg text-white transition-colors border border-blue-500/30 backdrop-blur-sm mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              My Skills
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform" 
                :class="{'transform rotate-180': showSkillsAccordion}"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Skills List Accordion -->
          <div v-if="showSkillsAccordion" class="animate-slideDown space-y-3">
            <!-- Individual glass-like skill buttons -->
            <div v-for="skill in skills" :key="skill.id" class="mb-2 last:mb-0">
              <!-- Skill Header - Always visible (glass-like) -->
              <div 
                @click="toggleSkill(skill.id)" 
                class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 
                       backdrop-blur-md border"
                :class="[
                  expandedSkill === skill.id 
                    ? skill.category === 'Design' 
                      ? 'bg-blue-600/20 border-blue-500/30 shadow-glow-blue' 
                      : 'bg-purple-600/20 border-purple-500/30 shadow-glow-purple'
                    : 'bg-gray-800/30',
                  skill.category === 'Design' 
                    ? 'border-blue-500/20 hover:border-blue-500/40' 
                    : 'border-purple-500/20 hover:border-purple-500/40'
                ]"
              >
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 text-lg"
                    :class="skill.category === 'Design' 
                      ? 'bg-blue-800/30' 
                      : 'bg-purple-800/30'"
                  >
                    <span v-html="skill.icon"></span>
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ skill.name }}</div>
                    <div class="text-xs"
                      :class="skill.category === 'Design' 
                        ? 'text-blue-300' 
                        : 'text-purple-300'"
                    >{{ skill.category }}</div>
                  </div>
                </div>
                
                <div class="flex items-center">
                  <div class="text-sm font-medium mr-2"
                    :class="skill.category === 'Design' 
                      ? 'text-blue-300' 
                      : 'text-purple-300'"
                  >{{ skill.rating.toFixed(1) }}</div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 transition-transform" 
                    :class="{'transform rotate-180': expandedSkill === skill.id}" 
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <!-- Skill Details - Expanded view with accordion animation -->
              <transition name="accordion">
                <div v-if="expandedSkill === skill.id" class="mt-1 pl-14 pr-3 pb-3 overflow-hidden">
                  <!-- Value to Society -->
                  <div class="mb-3">
                    <div class="text-xs text-gray-400 mb-1">How valuable this skill is to my community:</div>
                    <div class="flex justify-between items-center">
                      <div class="flex">
                        <div v-for="i in 5" :key="i" class="w-5 h-1 rounded-full mr-1"
                          :class="[
                            i <= Math.round(skill.rating)
                              ? skill.category === 'Design' ? 'bg-blue-500' : 'bg-purple-500'
                              : 'bg-gray-700'
                          ]"
                        ></div>
                      </div>
                      <div class="text-white text-xs font-medium rounded px-2 py-0.5"
                        :class="skill.category === 'Design' 
                          ? 'bg-blue-800/40' 
                          : 'bg-purple-800/40'"
                      >
                        {{ skill.rating.toFixed(1) }}/5
                      </div>
                    </div>
                  </div>
                  
                  <!-- Skill Impact -->
                  <div class="rounded-lg bg-gray-800/20 border border-gray-700/50 p-3 backdrop-blur-sm">
                    <div class="text-xs text-gray-400 mb-1">Skill Impact:</div>
                    <p class="text-sm text-gray-300 mb-2">{{ skill.description }}</p>
                    
                    <div class="flex justify-between text-xs">
                      <div>
                        <span class="text-gray-500">Envalumental Worth: </span>
                        <span :class="skill.category === 'Design' 
                          ? 'text-blue-300' 
                          : 'text-purple-300'"
                        >${{ formatNumber(skill.contribution) }}</span>
                      </div>
                      <div>
                        <span class="text-gray-500">Demand:</span>
                        <span :class="skill.category === 'Design' 
                          ? 'text-blue-300' 
                          : 'text-purple-300'"
                        >{{ skill.marketDemand }}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Add/Assess Button -->
                  <div class="flex justify-end mt-2">
                    <button 
                      @click="assessSkill(skill)" 
                      class="flex items-center px-2 py-1 rounded text-xs text-white transition-colors border backdrop-blur-sm"
                      :class="skill.category === 'Design' 
                        ? 'bg-blue-700/40 hover:bg-blue-600/50 border-blue-500/30' 
                        : 'bg-purple-700/40 hover:bg-purple-600/50 border-purple-500/30'"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                      </svg>
                      Rate Skill
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        
        <!-- Navigation Bar -->
        <div class="flex justify-around items-center pt-4 pb-2 border-t border-blue-800/50">
          <button 
            class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
            :class="{ 'text-white font-semibold': activeTab === 'dashboard' }"
            @click="setActiveTab('dashboard')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span class="text-xs mt-1">Home</span>
          </button>
          <button 
            class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
            :class="{ 'text-white font-semibold': activeTab === 'documentation' }"
            @click="setActiveTab('documentation')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="text-xs mt-1">Records</span>
          </button>
          <button 
            class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
            :class="{ 'text-white font-semibold': activeTab === 'value' }"
            @click="setActiveTab('value')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-xs mt-1">Value</span>
          </button>
          <button 
            class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
            :class="{ 'text-white font-semibold': activeTab === 'service' }"
            @click="setActiveTab('service')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="text-xs mt-1">Service</span>
          </button>
        </div>
        
        <!-- Position Indicator for Navigation -->
        <div class="flex justify-around items-center">
          <div v-for="(tab, index) in tabs" :key="tab" 
            class="h-1 rounded-full transition-all duration-300 ease-in-out"
            :class="[
              activeTab === tab ? 'w-8 bg-gradient-to-r from-blue-400 to-purple-400' : 'w-3 bg-blue-800/50',
            ]"
          ></div>
        </div>
        
        <!-- Tab Content Panels -->
        <div class="mt-6">
          <!-- Home Tab Content - With toggle between static view and globe view -->
          <div v-if="activeTab === 'dashboard'" class="px-2 py-4">
            <!-- Tutorial for global view - only shown after first activation -->
            <div 
              v-if="showGlobalViewTutorial" 
              class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6 relative"
            >
              <button 
                @click="showGlobalViewTutorial = false"
                class="absolute top-2 right-2 text-blue-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <h4 class="text-blue-300 font-medium mb-2">Interactive Globe View</h4>
              <p class="text-sm text-gray-300">
                Explore the NIEA community through an interactive 3D globe. Each node represents a profile with different skills and contributions.
              </p>
              <ul class="text-sm text-gray-300 mt-2 space-y-1 ml-5 list-disc">
                <li>Use your mouse wheel or pinch gestures to zoom in/out</li>
                <li>Drag to rotate the globe and explore different profiles</li>
                <li>Click on a node to view profile details</li>
                <li>When zoomed in enough, you can view full profiles</li>
              </ul>
            </div>
            
            <!-- Removed welcome boxes and CTA to try profile globe -->
          </div>
          
          <!-- Documentation Tab Panel (now Records Tab) - Mixed list of assessments and completed tickets -->
          <div v-if="activeTab === 'documentation'" class="px-2 py-4">
            <h3 class="text-lg font-semibold text-blue-300 mb-4">Envalumental Records</h3>
            
            <div v-if="combinedRecords.length > 0" class="space-y-4">
              <!-- Show first two items only initially -->
              <div v-for="(record, index) in showAllRecords ? combinedRecords : combinedRecords.slice(0, 2)" :key="index" 
                class="bg-gray-900/40 p-4 rounded-lg border border-blue-800/50 backdrop-blur-sm"
                :class="{'border-l-4': record.type === 'ticket', 'border-l-blue-500': record.type === 'ticket'}"
              >
                <!-- Record Type Badge -->
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <div class="flex items-center">
                      <h4 class="font-medium text-white">{{ record.title || record.skill }}</h4>
                      <span v-if="record.type === 'ticket'" class="ml-2 text-xs px-2 py-0.5 bg-blue-500/30 rounded-full text-blue-300">Service</span>
                      <span v-else class="ml-2 text-xs px-2 py-0.5 bg-purple-500/30 rounded-full text-purple-300">Assessment</span>
                    </div>
                    <p class="text-sm text-blue-300">by {{ record.user }}</p>
                  </div>
                  <div class="bg-blue-800/50 px-2 py-1 rounded text-sm font-medium text-blue-300">
                    {{ record.type === 'ticket' ? record.status : `${record.rating}/5` }}
                  </div>
                </div>
                
                <!-- Assessment Specific Content -->
                <div v-if="record.type === 'assessment'" class="mb-2">
                  <div class="text-sm text-gray-400 mb-1">Value Assessment</div>
                  <div class="flex space-x-3 text-sm">
                    <div>
                      <span class="text-gray-500">Learn:</span>
                      <span class="text-white">${{ record.values.learn }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Experience:</span>
                      <span class="text-white">${{ record.values.apply }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Master:</span>
                      <span class="text-white">${{ record.values.master }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Ticket Specific Content -->
                <div v-if="record.type === 'ticket'" class="mb-2">
                  <div class="text-sm text-gray-400 mb-1">Ticket Details</div>
                  <div class="flex flex-wrap gap-x-3 gap-y-1 text-sm">
                    <div>
                      <span class="text-gray-500">ID:</span>
                      <span class="text-white">#{{ record.id }}</span>
                    </div>
                    <div>
                      <span class="text-gray-500">Completed:</span>
                      <span class="text-white">{{ record.completedDate }}</span>
                    </div>
                    <div v-if="record.value">
                      <span class="text-gray-500">Value Added:</span>
                      <span class="text-white">+${{ record.value }}</span>
                    </div>
                  </div>
                </div>
                
                <!-- Common Fields -->
                <p class="text-gray-300 text-sm mt-2 italic">
                  "{{ record.comment }}"
                </p>
                <div class="text-xs text-gray-400 mt-2">
                  {{ record.date }}
                </div>
              </div>
              
              <!-- View All toggle button -->
              <div v-if="combinedRecords.length > 2" class="text-center">
                <button 
                  @click="showAllRecords = !showAllRecords" 
                  class="inline-flex items-center px-4 py-2 text-sm bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-blue-300 transition-colors"
                >
                  <span>{{ showAllRecords ? 'Show Less' : 'View All Records' }}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-4 w-4 ml-1 transition-transform" 
                    :class="{'transform rotate-180': showAllRecords}"
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="w-16 h-16 mx-auto bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="text-gray-400">No records available yet</p>
              <div class="mt-4 flex justify-center space-x-4">
                <NuxtLink to="/skills" class="inline-block px-4 py-2 bg-blue-600/50 hover:bg-blue-600/70 rounded-lg text-white text-sm">
                  Request Assessment
                </NuxtLink>
                <button 
                  @click="setActiveTab('service')" 
                  class="inline-block px-4 py-2 bg-purple-600/50 hover:bg-purple-600/70 rounded-lg text-white text-sm"
                >
                  Create Service Ticket
                </button>
              </div>
            </div>
          </div>
          
          <!-- Value Tab Content -->
          <div v-if="activeTab === 'value'" class="px-2 py-4">
            <h3 class="text-lg font-semibold text-blue-300 mb-4">Khoury's Value Breakdown</h3>
            
            <div class="space-y-4">
              <!-- Wealth information card -->
              <div class="bg-gray-900/40 p-4 rounded-lg border border-blue-800/50 backdrop-blur-sm">
                <div class="flex items-center mb-3">
                  <div class="font-medium text-white mr-auto">Total Envalumental Wealth</div>
                  <div class="text-xl font-semibold text-blue-300">${{ formatNumber(props.wealthAmount) }}</div>
                </div>
                
                <div class="inline-flex items-center text-green-400 text-sm font-medium mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  <span>+5,200</span>
                </div>
                
                <div class="w-full h-1 bg-blue-800/40 rounded-full mb-4"></div>
                
                <div class="space-y-3">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Skill Value</span>
                    <span class="text-white">${{ formatNumber(skillContributionValue) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Knowledge Acquisition</span>
                    <span class="text-white">${{ formatNumber(knowledgeSharingValue) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Community Participation</span>
                    <span class="text-white">${{ formatNumber(communityParticipationValue) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Verified Activity</span>
                    <span class="text-white">${{ formatNumber(verificationValue) }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Improvement Section - Now "Potential Impact" with predictive analysis -->
              <div class="bg-gray-900/40 p-4 rounded-lg border border-blue-800/50 backdrop-blur-sm">
                <h3 class="text-lg font-bold text-white mb-3">Potential Impact</h3>
                <p class="text-gray-300 text-sm mb-4">
                  Based on these skills and contributions, predictive analysis suggests the following potential impact:
                </p>
                
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-gray-300 text-sm"><span class="text-blue-300 font-medium">Creative Leadership</span>: Exceptional skills in VR/AR and graphic design create the conditions for being a potential pioneer in immersive storytelling. Could be best utilized in leadership roles on projects that blend digital art with education.</p>
                  </li>
                  
                  <li class="flex items-start">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-gray-300 text-sm"><span class="text-blue-300 font-medium">Technology Integration</span>: The combination of AI/LLM expertise with 3D modeling indicates significant potential to transform how communities interact with complex data through visualization. These complementary skills enable the creation of intuitive interfaces for abstract information.</p>
                  </li>
                  
                  <li class="flex items-start">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-gray-300 text-sm"><span class="text-blue-300 font-medium">Educational Innovation</span>: A balanced skill profile suggests untapped potential for creating next-generation educational experiences. The combination of immersive technology with AI-driven personalization could revolutionize how people learn complex subjects.</p>
                  </li>
                  
                  <li class="flex items-start">
                    <div class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <p class="text-gray-300 text-sm"><span class="text-blue-300 font-medium">Community Impact</span>: Based on existing contribution patterns, establishing mentorship programs in these domains could create an estimated 215% return on knowledge investment in local technology communities. The ripple effect would extend beyond direct students to broader ecosystem development.</p>
                  </li>
                </ul>
                
                <div class="mt-4 text-xs text-gray-400 italic">
                  This analysis evolves as skills and verified actions develop. Last updated: May 4, 2025
                </div>
              </div>
              
              <!-- Recent Activity Section -->
              <div class="bg-gray-900/40 p-4 rounded-lg border border-blue-800/50 backdrop-blur-sm">
                <div class="text-sm font-medium text-white mb-2">Recent Activity</div>
                
                <div class="space-y-2">
                  <div class="flex justify-between items-center py-1 border-b border-blue-800/30">
                    <div class="text-sm">
                      <div class="text-gray-300">Skill Assessment: VR/AR</div>
                      <div class="text-xs text-gray-500">April 29, 2025</div>
                    </div>
                    <div class="text-green-400">+$3,200</div>
                  </div>
                  
                  <div class="flex justify-between items-center py-1 border-b border-blue-800/30">
                    <div class="text-sm">
                      <div class="text-gray-300">Knowledge Verification</div>
                      <div class="text-xs text-gray-500">April 27, 2025</div>
                    </div>
                    <div class="text-green-400">+$1,400</div>
                  </div>
                  
                  <div class="flex justify-between items-center py-1">
                    <div class="text-sm">
                      <div class="text-gray-300">Community Contribution</div>
                      <div class="text-xs text-gray-500">April 25, 2025</div>
                    </div>
                    <div class="text-green-400">+$600</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Overlay that gets darker as slider is dragged -->
      <div 
        v-if="activeTab === 'dashboard' && dragPosition < 0" 
        class="fixed inset-0 bg-black transition-opacity z-10"
        :style="{ opacity: darkOverlayOpacity }"
      ></div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import SkillsAssessmentPanel from './SkillsAssessmentPanel.vue';
import TicketQueuePanel from './TicketQueuePanel.vue';
import GlobalView from './GlobalView.vue'; // Import the new GlobalView component

const props = defineProps({
  userName: {
    type: String,
    default: 'Khoury Howell'
  },
  profileImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  wealthAmount: {
    type: [Number, String],
    default: 577900
  },
  rating: {
    type: [Number, String],
    default: 4.0
  }
});

defineEmits(['show-skills']);

// Global View state
const globalViewActive = ref(false);
const showGlobalViewTutorial = ref(false);
const hasSeenGlobalView = ref(false);

// Toggle function for global view
function toggleGlobalView(forceState) {
  if (typeof forceState === 'boolean') {
    globalViewActive.value = forceState;
  } else {
    globalViewActive.value = !globalViewActive.value;
  }
  
  // Show tutorial when activating global view for the first time
  if (globalViewActive.value && !hasSeenGlobalView.value) {
    showGlobalViewTutorial.value = true;
    hasSeenGlobalView.value = true;
  }
}

// Handle profile selection from Global View
function viewGlobeProfile(profileId) {
  console.log(`Viewing profile: ${profileId}`);
  // For now, we'll just disable global view and go back to static view
  // In a real implementation, you might navigate to a specific profile page
  globalViewActive.value = false;
}

// Updated tabs array to reflect new tab names
const tabs = ['dashboard', 'documentation', 'value', 'service'];
const activeTab = ref('dashboard');

const setActiveTab = (tab) => {
  activeTab.value = tab;
  // Disable global view when switching tabs
  if (tab !== 'dashboard') {
    globalViewActive.value = false;
  }
  
  if (tab === 'service') { // Changed 'profile' to 'service'
    showTicketQueue.value = true;
  } else {
    showTicketQueue.value = false;
  }
};

const calculateCircumference = (radius) => {
  return 2 * Math.PI * radius;
};

const calculateDashOffset = (radius, percentage) => {
  const circumference = calculateCircumference(radius);
  return circumference * (1 - percentage);
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(parseInt(num));
};

// Sample data for value breakdown
const skillContributionValue = 289500;
const knowledgeSharingValue = 153400;
const communityParticipationValue = 85000;
const verificationValue = 50000;

// Sample assessment data for the documentation tab
const assessmentList = [
  {
    skill: 'Graphic Design',
    user: 'Maya Johnson',
    rating: 4.2,
    values: {
      learn: 25,
      apply: 60,
      master: 120
    },
    comment: 'Essential for visual communication in today\'s digital landscape. I use this daily for my marketing projects.',
    date: 'April 28, 2025'
  },
  {
    skill: '3D Modeling',
    user: 'Alex Chen',
    rating: 3.8,
    values: {
      learn: 35,
      apply: 80,
      master: 150
    },
    comment: 'Crucial for product visualization and VR/AR applications. Takes time to master but worth the investment.',
    date: 'April 25, 2025'
  },
  {
    skill: 'AI/LLMs',
    user: 'Sarah Williams',
    rating: 4.7,
    values: {
      learn: 45,
      apply: 100,
      master: 200
    },
    comment: 'The future of productivity. Learning this has dramatically improved my workflow and problem-solving abilities.',
    date: 'April 22, 2025'
  },
  {
    skill: 'VR/AR Development',
    user: 'Khoury Howell',
    rating: 4.0,
    values: {
      learn: 40,
      apply: 90,
      master: 180
    },
    comment: 'Critical for creating immersive experiences. I believe this will transform education and training in the next decade.',
    date: 'April 20, 2025'
  }
];

// Skills accordion functionality
const showSkillsAccordion = ref(false);
const expandedSkill = ref(null);

const toggleSkillsAccordion = () => {
  showSkillsAccordion.value = !showSkillsAccordion.value;
};

const toggleSkill = (id) => {
  expandedSkill.value = expandedSkill.value === id ? null : id;
};

const assessSkill = (skill) => {
  // Navigate to skills page instead of toggling the skills assessment panel
  router.push('/skills');
};

// Sample skills data
const skills = [
  {
    id: 1,
    name: 'Graphic Design',
    category: 'Design',
    rating: 4.2,
    description: 'Graphic design is the art of creating visual content to communicate messages. Designers use typography, imagery, color, and form to create visual compositions.',
    contribution: 25000,
    marketDemand: 4.5,
    icon: '🎨'
  },
  {
    id: 2,
    name: '3D Modeling',
    category: 'Development',
    rating: 3.8,
    description: '3D modeling is the process of creating a three-dimensional representation of any surface or object by manipulating polygons, edges, and vertices in simulated 3D space.',
    contribution: 30000,
    marketDemand: 4.0,
    icon: '🖥️'
  },
  {
    id: 3,
    name: 'AI/LLMs',
    category: 'Technology',
    rating: 4.7,
    description: 'Artificial Intelligence (AI) and Large Language Models (LLMs) are technologies that enable machines to learn from data, understand natural language, and perform tasks that typically require human intelligence.',
    contribution: 45000,
    marketDemand: 5.0,
    icon: '🤖'
  },
  {
    id: 4,
    name: 'VR/AR Development',
    category: 'Development',
    rating: 4.0,
    description: 'Virtual Reality (VR) and Augmented Reality (AR) development involves creating immersive digital experiences that can be interacted with in a seemingly real or physical way.',
    contribution: 40000,
    marketDemand: 4.2,
    icon: '🕶️'
  }
];

// Sample skills data categorized
const designSkills = skills.filter(skill => skill.category === 'Design');
const techSkills = skills.filter(skill => skill.category === 'Technology');

// State variables
const showAssessmentPanel = ref(false);
const currentSkillId = ref('');
const showTicketQueue = ref(false);
const showEnvalumentInfo = ref(false);
const isDragging = ref(false); // Added dragging state for transition control
const dragContainer = ref(null); // Added ref for the draggable container
const maxNegativeDrag = ref(0); // Added ref for max drag distance

// Calculate max drag distance based on window size
const calculateMaxDrag = () => {
  const peekAmount = 30; // How much the tab is visible initially (in px)
  // Calculate the drag distance needed for the tab's left edge to reach the center
  // This assumes the tab's width is w-48 (192px). Adjust if width changes.
  const tabWidth = 192;
  // Target left position = window.innerWidth / 2
  // Initial left position = window.innerWidth - peekAmount
  // Required movement = Target - Initial = (window.innerWidth / 2) - (window.innerWidth - peekAmount)
  maxNegativeDrag.value = peekAmount - window.innerWidth / 2;
  // Ensure it's negative
  if (maxNegativeDrag.value > 0) maxNegativeDrag.value = -100; // Fallback if calculation is off
};

// Recalculate on mount and resize
onMounted(() => {
  calculateMaxDrag();
  window.addEventListener('resize', calculateMaxDrag);
});

// Define these functions here so they can be removed in onUnmounted/onMouseUp
let onDrag = null;
let onMouseUp = null;

onUnmounted(() => {
  window.removeEventListener('resize', calculateMaxDrag);
  // Ensure drag listeners are removed if component unmounts during drag
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', onMouseUp);
});


// Draggable button state
const dragPosition = ref(0); // Represents the offset from the initial "peaking" state

// Remove revealTextOpacity as text is always visible on the tab
// const revealTextOpacity = computed(() => { ... });

// Update darkOverlayOpacity calculation based on max drag distance
const darkOverlayOpacity = computed(() => {
  const progress = maxNegativeDrag.value !== 0 ? Math.abs(dragPosition.value) / Math.abs(maxNegativeDrag.value) : 0;
  return Math.min(progress * 0.8, 0.8); // Scale opacity up to 0.8
});

const router = useRouter();

const startDrag = (event) => {
  // Prevent default drag behavior (like image dragging)
  if (event.cancelable) event.preventDefault();

  isDragging.value = true; // Start dragging state
  calculateMaxDrag(); // Ensure max drag is current

  const initialX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
  const initialPosition = dragPosition.value;

  onDrag = (moveEvent) => {
    // Prevent scrolling on touch devices during drag
    if (moveEvent.cancelable) moveEvent.preventDefault();

    const currentX = moveEvent.type === 'mousemove' ? moveEvent.clientX : moveEvent.touches[0].clientX;
    const deltaX = currentX - initialX;
    const newPosition = initialPosition + deltaX;

    // Clamp position: only allow dragging left (negative) up to the max limit
    dragPosition.value = Math.max(maxNegativeDrag.value, Math.min(0, newPosition));
  };

  onMouseUp = () => {
    window.removeEventListener('mousemove', onDrag);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('touchmove', onDrag);
    window.removeEventListener('touchend', onMouseUp);

    isDragging.value = false; // End dragging state

    // Trigger if dragged close to the maximum limit (e.g., 90% of the way)
    if (dragPosition.value < maxNegativeDrag.value * 0.9) {
      router.push('/signup');
      // Keep it extended after navigation
      dragPosition.value = maxNegativeDrag.value;
    } else {
      // Animate back to initial position (CSS transition handles this)
      dragPosition.value = 0;
    }
    // Nullify functions after use
    onDrag = null;
    onMouseUp = null;
  };

  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('touchmove', onDrag, { passive: false }); // passive: false to allow preventDefault
  window.addEventListener('touchend', onMouseUp);
};

// Handle returning back from TicketQueue
function handleTicketQueueBack() {
  showTicketQueue.value = false;
  activeTab.value = 'dashboard';
}

// Combined records for the documentation tab
const combinedRecords = computed(() => {
  // Get any stored records from localStorage
  const storedRecords = localStorage.getItem('userRecords') 
    ? JSON.parse(localStorage.getItem('userRecords')) 
    : [];
    
  // Format stored records if they exist
  const formattedStoredRecords = storedRecords.map(record => {
    // Format date string properly if it's a date object
    let displayDate = record.date;
    if (typeof record.date === 'string' && record.date.includes('T')) {
      displayDate = new Date(record.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
    
    return {
      ...record,
      date: displayDate
    };
  });
  
  // Combine with sample data for samples only if no stored records exist
  // Or append them regardless for demo purposes
  return [
    ...formattedStoredRecords,
    // Only include sample data if we don't have many real records
    ...(formattedStoredRecords.length < 3 ? [
      ...assessmentList.map(assessment => ({ ...assessment, type: 'assessment' })),
      // Filter out sample completed tickets that might duplicate stored ones
      ...completedTickets
        .filter(ticket => !formattedStoredRecords.some(r => r.type === 'ticket' && r.id === ticket.id))
        .map(ticket => ({ ...ticket, type: 'ticket' }))
    ] : [])
  ].sort((a, b) => {
    // Sort by date, newest first (handle both string and Date objects)
    const dateA = a.date instanceof Date ? a.date : new Date(a.date);
    const dateB = b.date instanceof Date ? b.date : new Date(b.date);
    return dateB - dateA;
  });
});

// State for showing all records or just the first two
const showAllRecords = ref(false);

// Sample completed tickets data
const completedTickets = [
  {
    id: 101,
    title: 'Website Redesign',
    user: 'John Doe',
    status: 'Completed',
    date: 'April 30, 2025',
    completedDate: 'April 30, 2025',
    comment: 'The redesign has dramatically improved user engagement metrics.',
    value: '2500'
  },
  {
    id: 102,
    title: 'UI Animation Implementation',
    user: 'Emma Wilson',
    status: 'Completed',
    date: 'April 26, 2025',
    completedDate: 'April 26, 2025',
    comment: 'Smooth animations that enhance the user experience without being distracting.',
    value: '1800'
  },
  {
    id: 103,
    title: 'Database Optimization',
    user: 'Marcus Chen',
    status: 'Completed',
    date: 'April 23, 2025',
    completedDate: 'April 23, 2025',
    comment: 'Query time reduced by 70%. Much better performance overall.',
    value: '3200'
  }
];
</script>

<style scoped>
.user-profile-panel {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}

.star {
  color: rgba(147, 197, 253, 0.8);
  text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
  animation: twinkle infinite ease-in-out;
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

.animate-flow {
  animation: flow infinite ease-in-out;
}

.animate-flow-reverse {
  animation: flow-reverse infinite ease-in-out;
}

@keyframes flow {
  0%, 100% {
    transform: translateY(0) scaleY(1);
    stroke-dashoffset: 0;
  }
  50% {
    transform: translateY(-5px) scaleY(1.05);
    stroke-dashoffset: 10;
  }
}

@keyframes flow-reverse {
  0%, 100% {
    transform: translateY(0) scaleY(1);
    stroke-dashoffset: 10;
  }
  50% {
    transform: translateY(5px) scaleY(0.95);
    stroke-dashoffset: 0;
  }
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease-out;
  max-height: 300px;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}

.shadow-glow-blue {
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.15);
}

.shadow-glow-purple {
  box-shadow: 0 0 15px rgba(147, 51, 234, 0.15);
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Stylized flowing animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
    opacity: 0.8;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.animate-flow {
  animation: flow 20s infinite ease-in-out;
}

.animate-flow-reverse {
  animation: flow-reverse 15s infinite ease-in-out;
}

@keyframes flow {
  0%, 100% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: 20;
  }
}

@keyframes flow-reverse {
  0%, 100% {
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dashoffset: -20;
  }
}

.stars-container {
  overflow: hidden;
}

.star {
  animation: pulse infinite ease-in-out;
  color: rgba(147, 197, 253, 0.8);
  font-size: 12px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.animate-floatSlow {
  animation: floatSlow 20s infinite ease-in-out;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-15px) translateX(10px);
  }
  50% {
    transform: translateY(-5px) translateX(25px);
  }
  75% {
    transform: translateY(10px) translateX(-15px);
  }
}

.wireframe-globe-bg {
  animation: rotateGlobeBg 120s linear infinite;
}

@keyframes rotateGlobeBg {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>