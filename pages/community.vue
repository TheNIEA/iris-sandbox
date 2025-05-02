<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <CommunitySidebar />
    <div class="ml-80 p-6">
      <Title tag="h1">Economy Marketplace</Title>

      <!-- Economy Overview -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
        <Title tag="h2">Closed Economy Network</Title>
        <p class="text-gray-400 mb-4">Access token-gated economies with real market value and limited participation.</p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Total Market Cap</p>
            <p class="font-semibold text-2xl bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">$1.2M</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Transactions</p>
            <p class="font-semibold text-2xl text-blue-400">482</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Asset Types</p>
            <p class="font-semibold text-2xl text-purple-400">132</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Participants</p>
            <p class="font-semibold text-2xl text-pink-400">247</p>
          </div>
        </div>
      </section>

      <!-- Portfolio Card -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
        <Title tag="h2">Your Portfolio</Title>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400 mb-2">Assets</p>
            <ul class="space-y-1">
              <li class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-emerald-400 rounded-full mr-2"></span>
                  <span>Design Templates</span>
                </div>
                <span class="text-emerald-400">$420</span>
              </li>
              <li class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  <span>Brand IP</span>
                </div>
                <span class="text-blue-400">$1,250</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400 mb-2">Resources</p>
            <ul class="space-y-1">
              <li class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  <span>Studio Access</span>
                </div>
                <span class="text-purple-400">$800/mo</span>
              </li>
              <li class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                  <span>Equipment</span>
                </div>
                <span class="text-pink-400">$350/mo</span>
              </li>
            </ul>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Economic Rating</p>
            <p class="font-semibold text-2xl text-emerald-400">87%</p>
            <p class="text-xs text-gray-500">Top 15% of participants</p>
          </div>
          <div class="bg-gray-800/80 p-4 rounded-lg">
            <p class="text-gray-400">Total Value Generated</p>
            <p class="font-semibold text-2xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">$18,300</p>
            <p class="text-xs text-gray-500">Across 4 economies</p>
          </div>
        </div>
      </section>

      <!-- Featured Economies -->
      <section class="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700 p-6">
        <div class="flex justify-between items-center mb-4">
          <Title tag="h2">Featured Economies</Title>
          <span class="text-sm text-gray-400">Early access opportunities</span>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-800/80 p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold text-emerald-400">Innovation Market</p>
              <span class="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs">Token</span>
            </div>
            <div class="space-y-2 mb-3">
              <p class="text-sm text-gray-400">Entry Fee: <span class="text-emerald-300">$150 or 75 IMT</span></p>
              <p class="text-sm text-gray-500">Market Cap: <span class="text-emerald-400">$230,000</span></p>
              <p class="text-sm text-gray-500">Growth Rate: <span class="text-green-400">+24% monthly</span></p>
            </div>
            <Button class="mt-4 w-full">Apply for Membership</Button>
          </div>
          <div class="bg-gray-800/80 p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors">
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold text-blue-400">Design Collective</p>
              <span class="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">Invite</span>
            </div>
            <div class="space-y-2 mb-3">
              <p class="text-sm text-gray-400">Entry: <span class="text-blue-300">Invite + asset contribution</span></p>
              <p class="text-sm text-gray-500">Market Cap: <span class="text-blue-400">$175,000</span></p>
              <p class="text-sm text-gray-500">Growth Rate: <span class="text-green-400">+18% monthly</span></p>
            </div>
            <Button class="mt-4 w-full">Request Invitation</Button>
          </div>
          <div class="bg-gray-800/80 p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div class="flex justify-between items-center mb-2">
              <p class="font-semibold text-purple-400">Tech Trading Network</p>
              <span class="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">Token</span>
            </div>
            <div class="space-y-2 mb-3">
              <p class="text-sm text-gray-400">Entry Fee: <span class="text-purple-300">$500 or 250 TTN</span></p>
              <p class="text-sm text-gray-500">Market Cap: <span class="text-purple-400">$620,000</span></p>
              <p class="text-sm text-gray-500">Growth Rate: <span class="text-green-400">+32% monthly</span></p>
            </div>
            <Button class="mt-4 w-full">Join Waitlist</Button>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="text-center text-xs text-gray-500 mt-12">
        <p class="bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Closed Economies • Token-Gated Value • Real Market Impact</p>
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
