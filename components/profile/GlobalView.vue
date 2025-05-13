<template>
  <!-- Changed from a normal div to a fixed position div that takes up the entire viewport -->
  <div class="global-view fixed inset-0 w-screen h-screen">
    <!-- Main canvas container now explicitly set to fill viewport -->
    <div ref="canvasContainer" class="absolute inset-0 w-full h-full">
      <!-- Navigation Back Button (fixed position) -->
      <button @click="$emit('back')" class="absolute top-5 left-5 z-10 p-2 bg-gray-900/70 hover:bg-gray-800/80 rounded-full transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>
      
      <!-- Tutorial for globe view that shows after loading -->
      <div 
        v-if="showTutorial" 
        class="absolute top-16 left-1/2 transform -translate-x-1/2 max-w-md w-11/12 bg-blue-900/30 border border-blue-500/30 rounded-lg p-4 mb-6 z-30"
      >
        <button 
          @click="showTutorial = false"
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
      
      <!-- Loading state while globe initializes -->
      <div v-if="loading" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-20">
        <div class="w-16 h-16 border-4 border-t-blue-500 border-blue-200/20 rounded-full animate-spin mb-4"></div>
        <p class="text-blue-300">Loading global view...</p>
      </div>
      
      <!-- Canvas element where the 3D globe will render -->
      <canvas ref="globeCanvas" class="w-full h-full"></canvas>
      
      <!-- Profile detail popup that appears when clicking a node -->
      <div v-if="selectedProfile" 
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-gray-900/90 backdrop-blur-md rounded-xl border border-blue-500/30 shadow-lg z-30 p-4"
        :style="{ maxWidth: '320px' }"
      >
        <div class="flex items-start">
          <!-- Profile image -->
          <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 mr-4">
            <img :src="selectedProfile.image" :alt="selectedProfile.name" class="w-full h-full object-cover" />
          </div>
          
          <!-- Profile details -->
          <div class="flex-1">
            <h3 class="text-lg font-bold text-white">{{ selectedProfile.name }}</h3>
            <div class="flex items-center text-sm text-blue-300 mb-1">
              <span class="mr-2">{{ selectedProfile.role }}</span>
              <span class="w-1 h-1 bg-blue-500 rounded-full"></span>
              <span class="ml-2">{{ selectedProfile.connections }} connections</span>
            </div>
            <div class="text-xs text-gray-400">
              {{ selectedProfile.location }}
            </div>
          </div>
          
          <!-- Close button -->
          <button @click="selectedProfile = null" class="text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 011.414 0L10 8.586l4.293-4.293a1 1 011.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Skills and contribution -->
        <div class="mt-3 grid grid-cols-2 gap-4">
          <div>
            <div class="text-xs text-gray-500">Top Skills</div>
            <div class="space-y-1 mt-1">
              <div v-for="(skill, index) in selectedProfile.skills.slice(0, 3)" :key="index" class="flex items-center">
                <span class="w-1.5 h-1.5 rounded-full mr-1.5" 
                  :class="skill.category === 'technology' ? 'bg-blue-500' : skill.category === 'design' ? 'bg-purple-500' : 'bg-green-500'"></span>
                <span class="text-xs text-gray-300">{{ skill.name }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="text-xs text-gray-500">Contribution</div>
            <div class="text-lg font-semibold text-blue-400">${{ formatNumber(selectedProfile.contribution) }}</div>
          </div>
        </div>
        
        <!-- Action buttons -->
        <div class="flex space-x-2 mt-3">
          <button @click="viewProfile(selectedProfile.id)" class="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded">
            View Profile
          </button>
          <button class="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 010 2zm0 7a1 1 0 110-2 1 1 010 2zm0 7a1 1 0 110-2 1 1 010 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Controls and legend overlay -->
    <div class="absolute bottom-5 right-5 space-y-2">
      <div class="flex justify-end">
        <div class="bg-gray-900/70 backdrop-blur-md p-2 rounded-lg shadow-lg border border-gray-800">
          <!-- Zoom controls -->
          <div class="flex flex-col space-y-1">
            <button @click="zoomIn" class="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div class="h-px w-full bg-gray-800"></div>
            <button @click="zoomOut" class="p-1.5 hover:bg-gray-800 rounded-md text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end">
        <div class="bg-gray-900/70 backdrop-blur-md p-3 rounded-lg shadow-lg border border-gray-800 max-w-xs">
          <!-- Legend -->
          <div class="text-xs text-gray-500 mb-2">Node Colors</div>
          <div class="space-y-1.5">
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span class="text-xs text-gray-300">Technology Skills</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span class="text-xs text-gray-300">Design Skills</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              <span class="text-xs text-gray-300">Business Skills</span>
            </div>
          </div>
          
          <div class="mt-3">
            <div class="text-xs text-gray-500 mb-1">Node Size</div>
            <div class="flex items-center">
              <div class="flex items-center justify-between w-full">
                <div class="flex items-center">
                  <div class="w-2 h-2 bg-white rounded-full mr-1.5"></div>
                  <span class="text-xs text-gray-400">Lower</span>
                </div>
                <div class="w-16 h-px bg-gradient-to-r from-gray-600 to-gray-400"></div>
                <div class="flex items-center">
                  <div class="w-4 h-4 bg-white rounded-full mr-1.5"></div>
                  <span class="text-xs text-gray-400">Higher</span>
                </div>
              </div>
            </div>
            <div class="mt-1 text-xs text-gray-500">Contribution Value</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { formatNumber } from '~/utils/formatter';

// Define emits
const emit = defineEmits(['back', 'view-profile']);

// State variables
const canvasContainer = ref(null);
const globeCanvas = ref(null);
const loading = ref(true);
const selectedProfile = ref(null);
const showTutorial = ref(false); // Added state for tutorial visibility

// Three.js variables
let scene, camera, renderer, controls;
let globe, nodes = [];
let raycaster, mouse;

// For profile data
const profilesData = ref([]);

// Fetch data from API
const fetchProfiles = async () => {
  try {
    // In a real implementation, this would call an API
    // const response = await fetch('/api/profiles');
    // profilesData.value = await response.json();
    
    // For now, we'll just use an empty array to be populated later
    profilesData.value = [];
    return profilesData.value;
  } catch (error) {
    console.error('Failed to fetch profiles:', error);
    return [];
  }
};

// Initialize Three.js scene
const initScene = () => {
  // Initialize scene, camera, renderer
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x050A1F); // Dark blue background
  
  // Use window dimensions instead of container dimensions
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 10;
  
  renderer = new THREE.WebGLRenderer({
    canvas: globeCanvas.value,
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  
  // Initialize orbit controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 6;
  controls.maxDistance = 15;
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Initialize raycaster for interaction
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  // Create globe
  createGlobe();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize);
  
  // Handle mouse movement for interactivity
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('click', onMouseClick);
  
  // Start animation loop
  animate();
};

// Create globe mesh
const createGlobe = () => {
  // Create wireframe sphere for the globe
  const geometry = new THREE.SphereGeometry(4, 32, 32);
  const material = new THREE.MeshBasicMaterial({
    color: 0x1a365d, // Dark blue color
    wireframe: true,
    transparent: true,
    opacity: 0.3
  });
  
  globe = new THREE.Mesh(geometry, material);
  scene.add(globe);
  
  // Add subtle glow
  const glowGeometry = new THREE.SphereGeometry(4.1, 32, 32);
  const glowMaterial = new THREE.ShaderMaterial({
    uniforms: {
      c: { value: 0.2 },
      p: { value: 4.5 },
      glowColor: { value: new THREE.Color(0x3b82f6) },
      viewVector: { value: camera.position }
    },
    vertexShader: `
      uniform vec3 viewVector;
      uniform float c;
      uniform float p;
      varying float intensity;
      void main() {
        vec3 vNormal = normalize(normalMatrix * normal);
        vec3 vNormel = normalize(normalMatrix * viewVector);
        intensity = pow(c - dot(vNormal, vNormel), p);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      varying float intensity;
      void main() {
        gl_FragColor = vec4(glowColor, intensity * 0.3);
      }
    `,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
  const glow = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glow);
  
  // Add mock profile nodes since we don't have real data
  createMockProfileNodes();
  
  const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
  scene.add(glowMesh);
};

// Create mock profile data and nodes
const createMockProfileNodes = () => {
  // Create mock profile data
  const mockProfiles = [
    {
      id: '1',
      name: 'Maya Johnson',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'UX Designer',
      connections: 128,
      location: 'San Francisco, CA',
      primarySkillCategory: 'design',
      contribution: 35000,
      skills: [
        { name: 'UI Design', category: 'design' },
        { name: 'Wireframing', category: 'design' },
        { name: 'Prototyping', category: 'design' }
      ]
    },
    {
      id: '2',
      name: 'Alex Chen',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'Full Stack Developer',
      connections: 95,
      location: 'Austin, TX',
      primarySkillCategory: 'technology',
      contribution: 42000,
      skills: [
        { name: 'React', category: 'technology' },
        { name: 'Node.js', category: 'technology' },
        { name: 'MongoDB', category: 'technology' }
      ]
    },
    {
      id: '3',
      name: 'Khoury Howell',
      image: 'https://s3.us-east-2.amazonaws.com/theniea.com/khouryhowell_pfp.jpeg',
      role: 'Social Economics',
      connections: 132,
      location: 'Detroit, MI',
      primarySkillCategory: 'business',
      contribution: 38000,
      skills: [
        { name: 'VR/AR', category: 'technology' },
        { name: 'AI/LLMs', category: 'technology' },
        { name: '3D Modeling', category: 'design' }
      ]
    },
    {
      id: '4',
      name: 'Sarah Williams',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      role: 'Data Scientist',
      connections: 76,
      location: 'Boston, MA',
      primarySkillCategory: 'technology',
      contribution: 51000,
      skills: [
        { name: 'Machine Learning', category: 'technology' },
        { name: 'Python', category: 'technology' },
        { name: 'Data Visualization', category: 'technology' }
      ]
    },
    {
      id: '5',
      name: 'Marcus Lee',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      role: 'Product Manager',
      connections: 112,
      location: 'New York, NY',
      primarySkillCategory: 'business',
      contribution: 47000,
      skills: [
        { name: 'Strategy', category: 'business' },
        { name: 'Market Research', category: 'business' },
        { name: 'Agile', category: 'business' }
      ]
    }
  ];
  
  // Add mock profiles to our data store
  profilesData.value = mockProfiles;
  
  // Create nodes for mock profiles
  createNodes(mockProfiles);
};

// Position nodes on the globe based on real data
const createNodes = (profiles) => {
  // Clear existing nodes
  nodes.forEach(node => {
    scene.remove(node);
  });
  nodes = [];
  
  // Create a node for each profile
  profiles.forEach((profile, index) => {
    // Calculate node position on the globe using spherical coordinates
    // In a real implementation, this would be based on meaningful criteria like skill categories
    const phi = Math.acos(-1 + (2 * index) / profiles.length); // Latitude
    const theta = Math.sqrt(profiles.length * Math.PI) * phi; // Longitude
    
    // Convert spherical coordinates to Cartesian
    const radius = 4; // Matches globe radius
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    
    // Determine node color based on primary skill category
    let color;
    switch (profile.primarySkillCategory) {
      case 'technology':
        color = 0x3b82f6; // Blue
        break;
      case 'design':
        color = 0xa855f7; // Purple
        break;
      default:
        color = 0x10b981; // Green for business/other
    }
    
    // Determine node size based on contribution value
    const maxContribution = Math.max(...profiles.map(p => p.contribution));
    const minSize = 0.05;
    const maxSize = 0.15;
    const size = minSize + (maxSize - minSize) * (profile.contribution / maxContribution);
    
    // Create node geometry
    const nodeGeometry = new THREE.SphereGeometry(size, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color });
    const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
    
    // Position node
    node.position.set(x, y, z);
    node.userData = { 
      profileId: profile.id,
      animation: {
        pulseScale: Math.random() * 0.5 + 0.5, // Random pulse intensity
        pulseSpeed: Math.random() * 0.5 + 0.8, // Random pulse speed
        time: Math.random() * Math.PI * 2 // Random starting phase
      }
    }; // Store reference to profile and animation parameters
    
    // Add the node to the scene
    scene.add(node);
    nodes.push(node);
  });
};

// Handle window resize - Updated to use window dimensions
const onWindowResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

// Handle mouse movement for hover effects
const onMouseMove = (event) => {
  // Calculate mouse position in normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
};

// Handle mouse click for selection
const onMouseClick = (event) => {
  // Calculate mouse position in normalized device coordinates
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  // Update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  
  // Calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(nodes);
  
  if (intersects.length > 0) {
    const clickedNode = intersects[0].object;
    const profileId = clickedNode.userData.profileId;
    const profile = profilesData.value.find(p => p.id === profileId);
    
    if (profile) {
      selectedProfile.value = profile;
    }
  } else {
    // Clicked empty space, clear selection
    selectedProfile.value = null;
  }
};

// Animation loop
const animate = () => {
  requestAnimationFrame(animate);
  
  // Update controls
  if (controls) controls.update();
  
  // Slowly rotate the globe
  if (globe) {
    globe.rotation.y += 0.0005;
  }
  
  // Animate profile nodes
  nodes.forEach(node => {
    if (node.userData && node.userData.animation) {
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
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};

// Navigation functions
const zoomIn = () => {
  if (controls && controls.minDistance < controls.maxDistance) {
    camera.position.z = Math.max(camera.position.z - 1, controls.minDistance);
    controls.update();
  }
};

const zoomOut = () => {
  if (controls && controls.maxDistance > controls.minDistance) {
    camera.position.z = Math.min(camera.position.z + 1, controls.maxDistance);
    controls.update();
  }
};

// Function to handle viewing a profile in detail
const viewProfile = (profileId) => {
  emit('view-profile', profileId);
};

// Initialize component
onMounted(async () => {
  try {
    // Force an immediate resize to take full viewport
    document.body.style.overflow = 'hidden'; // Prevent scrollbars
    
    // Initialize the 3D scene
    initScene();
    
    // Loading complete (moved inside try/catch to ensure it's set even if there's an error)
    setTimeout(() => {
      loading.value = false;
      // Show tutorial after loading is complete
      showTutorial.value = true;
    }, 800);
  } catch (error) {
    console.error("Error initializing GlobalView:", error);
    loading.value = false; // Ensure loading is set to false even if there's an error
  }
});

onUnmounted(() => {
  // Restore normal scrolling
  document.body.style.overflow = '';
  
  // Remove event listeners
  window.removeEventListener('resize', onWindowResize);
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('click', onMouseClick);
  
  // Dispose of Three.js resources
  if (renderer) {
    renderer.dispose();
  }
  
  if (controls) {
    controls.dispose();
  }
  
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
  globe = null;
  nodes = [];
});
</script>

<style scoped>
.global-view {
  position: fixed; /* Changed from relative to fixed */
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  z-index: 50; /* Ensure it appears above other content */
}
</style>