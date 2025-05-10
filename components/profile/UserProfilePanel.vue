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
        
        <!-- View Toggle Control positioned at top left corner -->
        <div v-if="activeTab === 'dashboard'" class="absolute top-3 left-3 z-20 flex items-center space-x-2">
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
          
          <button 
            @click="shareProfile"
            class="flex items-center justify-center w-9 h-9 rounded-full bg-gray-900/70 backdrop-blur-sm hover:bg-gray-800/70 transition-colors duration-300"
            title="Share Profile"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 hover:text-white transition-colors duration-300" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
          </button>
        </div>
        
        <!-- Profile Header Component -->
        <ProfileHeader 
          :userName="props.userName" 
          :profileImage="props.profileImage" 
          :userRole="'Knowledge Contributor'"
          :rating="props.rating || 4.2"
        />
        
        <!-- Envalumental Display Component -->
        <EnvalumentDisplay 
          :wealthAmount="props.wealthAmount"
          @show-info="showEnvalumentInfo = true"
        />

        <!-- Draggable Profile Tab Component -->
        <DraggableProfileTab
          v-if="activeTab === 'dashboard'"
          @navigate-to-signup="router.push('/signup')"
        />

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
        
        <!-- Skills Accordion Component -->
        <SkillsAccordion 
          :skills="skills" 
          @assess-skill="assessSkill"
          @add-skill="addNewSkill"
        />
        
        <!-- Navigation Tabs Component -->
        <TabNavigation 
          :tabs="tabs" 
          v-model:activeTab="activeTab" 
          @update:activeTab="setActiveTab"
        />
        
        <!-- Tab Content Panels -->
        <div class="mt-6">
          <!-- Home Tab Content -->
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
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
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
          </div>
          
          <!-- Documentation Tab Panel (Records Tab) -->
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
            <!-- Use the ValueBreakdown component -->
            <ValueBreakdown 
              :wealthAmount="props.wealthAmount"
              :skillContributionValue="skillContributionValue"
              :knowledgeSharingValue="knowledgeSharingValue"
              :communityParticipationValue="communityParticipationValue"
              :verificationValue="verificationValue"
            />
            
            <!-- Recent Activity Section -->
            <div class="bg-gray-900/40 p-4 rounded-lg border border-blue-800/50 backdrop-blur-sm mt-4">
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
      
      <!-- Overlay that gets darker as slider is dragged -->
      <div 
        v-if="activeTab === 'dashboard' && dragPosition < 0" 
        class="fixed inset-0 bg-black transition-opacity z-10"
        :style="{ opacity: darkOverlayOpacity }"
      ></div>
    </div>

    <!-- Share Profile Popup -->
    <div v-if="showShareDialog" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showShareDialog = false"></div>
      
      <div class="relative z-10 bg-gradient-to-b from-gray-900 to-blue-950 p-6 rounded-xl max-w-md mx-4 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
        <div class="flex justify-between items-start">
          <h3 class="text-xl font-bold text-blue-300">Share Profile</h3>
          <button @click="showShareDialog = false" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="mt-4">
          <div class="flex flex-col items-center">
            <!-- Using the ProfileCard component with aspect-ratio: 9/16 -->
            <ProfileCard
              ref="shareCardRef"
              :userName="props.userName"
              :profileImage="props.profileImage"
              :wealthAmount="props.wealthAmount"
              :rating="props.rating"
              :skills="skills"
              :skillsCount="skills.length"
              :ratingsCount="combinedRecords.length"
              :skillValue="skillContributionValue"
              :knowledgeValue="knowledgeSharingValue"
              :generatedDate="currentDate"
              :customStyle="{ 'aspect-ratio': '9/16' }"
            />
            
            <!-- Download button -->
            <button 
              @click="downloadShareableImage" 
              class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center"
              :disabled="isGeneratingImage"
            >
              <svg v-if="!isGeneratingImage" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <svg v-else class="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isGeneratingImage ? 'Generating...' : 'Download Image' }}
            </button>
          </div>
          
          <!-- Social sharing options -->
          <div class="mt-6">
            <h4 class="text-sm text-white mb-3">Share on social media</h4>
            <div class="flex justify-center space-x-4">
              <button class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white">
                <span class="sr-only">Twitter</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-blue-800 hover:bg-blue-700 flex items-center justify-center text-white">
                <span class="sr-only">Facebook</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-pink-600 hover:bg-pink-500 flex items-center justify-center text-white">
                <span class="sr-only">Instagram</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01-3.96-.058-.976-.045-1.505-.207-1.858-.344-.466-.182-.8-.398-1.15-.748-.35-.35-.566-.683-.748-1.15-.137-.353-.3-.882-.344-1.857-.047-1.023-.058-1.351-.058-3.807v-.468c0-2.456.011-2.784.058-3.807.045-.975.207-1.504.344-1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-blue-700 hover:bg-blue-600 flex items-center justify-center text-white">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Share Profile Modal -->
    <div v-if="showShareModal" class="fixed inset-0 flex items-center justify-center z-50" @click.self="showShareModal = false">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      <div class="relative z-10 flex flex-col items-center bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 p-6 rounded-xl max-w-sm w-11/12 mx-auto border border-blue-500/40 shadow-2xl">
        <div class="w-full flex justify-between items-center mb-5">
          <h3 class="text-xl font-bold text-white">Share Profile</h3>
          <button @click="showShareModal = false" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="text-center mb-6">
          <div class="inline-block p-3 bg-gray-800/50 rounded-lg border border-blue-700/30 mb-3">
            <!-- QR Code will be rendered here by the qrcode.vue component -->
            <QRCodeVue3
              :value="profileLink"
              :size="128"
              :level="'H'"
              class="w-32 h-32"
            />
          </div>
          <p class="text-sm text-gray-300">Scan the QR code to view the profile</p>
        </div>
        
        <div class="w-full mb-5">
          <label class="block text-xs text-blue-300 mb-1">Profile Link</label>
          <div class="flex">
            <input 
              type="text" 
              :value="profileLink" 
              readonly 
              class="flex-1 px-3 py-2 bg-gray-800/50 border border-blue-700/30 rounded-l-lg text-gray-300"
            />
            <button 
              @click="copyProfileLink" 
              class="px-3 py-2 bg-blue-600 hover:bg-blue-500 border border-blue-700/30 rounded-r-lg text-white"
            >
              Copy
            </button>
          </div>
        </div>
        
        <button 
          @click="downloadQRCode" 
          class="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download QR Code
        </button>
      </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import SkillsAssessmentPanel from './SkillsAssessmentPanel.vue';
import TicketQueuePanel from './TicketQueuePanel.vue';
import GlobalView from './GlobalView.vue'; 
import ProfileHeader from './ProfileHeader.vue';
import EnvalumentDisplay from './EnvalumentDisplay.vue';
import DraggableProfileTab from './DraggableProfileTab.vue';
import SkillsAccordion from './SkillsAccordion.vue';
import TabNavigation from './TabNavigation.vue';
import ValueBreakdown from './ValueBreakdown.vue';
import html2canvas from 'html2canvas';
import ProfileCard from '../ui/ProfileCard.vue';
import { formatNumber, formatCurrency, formatDate, convertToLetterGrade } from '~/utils/formatter';

const props = defineProps({
  userName: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  wealthAmount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
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
  
  if (tab === 'service') {
    showTicketQueue.value = true;
  } else {
    showTicketQueue.value = false;
  }
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

// Skills functionality
const assessSkill = (skill) => {
  // Navigate to skills page instead of toggling the skills assessment panel
  router.push('/skills');
};

// Method to handle adding a new skill
const addNewSkill = () => {
  console.log('Adding new skill');
  
  // Create a new skill with default values
  const newSkill = {
    id: `skill-${Date.now()}`, // Generate a unique ID using timestamp
    name: 'New Skill', // Default name that user can edit
    category: 'Other',
    rating: 0,
    progress: 0,
    level: 'Beginner',
    icon: '⭐', // Default icon
    isNew: true // Flag to indicate this is a newly added skill
  };
  
  // Add the new skill to the skills array
  skills.push(newSkill);
  
  // Optionally open a modal or form to edit the skill details
  // For now, we'll just show an alert confirming the skill was added
  alert(`New skill "${newSkill.name}" added. You can now rate and customize it.`);
  
  // Optionally trigger skill assessment for the new skill
  assessSkill(newSkill);
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

// State variables
const showAssessmentPanel = ref(false);
const currentSkillId = ref('');
const showTicketQueue = ref(false);
const showEnvalumentInfo = ref(false);
const isDragging = ref(false); 
const dragContainer = ref(null); 
const maxNegativeDrag = ref(0); 

// Calculate max drag distance based on window size
const calculateMaxDrag = () => {
  const peekAmount = 30; // How much the tab is visible initially (in px)
  const tabWidth = 192;
  maxNegativeDrag.value = peekAmount - window.innerWidth / 2;
  if (maxNegativeDrag.value > 0) maxNegativeDrag.value = -100; 
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
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', onMouseUp);
});

// Draggable button state
const dragPosition = ref(0);

// Update darkOverlayOpacity calculation based on max drag distance
const darkOverlayOpacity = computed(() => {
  const progress = maxNegativeDrag.value !== 0 ? Math.abs(dragPosition.value) / Math.abs(maxNegativeDrag.value) : 0;
  return Math.min(progress * 0.8, 0.8); // Scale opacity up to 0.8
});

const router = useRouter();

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
    // Or append them regardless for demo purposes
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
    date: 'April 23, 5',
    completedDate: 'April 23, 2025',
    comment: 'Query time reduced by 70%. Much better performance overall.',
    value: '3200'
  }
];

// Share Profile state
const showShareDialog = ref(false);
const showShareModal = ref(false);
const shareCardRef = ref(null);
const isGeneratingImage = ref(false);
const profileLink = 'https://niea.gov/profile/khoury-howell';
const currentDate = new Date().toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

// Function to handle sharing profile
function shareProfile() {
  showShareDialog.value = true;
}

// Function to copy profile link to clipboard
function copyProfileLink() {
  navigator.clipboard.writeText(profileLink);
  // Could add a toast notification here
  console.log('Profile link copied to clipboard');
}

// Function to download QR code
function downloadQRCode() {
  // Implementation would use html2canvas similar to downloadShareableImage
  console.log('Downloading QR code');
}

// Function to download shareable image
const downloadShareableImage = async () => {
  try {
    if (!shareCardRef.value || !shareCardRef.value.cardRef) return;
    
    // Set loading state
    isGeneratingImage.value = true;
    
    // Get the actual DOM element from the ProfileCard component's exposed ref
    const cardElement = shareCardRef.value.cardRef;
    
    // Set up canvas with the exact 9:16 aspect ratio with higher resolution
    const canvas = await html2canvas(cardElement, {
      backgroundColor: null,
      scale: 3, // Higher resolution for better quality
      width: cardElement.offsetWidth,
      height: cardElement.offsetWidth * (16/9), // Force 9:16 aspect ratio
    });
    
    // Convert canvas to a data URL
    const imgData = canvas.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `${props.userName.replace(/\s+/g, '-')}-profile-${new Date().toISOString().slice(0, 10)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset loading state
    isGeneratingImage.value = false;
  } catch (error) {
    console.error('Error generating image:', error);
    isGeneratingImage.value = false;
    alert('Failed to generate image. Please try again.');
  }
};

// Sample dynamic content
const tutorials = ref([
  { title: 'Introduction to AR Development', duration: '15 min' },
  { title: 'Advanced Unity Techniques', duration: '45 min' },
  { title: 'Collaborative VR Environments', duration: '30 min' }
]);

const events = ref([
  { title: 'Virtual Reality Summit', date: 'Next week' },
  { title: 'Developer Hackathon', date: 'This month' },
  { title: 'Industry Networking Event', date: 'Coming soon' }
]);
</script>