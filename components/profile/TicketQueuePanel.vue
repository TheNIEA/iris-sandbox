<template>
  <div class="ticket-queue-panel w-full max-w-md mx-auto rounded-xl overflow-hidden">
    <!-- Background gradient similar to UserProfilePanel -->
    <div class="relative bg-gradient-to-b from-gray-950 via-blue-950 to-purple-950 p-6 pt-10">
      
      <!-- Header with title -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white">Open Request</h1>
        <div class="mt-2 text-blue-300">
          Now Serving: <span class="text-xl font-semibold">#{{ currentTicketNumber }}</span>
        </div>
      </div>
      
      <!-- Enter Code Button -->
      <div class="mb-8 text-center">
        <button 
          @click="showCodeInput = !showCodeInput" 
          class="px-5 py-3 bg-blue-700/40 hover:bg-blue-600/50 rounded-lg text-white transition-colors border border-blue-500/30 backdrop-blur-sm"
        >
          <span class="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Enter Number
          </span>
        </button>
      </div>
      
      <!-- Code Input (conditionally shown) -->
      <div v-if="showCodeInput" class="mb-8 p-4 bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-800/30">
        <div class="mb-2 text-sm text-blue-300">Enter your ticket code:</div>
        <div class="flex space-x-2">
          <input
            v-model="ticketCode"
            type="text"
            class="flex-1 px-3 py-2 bg-gray-800/80 border border-blue-700/30 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Example: TK-123"
          />
          <button
            @click="lookupTicket"
            class="px-4 py-2 bg-blue-600/80 hover:bg-blue-500/80 rounded text-white"
          >
            Submit
          </button>
        </div>
      </div>
      
      <!-- Ticket Stub -->
      <div ref="ticketStubRef" class="relative cursor-grab" @mousedown="startDrag" @touchstart="startDrag">
        <!-- Ticket Stub UI -->
        <div :class="['ticket-stub', {'ticket-dragging': isDragging}]">
          <div class="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-lg border border-blue-500/40 shadow-lg backdrop-blur-md text-center" 
               :style="ticketGradientStyle">
            <!-- Left color overlay (blue) -->
            <div 
              v-show="dragDirection === 'left' && dragDistance > 0"
              class="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/80 to-transparent pointer-events-none transition-opacity"
              :style="{ opacity: Math.min(dragDistance / 150, 0.8) }"
            ></div>
            
            <!-- Right color overlay (green) -->
            <div 
              v-show="dragDirection === 'right' && dragDistance > 0"
              class="absolute inset-0 rounded-lg bg-gradient-to-l from-green-600/80 to-transparent pointer-events-none transition-opacity"
              :style="{ opacity: Math.min(dragDistance / 150, 0.8) }"
            ></div>
            
            <div class="absolute top-3 left-3 right-3 flex justify-between z-10">
              <div class="text-xs text-blue-300">#{{ nextTicketNumber }}</div>
              <div class="text-xs text-blue-300">{{ currentDate }}</div>
            </div>
            
            <!-- Ticket Content -->
            <div class="py-6 relative z-10">
              <div class="mb-4 text-gray-300 text-sm">Pull to interact</div>
              <div class="h-16 flex items-center justify-center">
                <div class="ticket-icon text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
              </div>
              <div class="text-white font-semibold">Envalument Service</div>
              <div class="text-xs text-blue-300 mt-1">Pull right to request - Pull left to view</div>
            </div>
            
            <!-- Perforation -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full z-10">
              <div class="ticket-perforation"></div>
            </div>
          </div>
        </div>
        
        <!-- Left side reveal (View All Tickets) -->
        <div 
          :class="['ticket-overlay left-overlay', {'active': dragDirection === 'left' && dragDistance > 50}]"
        >
          <div class="bg-blue-600/80 h-full rounded-l-lg flex items-center justify-center px-6">
            <div class="text-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>View All Tickets</div>
            </div>
          </div>
        </div>
        
        <!-- Right side reveal (Request a Task) -->
        <div 
          :class="['ticket-overlay right-overlay', {'active': dragDirection === 'right' && dragDistance > 50}]"
        >
          <div class="bg-green-600/80 h-full rounded-r-lg flex items-center justify-center px-6">
            <div class="text-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>Request a Task</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- View All Tickets Panel (shown when pulled left) -->
      <div v-if="showTicketList" class="mt-8 p-4 bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-800/30">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-white">Open Tickets</h3>
          <button @click="showTicketList = false" class="text-blue-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="tickets.length === 0" class="text-center py-6 text-gray-400">
          No open tickets
        </div>
        
        <div v-else class="space-y-3">
          <div 
            v-for="ticket in tickets" 
            :key="ticket.id" 
            class="p-3 bg-gray-800/50 rounded border border-blue-900/30 cursor-pointer hover:bg-gray-700/50 transition-colors"
            @click="showTicketDetail(ticket)"
          >
            <div class="flex justify-between">
              <div class="text-blue-300 font-mono">#{{ ticket.id }}</div>
              <div class="text-gray-400 text-sm">{{ ticket.date }}</div>
            </div>
            <div class="text-white mt-1">{{ ticket.title }}</div>
            <div class="text-gray-400 text-sm mt-1">{{ ticket.status }}</div>
          </div>
        </div>
      </div>
      
      <!-- Ticket Detail Popup -->
      <div v-if="showTicketDetailPopup" class="fixed inset-0 flex items-center justify-center z-50 bg-black/70 overflow-y-auto py-8">
        <div class="bg-gray-900 p-6 rounded-lg border border-blue-500/50 shadow-lg max-w-xl w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">Ticket #{{ selectedTicket.id }}</h3>
            <button @click="showTicketDetailPopup = false" class="text-blue-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <!-- Ticket Information -->
            <div>
              <div class="text-sm text-blue-300">Title</div>
              <div class="text-white">{{ selectedTicket.title }}</div>
            </div>
            
            <div>
              <div class="text-sm text-blue-300">Description</div>
              <div class="text-white bg-gray-800/50 p-3 rounded">
                {{ selectedTicket.description || "No description provided" }}
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-blue-300">Requester Name</div>
                <div class="text-white">{{ selectedTicket.name || "Not provided" }}</div>
              </div>
              
              <div>
                <div class="text-sm text-blue-300">Contact Information</div>
                <div class="text-white">{{ selectedTicket.contact || "Not provided" }}</div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-blue-300">Status</div>
                <div class="text-white">{{ selectedTicket.status }}</div>
              </div>
              
              <div>
                <div class="text-sm text-blue-300">Priority</div>
                <div class="text-white capitalize">{{ selectedTicket.priority || "Medium" }}</div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-blue-300">Date Submitted</div>
                <div class="text-white">{{ selectedTicket.date }}</div>
              </div>
              
              <div>
                <div class="text-sm text-blue-300">Expected Date</div>
                <div class="text-white">{{ selectedTicket.expectedDate || "Not specified" }}</div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div class="text-sm text-blue-300">Estimated Time</div>
                <div class="text-white">{{ selectedTicket.estimatedTime || "Pending assessment" }}</div>
              </div>
              
              <div>
                <div class="text-sm text-blue-300">Added Value Potential</div>
                <div class="flex items-center">
                  <div class="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
                       :style="`width: ${(selectedTicket.valueRating || 5) * 10}%`"></div>
                  <span class="ml-2 text-white">{{ selectedTicket.valueRating || 5 }}/10</span>
                </div>
              </div>
            </div>

            <div v-if="selectedTicket.requiredDeliverables">
              <div class="text-sm text-blue-300">Required Deliverables</div>
              <div class="text-white bg-gray-800/50 p-3 rounded whitespace-pre-line">
                {{ selectedTicket.requiredDeliverables }}
              </div>
            </div>

            <div v-if="selectedTicket.attachments && selectedTicket.attachments.length > 0">
              <div class="text-sm text-blue-300">Attachments</div>
              <div class="flex flex-wrap gap-2 mt-1">
                <div v-for="(file, index) in selectedTicket.attachments" :key="index"
                     class="bg-gray-800/80 p-2 rounded flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span class="text-white truncate max-w-[150px]">{{ file.name }}</span>
                </div>
              </div>
            </div>
            
            <!-- Action buttons -->
            <div class="pt-4 flex space-x-3">
              <button class="flex-1 py-2 px-4 bg-blue-600/80 hover:bg-blue-500/80 rounded text-white">
                Update Status
              </button>
              <button class="flex-1 py-2 px-4 bg-red-600/80 hover:bg-red-500/80 rounded text-white">
                Cancel Request
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- New Ticket Form (shown when "Request Assistance" is clicked) -->
      <div v-if="showRequestForm" class="mt-8 p-4 bg-gray-900/50 backdrop-blur-md rounded-lg border border-blue-800/30">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-white">New Support Ticket</h3>
          <button @click="showRequestForm = false" class="text-blue-300 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="submitTicket" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Name</label>
            <input 
              v-model="newTicket.name" 
              type="text" 
              class="w-full p-2 bg-gray-800/50 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Your name"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Contact Information</label>
            <input 
              v-model="newTicket.contact" 
              type="text" 
              class="w-full p-2 bg-gray-800/50 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Email, phone, or social media username"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Title</label>
            <input 
              v-model="newTicket.title" 
              type="text" 
              class="w-full p-2 bg-gray-800/50 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Brief description of the issue"
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Description</label>
            <textarea 
              v-model="newTicket.description" 
              rows="3" 
              class="w-full p-2 bg-gray-800/50 text-white rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Detailed explanation of the issue..."
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Required Deliverables</label>
            <textarea 
              v-model="newTicket.requiredDeliverables" 
              rows="2" 
              class="w-full p-2 bg-gray-800/50 text-white rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="List all required deliverables..."
            ></textarea>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-blue-300 mb-1">Priority</label>
              <select 
                v-model="newTicket.priority" 
                class="w-full p-2 bg-gray-800/50 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-blue-300 mb-1">Expected Date</label>
              <input 
                v-model="newTicket.expectedDate" 
                type="date" 
                class="w-full p-2 bg-gray-800/50 text-white rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">
              Added Value Potential (1-10)
            </label>
            <div class="flex items-center">
              <input 
                v-model="newTicket.valueRating" 
                type="range" 
                min="1" 
                max="10" 
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              >
              <span class="ml-2 text-white min-w-[2ch]">{{ newTicket.valueRating }}</span>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-blue-300 mb-1">Attachments</label>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col w-full h-32 border-2 border-dashed border-blue-300/30 hover:border-blue-300/60 rounded-lg cursor-pointer bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
                <div class="flex flex-col items-center justify-center pt-7">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p class="pt-1 text-sm text-blue-300">
                    <span class="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p class="text-xs text-gray-400 mt-1">
                    Images, documents (max. 10MB)
                  </p>
                </div>
                <input @change="handleFileUpload" type="file" multiple class="hidden" />
              </label>
            </div>
            <!-- Uploaded files preview -->
            <div v-if="newTicket.attachments && newTicket.attachments.length > 0" class="mt-2 flex flex-wrap gap-2">
              <div 
                v-for="(file, index) in newTicket.attachments" 
                :key="index" 
                class="bg-gray-800 px-2 py-1 rounded flex items-center text-sm group"
              >
                <span class="text-blue-300 truncate max-w-[150px]">{{ file.name }}</span>
                <button 
                  @click.prevent="removeFile(index)" 
                  class="ml-2 text-gray-400 hover:text-red-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="pt-2 flex justify-end">
            <button 
              type="submit" 
              :disabled="!isValidTicket"
              :class="[
                'px-4 py-2 rounded text-white', 
                isValidTicket ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-900/50 cursor-not-allowed'
              ]"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
      
      <!-- Success message -->
      <div v-if="showSuccessMessage" class="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
        <div class="bg-gray-900 p-6 rounded-lg border border-green-500/50 shadow-lg max-w-sm w-full">
          <div class="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="text-xl text-white font-semibold mb-2">Success!</h3>
            <p class="text-gray-300 mb-4">Your ticket has been submitted.</p>
            <p class="text-gray-300 mb-6">Your ticket number: <span class="font-mono text-blue-300">#{{ lastSubmittedTicket }}</span></p>
            <button 
              @click="showSuccessMessage = false" 
              class="px-5 py-2 bg-blue-600/80 hover:bg-blue-500/80 rounded text-white w-full"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <!-- Navigation Bar -->
      <div class="flex justify-around items-center mt-8 pt-4 pb-2 border-t border-blue-800/50">
        <button 
          class="flex flex-col items-center px-4 py-2 text-blue-400 hover:text-white transition-colors" 
          @click="$emit('back')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span class="text-xs mt-1">Back</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Emit events for parent component
const emit = defineEmits(['back']);

// State variables
const showCodeInput = ref(false);
const ticketCode = ref('');
const currentTicketNumber = ref(42);
const nextTicketNumber = ref(43);
const showTicketList = ref(false);
const showRequestForm = ref(false);
const showSuccessMessage = ref(false);
const lastSubmittedTicket = ref('');
const currentDate = ref('');
// For ticket detail popup
const showTicketDetailPopup = ref(false);
const selectedTicket = ref({});

// Ticket list data
const tickets = ref([
  { 
    id: '38', 
    title: 'Need help with Tailwind CSS setup', 
    status: 'In progress', 
    date: '2025-05-01',
    description: 'Having issues configuring Tailwind with the Nuxt project. Styles are not being applied correctly.',
    priority: 'high',
    estimatedTime: '1-2 hours',
    name: 'Alex Johnson',
    contact: 'alex.j@example.com',
    expectedDate: '2025-05-10',
    requiredDeliverables: '- Working Tailwind configuration\n- Documentation on usage with Nuxt\n- Example component with styling',
    valueRating: 8,
    attachments: [
      { name: 'error_screenshot.png' },
      { name: 'config.js' }
    ]
  },
  { 
    id: '39', 
    title: 'Vue component not rendering', 
    status: 'Pending', 
    date: '2025-05-02',
    description: 'The CommunitySidebar component is not rendering properly when navigating from the skills page.',
    priority: 'medium',
    estimatedTime: '30 minutes',
    name: 'Sarah Mills',
    contact: '@sarahmdev',
    expectedDate: '2025-05-05',
    requiredDeliverables: '- Fix for the rendering issue\n- Explanation of what caused it',
    valueRating: 6,
    attachments: [
      { name: 'bug_report.pdf' }
    ]
  },
  { 
    id: '41', 
    title: 'Server deployment issue', 
    status: 'Pending', 
    date: '2025-05-03',
    description: 'Deployment to production server is failing due to build errors. Need assistance debugging.',
    priority: 'high',
    estimatedTime: '2-3 hours',
    name: 'Jordan Lee',
    contact: '555-123-4567',
    expectedDate: '2025-05-04',
    requiredDeliverables: '- Successful deployment\n- Documentation of fix\n- Prevention steps for future',
    valueRating: 9,
    attachments: [
      { name: 'error_logs.txt' },
      { name: 'build_config.json' }
    ]
  },
]);

// New ticket form
const newTicket = ref({
  title: '',
  description: '',
  priority: 'medium',
  name: '',
  contact: '',
  expectedDate: '',
  requiredDeliverables: '',
  valueRating: 5,
  attachments: []
});

// Calculate if form is valid
const isValidTicket = computed(() => {
  return newTicket.value.title.trim() !== '' && 
         newTicket.value.description.trim() !== '' &&
         newTicket.value.name.trim() !== '';
});

// Format the current date
onMounted(() => {
  const now = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  currentDate.value = now.toLocaleDateString('en-US', options);
});

// Function to show ticket detail popup
const showTicketDetail = (ticket) => {
  selectedTicket.value = ticket;
  showTicketDetailPopup.value = true;
};

// Handle file uploads
const handleFileUpload = (event) => {
  const files = Array.from(event.target.files);
  const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024); // 10MB limit
  
  if (!newTicket.value.attachments) {
    newTicket.value.attachments = [];
  }
  
  newTicket.value.attachments.push(...validFiles);
};

// Remove a file from attachments
const removeFile = (index) => {
  newTicket.value.attachments.splice(index, 1);
};

// Drag functionality variables
const ticketStubRef = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const currentX = ref(0);
const dragDistance = ref(0);
const dragDirection = ref(null);

// Start drag
const startDrag = (e) => {
  e.preventDefault();
  
  // Get initial position
  if (e.type === 'mousedown') {
    startX.value = e.clientX;
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', endDrag);
  } else if (e.type === 'touchstart') {
    startX.value = e.touches[0].clientX;
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', endDrag);
  }
  
  // Reset variables
  isDragging.value = true;
  dragDistance.value = 0;
  dragDirection.value = null;
};

// During drag
const onDrag = (e) => {
  if (!isDragging.value) return;
  
  // Calculate position
  const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
  const deltaX = clientX - startX.value;
  
  // Update direction and distance
  dragDirection.value = deltaX < 0 ? 'left' : 'right';
  dragDistance.value = Math.abs(deltaX);
  
  // Move the ticket stub
  if (ticketStubRef.value) {
    ticketStubRef.value.style.transform = `translateX(${deltaX}px)`;
  }
};

// End drag
const endDrag = () => {
  // Clean up event listeners
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', endDrag);
  
  // Reset position
  if (ticketStubRef.value) {
    ticketStubRef.value.style.transform = '';
  }
  
  // Trigger actions based on direction and distance
  if (dragDistance.value > 100) {
    if (dragDirection.value === 'left') {
      showTicketList.value = true;
    } else if (dragDirection.value === 'right') {
      showRequestForm.value = true;
    }
  }
  
  // Reset dragging state
  isDragging.value = false;
};

// Clean up event listeners on component unmount
onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDrag);
  window.removeEventListener('touchend', endDrag);
});

// Computed property for ticket gradient style based on drag direction
const ticketGradientStyle = computed(() => {
  if (!isDragging.value || dragDistance.value === 0) {
    return {}; // Default style when not dragging
  }
  
  // No additional styles needed since we're using overlay divs for the color effects
  return {};
});

// Look up a ticket by code
const lookupTicket = () => {
  if (ticketCode.value.trim() === '') return;
  
  // In a real application, this would be an API call
  const foundTicket = tickets.value.find(ticket => ticket.id === ticketCode.value);
  
  if (foundTicket) {
    // Show the ticket details (simplified for demo)
    alert(`Found ticket: ${foundTicket.title}`);
  } else {
    alert('Ticket not found');
  }
  
  ticketCode.value = '';
  showCodeInput.value = false;
};

// Submit a new ticket
const submitTicket = () => {
  if (!isValidTicket.value) return;
  
  // Generate a new ticket ID
  const ticketId = nextTicketNumber.value.toString();
  
  // Format attachments for storage
  let formattedAttachments = [];
  if (newTicket.value.attachments && newTicket.value.attachments.length > 0) {
    formattedAttachments = newTicket.value.attachments.map(file => ({
      name: file.name
    }));
  }
  
  // Add the ticket to the list
  tickets.value.push({
    id: ticketId,
    title: newTicket.value.title,
    description: newTicket.value.description,
    priority: newTicket.value.priority,
    status: 'Pending',
    date: currentDate.value,
    estimatedTime: 'Pending review',
    name: newTicket.value.name,
    contact: newTicket.value.contact,
    expectedDate: newTicket.value.expectedDate,
    requiredDeliverables: newTicket.value.requiredDeliverables,
    valueRating: newTicket.value.valueRating,
    attachments: formattedAttachments
  });
  
  // Update ticket numbers
  lastSubmittedTicket.value = ticketId;
  currentTicketNumber.value = nextTicketNumber.value;
  nextTicketNumber.value++;
  
  // Reset form
  newTicket.value = {
    title: '',
    description: '',
    priority: 'medium',
    name: '',
    contact: '',
    expectedDate: '',
    requiredDeliverables: '',
    valueRating: 5,
    attachments: []
  };
  
  // Show success message and close form
  showRequestForm.value = false;
  showSuccessMessage.value = true;
};
</script>

<style scoped>
/* Ticket styling */
.ticket-stub {
  transition: transform 0.3s ease;
}

.ticket-dragging {
  cursor: grabbing;
}

.ticket-perforation {
  height: 4px;
  background-image: linear-gradient(90deg, transparent, transparent 50%, #ffffff33 50%, #ffffff33 100%);
  background-size: 12px 2px;
}

/* Overlay panels */
.ticket-overlay {
  position: absolute;
  top: 0;
  height: 100%;
  width: 25%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.left-overlay {
  left: 0;
}

.right-overlay {
  right: 0;
}

.ticket-overlay.active {
  opacity: 1;
}

/* Animation styles */
.ticket-icon {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.7;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}
</style>