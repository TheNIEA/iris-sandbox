<template>
  <RecordCard
    type="assessment"
    :title="skill"
    :user="user"
    :status="rating"
    :comment="comment"
    :date="date"
    :showBorder="showBorder"
  >
    <!-- Assessment specific content -->
    <div class="mb-2">
      <div class="text-sm text-gray-400 mb-1">Value Assessment</div>
      <div class="flex space-x-3 text-sm">
        <div>
          <span class="text-gray-500">Learn:</span>
          <span class="text-white">${{ values.learn }}</span>
        </div>
        <div>
          <span class="text-gray-500">Experience:</span>
          <span class="text-white">${{ values.apply }}</span>
        </div>
        <div>
          <span class="text-gray-500">Master:</span>
          <span class="text-white">${{ values.master }}</span>
        </div>
      </div>
    </div>
  </RecordCard>
</template>

<script setup>
import RecordCard from './RecordCard.vue';

const props = defineProps({
  skill: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  values: {
    type: Object,
    required: true,
    validator: (obj) => {
      return obj.learn !== undefined && 
             obj.apply !== undefined && 
             obj.master !== undefined;
    }
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