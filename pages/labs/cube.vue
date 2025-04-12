<template>
    <div class="container">
      <div class="canvas-container" ref="container"></div>
      
      <div class="input-area">
        <input 
          v-model="userInput" 
          @keyup.enter="updateCube" 
          placeholder="Enter text to update the cube..." 
          class="input-field"
        />
        <button @click="updateCube" class="update-button">Update Cube</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  
  export default {
    name: 'ThreeJsCube',
    setup() {
      const container = ref(null);
      const userInput = ref('');
      
      // Three.js variables
      let scene, camera, renderer, cube, controls;
      let animating = false;
      const cubeTexts = ['Front', 'Back', 'Top', 'Bottom', 'Left', 'Right'];
      const cubeMaterials = [];
      
      // Initialize Three.js scene
      const initThree = () => {
        // Create scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x121212);
        
        // Create camera
        camera = new THREE.PerspectiveCamera(
          75,
          container.value.clientWidth / container.value.clientHeight,
          0.1,
          1000
        );
        camera.position.z = 5;
        
        // Create renderer
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
        container.value.appendChild(renderer.domElement);
        
        // Set up controls
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        // Create cube with text on each face
        createCube(cubeTexts);
        
        // Handle window resize
        window.addEventListener('resize', onWindowResize);
        
        // Start animation loop
        animate();
      };
      
      // Create cube with text or content on each face
      const createCube = (texts) => {
        // Create materials for each face with text
        cubeMaterials.length = 0;
        
        // Colors for each face
        const colors = [
          0x3498db, // blue
          0xe74c3c, // red
          0x2ecc71, // green
          0xf1c40f, // yellow
          0x9b59b6, // purple
          0xe67e22  // orange
        ];
        
        for (let i = 0; i < 6; i++) {
          const canvas = document.createElement('canvas');
          canvas.width = 256;
          canvas.height = 256;
          const context = canvas.getContext('2d');
          
          // Fill background
          context.fillStyle = `#${colors[i].toString(16).padStart(6, '0')}`;
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          // Add text
          context.font = '32px Arial';
          context.fillStyle = 'white';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          
          // Break text into lines if needed
          const text = texts[i] || `Face ${i+1}`;
          const lines = wrapText(text, 230);
          const lineHeight = 40;
          const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
          
          lines.forEach((line, index) => {
            context.fillText(line, canvas.width / 2, startY + index * lineHeight);
          });
          
          const texture = new THREE.CanvasTexture(canvas);
          cubeMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
        }
        
        // Create cube geometry and mesh
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        
        // If cube already exists, remove it
        if (cube) {
          scene.remove(cube);
        }
        
        cube = new THREE.Mesh(geometry, cubeMaterials);
        scene.add(cube);
      };
      
      // Wrap text to fit within the cube face
      const wrapText = (text, maxWidth) => {
        if (!text) return [''];
        
        // For simple implementation, just split at a reasonable length
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        words.forEach(word => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          if (testLine.length * 10 < maxWidth) {
            currentLine = testLine;
          } else {
            lines.push(currentLine);
            currentLine = word;
          }
        });
        
        if (currentLine) {
          lines.push(currentLine);
        }
        
        // Limit to 6 lines max
        return lines.slice(0, 6);
      };
      
      // Handle window resize
      const onWindowResize = () => {
        if (!container.value) return;
        
        camera.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);
      };
      
      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        
        controls.update();
        
        // If animating, rotate the cube
        if (animating) {
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
        }
        
        renderer.render(scene, camera);
      };
      
      // Update cube based on user input
      const updateCube = () => {
        if (!userInput.value.trim()) return;
        
        // Start animation
        animating = true;
        
        // Create content for each face based on input
        const inputWords = userInput.value.split(/\s+/);
        const newTexts = [];
        
        // Different ways to transform the input for each face
        newTexts.push(userInput.value); // Front: Original input
        newTexts.push(userInput.value.split('').reverse().join('')); // Back: Reversed
        newTexts.push(inputWords.sort().join(' ')); // Top: Alphabetical
        newTexts.push(userInput.value.toUpperCase()); // Bottom: Uppercase
        newTexts.push(inputWords.slice(0, Math.ceil(inputWords.length / 2)).join(' ')); // Left: First half
        newTexts.push(inputWords.slice(Math.ceil(inputWords.length / 2)).join(' ')); // Right: Second half
        
        // Update cube with new content
        setTimeout(() => {
          createCube(newTexts);
          
          // Stop animation after a short delay
          setTimeout(() => {
            animating = false;
          }, 2000);
        }, 1000);
      };
      
      // Initialize on component mount
      onMounted(() => {
        if (container.value) {
          initThree();
        }
      });
      
      // Clean up on component unmount
      onBeforeUnmount(() => {
        window.removeEventListener('resize', onWindowResize);
        
        if (renderer) {
          renderer.dispose();
        }
        
        if (cube) {
          cube.geometry.dispose();
          cubeMaterials.forEach(material => {
            if (material.map) material.map.dispose();
            material.dispose();
          });
        }
        
        if (controls) {
          controls.dispose();
        }
      });
      
      return {
        container,
        userInput,
        updateCube
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
  
  .canvas-container {
    flex: 1;
    background-color: #121212;
    overflow: hidden;
  }
  
  .input-area {
    display: flex;
    padding: 1rem;
    background-color: #2c3e50;
    gap: 0.5rem;
  }
  
  .input-field {
    flex: 1;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .update-button {
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .update-button:hover {
    background-color: #3aa876;
  }
  </style>