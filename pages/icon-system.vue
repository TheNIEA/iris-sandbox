<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900">
    <div class="container mx-auto px-4 py-16">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-bold text-white mb-6">Icon System</h1>
        <p class="text-blue-300 mb-12">A modular, reusable SVG icon system for consistent UI development</p>
        
        <!-- Icon Showcase Component -->
        <IconShowcase class="mb-12" />
        
        <!-- Usage Examples -->
        <div class="bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-800/30 mb-12">
          <h2 class="text-2xl font-bold text-white mb-6">How to Use</h2>
          
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-blue-300 mb-4">Basic Usage</h3>
            <div class="bg-gray-800/50 p-4 rounded-lg mb-4">
              <pre class="text-sm text-gray-300 font-mono">
import { HomeIcon } from '~/components/ui/icons';

// In your template:
&lt;HomeIcon size="24" /&gt;
              </pre>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-blue-300 mb-4">With Custom Properties</h3>
            <div class="bg-gray-800/50 p-4 rounded-lg mb-4">
              <pre class="text-sm text-gray-300 font-mono">
&lt;HomeIcon 
  size="32"
  title="Go to Homepage"
  strokeWidth="1.5"
  customClass="text-blue-500 hover:text-blue-300" 
/&gt;
              </pre>
            </div>
          </div>
          
          <div class="mb-8">
            <h3 class="text-lg font-semibold text-blue-300 mb-4">Dynamic Icons</h3>
            <div class="bg-gray-800/50 p-4 rounded-lg mb-4">
              <pre class="text-sm text-gray-300 font-mono">
import { DynamicIcon } from '~/components/ui/icons';

// In your template:
&lt;DynamicIcon :name="iconName" size="24" /&gt;
              </pre>
            </div>
            <p class="text-sm text-gray-400">
              This is useful when the icon name is determined at runtime, like when rendering icons based on data.
            </p>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold text-blue-300 mb-4">Available Icons</h3>
            <p class="text-sm text-gray-400 mb-2">
              All icons are exported from <code class="bg-gray-800/70 px-2 py-0.5 rounded">~/components/ui/icons/index.js</code>
            </p>
            <ul class="list-disc list-inside text-sm text-gray-400 grid grid-cols-2 md:grid-cols-3 gap-2">
              <li>HomeIcon</li>
              <li>ChevronDownIcon</li>
              <li>ChevronUpIcon</li>
              <li>ChevronLeftIcon</li>
              <li>ChevronRightIcon</li>
              <li>CloseIcon</li>
              <li>PlusIcon</li>
              <li>MinusIcon</li>
              <li>SearchIcon</li>
              <li>UserIcon</li>
              <li>DocumentIcon</li>
              <li>TicketIcon</li>
              <li>ShareIcon</li>
              <li>DownloadIcon</li>
              <li>GlobeIcon</li>
              <li>CheckIcon</li>
            </ul>
          </div>
        </div>
        
        <!-- Adding New Icons -->
        <div class="bg-gray-900/50 backdrop-blur-md p-6 rounded-xl border border-blue-800/30">
          <h2 class="text-2xl font-bold text-white mb-6">Adding New Icons</h2>
          
          <p class="text-gray-300 mb-4">
            To add a new icon to the system, follow these steps:
          </p>
          
          <ol class="list-decimal list-inside text-sm text-gray-400 space-y-3 mb-6">
            <li>
              Create a new Vue file in <code class="bg-gray-800/70 px-2 py-0.5 rounded">~/components/ui/icons/</code> 
              following the naming pattern <code class="bg-gray-800/70 px-2 py-0.5 rounded">NameIcon.vue</code>
            </li>
            <li>
              Use the base Icon component and provide the appropriate SVG path data
            </li>
            <li>
              Add the icon to <code class="bg-gray-800/70 px-2 py-0.5 rounded">~/components/ui/icons/index.js</code> exports
            </li>
            <li>
              Update the iconMap in the same file to include the new icon
            </li>
          </ol>
          
          <div class="bg-gray-800/50 p-4 rounded-lg">
            <pre class="text-sm text-gray-300 font-mono">
// Example NewIcon.vue
&lt;template&gt;
  &lt;Icon name="new-icon" :title="title || 'New Icon'" :size="size" :view-box="viewBox" :stroke-width="strokeWidth" :custom-class="customClass"&gt;
    &lt;path stroke-linecap="round" stroke-linejoin="round" d="M4 4v16h16" /&gt;
  &lt;/Icon&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Icon from './Icon.vue';

defineProps({
  title: String,
  size: {
    type: [Number, String],
    default: 24
  },
  viewBox: {
    type: String,
    default: '0 0 24 24'
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  },
  customClass: String
});
&lt;/script&gt;
              </pre>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconShowcase from '~/components/ui/IconShowcase.vue';
</script>