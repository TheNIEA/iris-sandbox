<template>
  <RecordCard
    type="ticket"
    :title="title"
    :user="user"
    :status="status"
    :comment="comment"
    :date="date"
    :showBorder="showBorder"
  >
    <!-- Ticket specific content -->
    <div class="mb-2">
      <div class="text-sm text-gray-400 mb-1">Ticket Details</div>
      <div class="flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <div>
          <span class="text-gray-500">ID:</span>
          <span class="text-white">#{{ id }}</span>
        </div>
        <div v-if="completedDate">
          <span class="text-gray-500">Completed:</span>
          <span class="text-white">{{ completedDate }}</span>
        </div>
        <div v-if="value">
          <span class="text-gray-500">Value Added:</span>
          <span class="text-white">+${{ value }}</span>
        </div>
      </div>
    </div>
  </RecordCard>
</template>

<script setup>
import RecordCard from './RecordCard.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  completedDate: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    default: null
  },
  comment: {
    type: String,
    default: ''
  },
  date: {
    type: [String, Date],
    required: true
  },
  showBorder: {
    type: Boolean,
    default: true
  }
});
</script>