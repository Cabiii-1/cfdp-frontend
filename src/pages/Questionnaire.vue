<template>
  <MainLayout>
    <div class="space-y-6">
      <FormStepper @go-to-review="goToReview" />
      
      <!-- Dynamic Component for Current Step -->
      <div class="mt-8">
        <component :is="currentComponent" />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore'
import MainLayout from '@/components/layout/MainLayout.vue'
import FormStepper from '@/components/form/FormStepper.vue'

// Import all module components
import HouseholdIdentification from '@/modules/HouseholdIdentification.vue'
import HeadProfile from '@/modules/HeadProfile.vue'
import HouseholdComposition from '@/modules/HouseholdComposition.vue'
import HousingConditions from '@/modules/HousingConditions.vue'
import HealthNutrition from '@/modules/HealthNutrition.vue'
import Education from '@/modules/Education.vue'
import LivelihoodIncome from '@/modules/LivelihoodIncome.vue'
import DisasterPreparedness from '@/modules/DisasterPreparedness.vue'
import CulturalParticipation from '@/modules/CulturalParticipation.vue'
import FeedbackAspirations from '@/modules/FeedbackAspirations.vue'

const emit = defineEmits(['go-to-review'])

const store = useQuestionnaireStore()

const componentMap = {
  HouseholdIdentification,
  HeadProfile,
  HouseholdComposition,
  HousingConditions,
  HealthNutrition,
  Education,
  LivelihoodIncome,
  DisasterPreparedness,
  CulturalParticipation,
  FeedbackAspirations
}

const currentComponent = computed(() => {
  const stepInfo = store.currentStepInfo
  return componentMap[stepInfo.component] || HouseholdIdentification
})

function goToReview() {
  emit('go-to-review')
}
</script>"}