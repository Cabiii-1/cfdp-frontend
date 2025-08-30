<template>
  <div id="app" class="min-h-screen bg-background">
    <Questionnaire 
      v-if="currentView === 'questionnaire'"
      @go-to-review="showReview"
    />
    
    <ReviewSubmit 
      v-else-if="currentView === 'review'"
      @go-back-to-form="showQuestionnaire"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Questionnaire from './pages/Questionnaire.vue'
import ReviewSubmit from './pages/ReviewSubmit.vue'

const currentView = ref('questionnaire')

function showReview() {
  currentView.value = 'review'
}

function showQuestionnaire() {
  currentView.value = 'questionnaire'
}
</script>
