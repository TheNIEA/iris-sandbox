<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <CommunitySidebar />
    <div class="ml-64 p-6">
      <Title tag="h1">Community Marketplace</Title>

      <!-- Community Overview -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
        <Title tag="h2">Community: Creators Hub</Title>
        <p class="text-gray-400 mb-4">A network built on shared skills, assets, and collective opportunity.</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Total Revenue Generated</p>
            <p class="font-semibold text-2xl bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">$1.2M</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Deals Executed</p>
            <p class="font-semibold text-2xl text-blue-400">482</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Collective Assets</p>
            <p class="font-semibold text-2xl text-purple-400">132</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Members</p>
            <p class="font-semibold text-2xl text-pink-400">247</p>
          </div>
        </div>
      </section>

      <!-- Member Profile Card -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
        <Title tag="h2">Your Profile</Title>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400 mb-2">Skills</p>
            <ul class="space-y-1">
              <li class="flex items-center"><span class="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>Graphic Design</li>
              <li class="flex items-center"><span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>Brand Strategy</li>
            </ul>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400 mb-2">Resources</p>
            <ul class="space-y-1">
              <li class="flex items-center"><span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>Studio Space</li>
              <li class="flex items-center"><span class="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>Video Gear</li>
            </ul>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Network Strength</p>
            <p class="font-semibold text-2xl text-emerald-400">87%</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Total Contributions</p>
            <p class="font-semibold text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">$18,300</p>
          </div>
        </div>
      </section>

      <!-- Community Entry & Access -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6">
        <Title tag="h2">Join a Community</Title>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-800/80 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <p class="font-semibold text-emerald-400">Innovators Guild</p>
            <p class="text-sm text-gray-400">Entry Cost: <span class="text-emerald-300">$150</span> / Invite Only</p>
            <p class="text-sm mt-2 text-gray-500">Key Members: <span class="text-emerald-400">@davebuilds</span>, <span class="text-emerald-400">@miaideas</span></p>
            <Button class="mt-4 w-full">Request Access</Button>
          </div>
          <div class="bg-gray-800/80 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <p class="font-semibold text-blue-400">Urban Creatives</p>
            <p class="text-sm text-gray-400">Entry Cost: <span class="text-blue-300">Contribute asset or invite</span></p>
            <p class="text-sm mt-2 text-gray-500">Key Members: <span class="text-blue-400">@urbanjoe</span>, <span class="text-blue-400">@paintqueen</span></p>
            <Button class="mt-4 w-full">Join for Free</Button>
          </div>
          <div class="bg-gray-800/80 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <p class="font-semibold text-purple-400">Tech Co-Op</p>
            <p class="text-sm text-gray-400">Entry Cost: <span class="text-purple-300">$500</span> or Token Grant</p>
            <p class="text-sm mt-2 text-gray-500">Key Members: <span class="text-purple-400">@blockdan</span>, <span class="text-purple-400">@codezilla</span></p>
            <Button class="mt-4 w-full">Apply Now</Button>
          </div>
        </div>
      </section>

      <!-- Footer Philosophy -->
      <footer class="text-center text-xs text-gray-500 mt-12">
        <p class="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Open Source Philosophy • Empower through Access • NetWork = NetWorth</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import CommunitySidebar from '~/components/CommunitySidebar.vue'
// No logic yet – just layout and wording for concept projection
</script>

<style scoped>
/* Optional: add a muted hover or background fade later */
</style>
