<template>
  <div class="global-view fixed inset-0 w-screen h-screen z-50">
    <!-- Three.js canvas where the globe will be rendered -->
    <canvas ref="globeCanvas" class="absolute inset-0 w-full h-full"></canvas>
    
    <!-- Back button -->
    <button 
      @click="$emit('back')" 
      class="absolute top-4 left-4 z-10 p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/80 text-white backdrop-blur-sm transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd" />
      </svg>
    </button>
      
    <!-- Controls overlay -->
    <div class="absolute bottom-4 right-4 flex items-center space-x-3 z-10">
      <div class="zoom-controls flex flex-col space-y-2">
        <button 
          @click="zoomIn" 
          class="p-2 rounded-full bg-blue-600/60 hover:bg-blue-500/80 text-white backdrop-blur-sm transition-colors"
          title="Zoom In"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
        </button>
        <button 
          @click="zoomOut" 
          class="p-2 rounded-full bg-blue-600/60 hover:bg-blue-500/80 text-white backdrop-blur-sm transition-colors"
          title="Zoom Out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <button 
        @click="resetView" 
        class="p-2 rounded-full bg-blue-600/60 hover:bg-blue-500/80 text-white backdrop-blur-sm transition-colors"
        title="Reset View"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    
    <!-- Zoom level indicator -->
    <div class="absolute bottom-4 left-4 bg-gray-800/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
      Zoom: {{ Math.round(zoomLevel * 100) }}%
    </div>

    <!-- Profile preview/detail panel that appears when a profile node is selected -->
    <transition name="slide-up">
      <div v-if="selectedProfile" class="profile-preview absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-t border-blue-500/30 p-4 z-20">
        <div class="flex items-start max-w-3xl mx-auto">
          <div class="relative mr-4">
            <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400">
              <img :src="selectedProfile.image" alt="Profile" class="w-full h-full object-cover" />
            </div>
            <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {{ selectedProfile.level }}
            </div>
          </div>
          
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-white text-lg font-semibold">{{ selectedProfile.name }}</h3>
                <p class="text-blue-300 text-sm">{{ selectedProfile.title }}</p>
              </div>
              
              <button @click="selectedProfile = null" class="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div class="mt-2">
              <div class="flex items-center mb-1">
                <span class="text-gray-400 text-sm mr-2">Envalumental Wealth:</span>
                <span class="text-blue-300 font-medium">${{ formatNumber(selectedProfile.wealth) }}</span>
              </div>
              
              <div class="flex items-center">
                <span class="text-gray-400 text-sm mr-2">Top Skills:</span>
                <div class="flex flex-wrap">
                  <span v-for="(skill, idx) in selectedProfile.skills" :key="idx" 
                    class="inline-block text-xs mr-1 mb-1 px-2 py-0.5 rounded-full"
                    :class="[
                      idx % 2 === 0 ? 'bg-blue-500/30 text-blue-200' : 'bg-purple-500/30 text-purple-200'
                    ]"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
            
            <div class="mt-3 flex justify-end">
              <button 
                @click="viewFullProfile(selectedProfile)"
                class="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white text-sm transition-colors flex items-center"
              >
                <span>View Full Profile</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    
    <!-- Loading indicator -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-gray-900/70 z-30">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div class="mt-4 text-blue-300">Loading profiles...</div>
      </div>
    </div>

    <div class="absolute top-4 right-4 z-10 bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-xs">
      <div class="flex items-center justify-between">
        <div class="font-medium">Profile Globe</div>
        <div class="text-xs text-blue-300">{{ profiles.length }} profiles</div>
      </div>
      <div class="text-gray-300 text-xs mt-1">
        <span class="font-medium">Zoom</span> with the scroll wheel or buttons, 
        <span class="font-medium">rotate</span> by dragging, and 
        <span class="font-medium">tap</span> to select a profile.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { formatNumber, formatCurrency } from '~/utils/formatter';

// Props and emits
const emit = defineEmits(['view-profile', 'back']);

// Reactive state
const globeCanvas = ref(null);
const isLoading = ref(true);
const zoomLevel = ref(1);
const selectedProfile = ref(null);

// Three.js objects
let scene, camera, renderer, controls;
let globe, profileNodes = [];

// Generate 100 sample profiles
const profiles = ref(Array.from({ length: 100 }, (_, i) => {
  // Generate random skills
  const allSkills = ['VR/AR', '3D Modeling', 'AI/ML', 'Graphic Design', 'UX Design', 
    'Frontend Dev', 'Backend Dev', 'Game Design', 'Music Production', 'Video Editing',
    'Writing', 'Marketing', 'Data Analysis', 'Teaching', 'Public Speaking', 
    'Project Management', 'Leadership'];
  
  const skills = [];
  const numSkills = Math.floor(Math.random() * 3) + 1; // 1-3 skills
  for (let j = 0; j < numSkills; j++) {
    const skill = allSkills[Math.floor(Math.random() * allSkills.length)];
    if (!skills.includes(skill)) {
      skills.push(skill);
    }
  }
  
  return {
    id: `profile-${i + 1}`,
    name: generateName(),
    image: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    title: generateTitle(),
    level: Math.floor(Math.random() * 5) + 1,
    wealth: Math.floor(Math.random() * 500000) + 10000,
    skills,
    // 3D position will be set during initialization
    position: {
      lat: (Math.random() * 180) - 90, // -90 to 90 degrees (latitude)
      lng: (Math.random() * 360) - 180, // -180 to 180 degrees (longitude)
    }
  };
}));

// Helper function to generate a random name
function generateName() {
  const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 
    'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Sofia', 'Aiden', 'Ella', 'Jackson', 'Liam', 'Emma'];
  
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 
    'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 
    'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Lee', 'Nguyen', 'Chen', 'Patel'];
    
  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

// Helper function to generate a random title
function generateTitle() {
  const titles = [
    'Digital Artist', 'Software Engineer', 'UX Designer', 'Product Manager', 
    'Data Scientist', 'AR/VR Developer', '3D Modeler', 'AI Researcher', 
    'Creative Director', 'Blockchain Developer', 'Game Designer', 'Content Creator',
    'Educator', 'Music Producer', 'Visual Storyteller', 'Web Developer', 
    'Knowledge Engineer', 'Community Builder', 'Systems Architect', 'Immersive Experience Designer'
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}

// Convert latitude and longitude to 3D coordinates
function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lng + 180) * Math.PI / 180;
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// Initialize and setup the 3D scene
function initScene() {
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050A1F); // Dark blue background
  
  // Create camera
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
  camera.position.z = 5;
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: globeCanvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 1);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create orbit controls for camera manipulation
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5;
  controls.minDistance = 3; // Minimum zoom level
  controls.maxDistance = 10; // Maximum zoom level
  
  // Create the globe (wire sphere)
  const globeGeometry = new THREE.SphereGeometry(2, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x1E40AF, // Medium blue color
    wireframe: true,
    opacity: 0.3,
    transparent: true
  });
  globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);
  
  // Add a glow effect (larger transparent sphere)
  const glowGeometry = new THREE.SphereGeometry(2.1, 32, 32);
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0x3B82F6,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glow);
  
  // Create profile nodes
  createProfileNodes();
  
  // Add a raycaster for interaction
  setupInteraction();
  
  // Signal that loading is complete
  isLoading.value = false;
  
  // Start animation loop
  animate();
}

// Create visual nodes for each profile
function createProfileNodes() {
  // Clear any existing profile nodes
  profileNodes.forEach(node => scene.remove(node));
  profileNodes = [];
  
  // Create a reusable geometry for all nodes
  const nodeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
  
  // Create nodes for each profile
  profiles.value.forEach((profile, index) => {
    // Determine node color based on skills
    let nodeColor;
    if (profile.skills.includes('VR/AR') || profile.skills.includes('3D Modeling')) {
      nodeColor = 0x60A5FA; // Blue for technical skills
    } else if (profile.skills.includes('Graphic Design') || profile.skills.includes('UX Design')) {
      nodeColor = 0x8B5CF6; // Purple for design skills
    } else if (profile.skills.includes('AI/ML') || profile.skills.includes('Data Analysis')) {
      nodeColor = 0x34D399; // Green for data skills
    } else {
      nodeColor = 0xF59E0B; // Yellow for other skills
    }
    
    // Create a material with the determined color
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
      color: nodeColor,
      opacity: 0.8,
      transparent: true
    });
    
    // Create the node mesh
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    
    // Position the node on the globe using latitude and longitude
    const position = latLngToVector3(profile.position.lat, profile.position.lng, 2);
    node.position.copy(position);
    
    // Store a reference to the profile data
    node.userData = { profileId: profile.id };
    
    // Add the node to the scene
    scene.add(node);
    profileNodes.push(node);
    
    // Create a pulsing effect for the node
    const pulseScale = 1 + (index % 5) * 0.2; // Variety in pulse
    const pulseSpeed = 0.5 + (index % 3) * 0.2; // Variety in speed
    
    // Store animation properties
    node.userData.animation = {
      pulseScale,
      pulseSpeed,
      time: Math.random() * Math.PI * 2 // Random starting phase
    };
  });
}

// Setup interaction with nodes
function setupInteraction() {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  // Handle mouse click/tap
  globeCanvas.value.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Calculate mouse position in normalized device coordinates
    const rect = globeCanvas.value.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Update the ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Find intersections with profile nodes
    const intersects = raycaster.intersectObjects(profileNodes);
    
    if (intersects.length > 0) {
      // Get the profile ID from the first intersected object
      const profileId = intersects[0].object.userData.profileId;
      
      // Find the matching profile
      const profile = profiles.value.find(p => p.id === profileId);
      
      // Update the selected profile
      if (profile) {
        selectedProfile.value = profile;
        
        // If zoomed in enough, automatically view full profile
        if (zoomLevel.value > 2.2) {
          viewFullProfile(profile);
        }
      }
    } else {
      // Click on empty space closes the profile preview if not clicking on UI elements
      if (!event.target.closest('.profile-preview') && !event.target.closest('button')) {
        selectedProfile.value = null;
      }
    }
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  // Update controls
  if (controls) controls.update();
  
  // Update zoom level based on camera distance
  if (camera) {
    const distance = camera.position.length();
    // Convert distance to zoom level (inverse relationship)
    // When distance is minDistance, zoom is maximum
    // When distance is maxDistance, zoom is minimum
    const minZoom = 0.5;
    const maxZoom = 2.5;
    const normalized = 1 - (distance - controls.minDistance) / (controls.maxDistance - controls.minDistance);
    zoomLevel.value = minZoom + normalized * (maxZoom - minZoom);
  }
  
  // Animate globe rotation
  if (globe) {
    globe.rotation.y += 0.0005; // Slow continuous rotation
  }
  
  // Animate profile nodes
  profileNodes.forEach(node => {
    if (node.userData.animation) {
      const { pulseScale, pulseSpeed, time } = node.userData.animation;
      
      // Update time
      node.userData.animation.time += 0.01 * pulseSpeed;
      
      // Calculate scale based on sin wave
      const scale = 1 + 0.2 * Math.sin(node.userData.animation.time) * pulseScale;
      
      // Apply scale
      node.scale.set(scale, scale, scale);
    }
  });
  
  // Render the scene
  if (renderer) renderer.render(scene, camera);
}

// Handle window resize
function handleResize() {
  if (!renderer || !camera) return;
  
  // Update camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  
  // Update renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Control functions
function zoomIn() {
  if (controls) {
    controls.zoomIn(0.5);
  }
}

function zoomOut() {
  if (controls) {
    controls.zoomOut(0.5);
  }
}

function resetView() {
  if (controls) {
    controls.reset();
  }
}

function viewFullProfile(profile) {
  emit('view-profile', profile.id);
}

// Lifecycle hooks
onMounted(() => {
  // Initialize the 3D scene after a short delay
  // This ensures the DOM is fully rendered
  setTimeout(() => {
    initScene();
    
    // Add window resize handler
    window.addEventListener('resize', handleResize);
    
    // Start the globe with a random rotation
    if (globe) {
      globe.rotation.y = Math.random() * Math.PI * 2;
    }
  }, 100);
});

onUnmounted(() => {
  // Clean up Three.js resources
  if (renderer) {
    renderer.dispose();
  }
  
  if (controls) {
    controls.dispose();
  }
  
  // Remove resize listener
  window.removeEventListener('resize', handleResize);
  
  // Stop animation loop
  if (typeof cancelAnimationFrame !== 'undefined') {
    cancelAnimationFrame(animate);
  }
});
</script>

<style scoped>
.global-view {
  background: radial-gradient(circle at center, #0F172A, #020617);
  transition: all 0.3s ease;
}

.profile-preview {
  transform-origin: bottom;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>