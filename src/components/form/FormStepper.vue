<template>
  <div class="w-full mb-4 sm:mb-8" role="navigation" aria-label="Form progress">
    <!-- Progress Bar -->
    <div class="mb-4 sm:mb-6">
      <div class="flex justify-between text-xs sm:text-sm font-medium text-muted-foreground mb-3">
        <span>Step {{ currentStep + 1 }} of {{ totalSteps }}</span>
        <span class="font-semibold text-primary">{{ progressPercentage }}% Complete</span>
      </div>
      <Progress
        :model-value="progressPercentage"
        class="h-2 sm:h-3"
        :aria-label="`${progressPercentage}% complete`"
      />
    </div>

    <!-- Desktop Step Indicators -->
    <div class="hidden lg:block mb-6">
      <div class="flex overflow-x-auto pb-2 gap-1 scrollbar-hide">
        <div 
          v-for="(step, index) in steps" 
          :key="step.key"
          class="flex items-center flex-shrink-0 cursor-pointer group transition-all duration-200"
          @click="goToStep(index)"
          @keydown.enter="goToStep(index)"
          @keydown.space.prevent="goToStep(index)"
          tabindex="0"
          role="button"
          :aria-label="`Go to step ${index + 1}: ${step.title}`"
          :aria-current="index === currentStep.value ? 'step' : undefined"
        >
          <!-- Step Circle -->
          <div 
            class="flex items-center justify-center w-9 h-9 rounded-full border-2 text-xs font-semibold transition-all duration-200 group-hover:scale-110 group-hover:shadow-md group-focus:scale-110 group-focus:shadow-md group-focus:outline-none group-focus:ring-2 group-focus:ring-primary/50"
            :class="getStepClasses(index)"
          >
            <CheckIcon v-if="index < currentStep.value" class="h-4 w-4" />
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Step Label -->
          <div class="ml-3 min-w-0 max-w-32">
            <p 
              class="text-xs font-medium transition-colors leading-tight"
              :class="getStepTextClasses(index)"
            >
              {{ step.title }}
            </p>
          </div>

          <!-- Connecting Line -->
          <div 
            v-if="index < steps.length - 1"
            class="w-6 h-0.5 mx-2 transition-all duration-300"
            :class="index < currentStep.value ? 'bg-primary shadow-sm' : 'bg-border'"
          ></div>
        </div>
      </div>
    </div>

    <!-- Mobile & Tablet Step Indicators -->
    <div class="lg:hidden mb-4 sm:mb-6">
      <!-- Tablet Step Indicators -->
      <div class="hidden md:block lg:hidden mb-6">
        <div class="overflow-x-auto pb-3 scrollbar-hide">
          <div class="flex gap-3 min-w-max px-2">
            <div 
              v-for="(step, index) in steps" 
              :key="step.key"
              class="flex flex-col items-center cursor-pointer group flex-shrink-0 transition-all duration-200"
              @click="goToStep(index)"
              @keydown.enter="goToStep(index)"
              @keydown.space.prevent="goToStep(index)"
              tabindex="0"
              role="button"
              :aria-label="`Go to step ${index + 1}: ${step.title}`"
              :aria-current="index === currentStep.value ? 'step' : undefined"
            >
              <div 
                class="flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-semibold transition-all duration-200 group-hover:scale-110 group-hover:shadow-md group-focus:outline-none group-focus:ring-2 group-focus:ring-primary/50 mb-2"
                :class="getStepClasses(index)"
              >
                <CheckIcon v-if="index < currentStep.value" class="h-3.5 w-3.5" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span 
                class="text-xs font-medium text-center max-w-16 leading-tight"
                :class="getStepTextClasses(index)"
              >
                {{ getShortTitle(step.title) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Step Display -->
      <div class="md:hidden text-center">
        <h2 class="text-lg sm:text-xl font-semibold text-foreground mb-3">
          {{ steps[currentStep.value]?.title }}
        </h2>
        <div class="flex justify-center items-center space-x-2 mb-4">
          <div 
            v-for="(step, index) in steps" 
            :key="step.key"
            class="relative cursor-pointer group"
            @click="goToStep(index)"
            @keydown.enter="goToStep(index)"
            @keydown.space.prevent="goToStep(index)"
            tabindex="0"
            role="button"
            :aria-label="`Go to step ${index + 1}: ${step.title}`"
            :aria-current="index === currentStep.value ? 'step' : undefined"
          >
            <div 
              class="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 group-focus:outline-none group-focus:ring-2 group-focus:ring-primary/50"
              :class="getStepDotClasses(index)"
            ></div>
            <span class="sr-only">Step {{ index + 1 }}: {{ step.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-between items-center pt-4 sm:pt-6 border-t border-border/50 gap-2 sm:gap-4">
      <Button 
        variant="outline" 
        @click="previousStep"
        :disabled="!canGoPrevious"
        size="sm"
        :aria-label="canGoPrevious ? 'Go to previous step' : 'Previous step unavailable'"
      >
        <ChevronLeftIcon class="h-4 w-4" />
        <span class="hidden xs:inline">Previous</span>
        <span class="xs:hidden">Prev</span>
      </Button>

      <!-- Step counter for mobile -->
      <div class="text-center md:hidden">
        <Badge variant="secondary">
          {{ currentStep + 1 }} / {{ totalSteps }}
        </Badge>
      </div>

      <div class="flex items-center gap-2">
        <Button 
          v-if="canGoNext"
          @click="nextStep"
          size="sm"
          aria-label="Go to next step"
        >
          <span class="hidden xs:inline">Next</span>
          <span class="xs:hidden">Next</span>
          <ChevronRightIcon class="h-4 w-4" />
        </Button>
        
        <Button 
          v-else
          @click="goToReview"
          size="sm"
          aria-label="Review and submit form"
        >
          <span class="hidden sm:inline">Review & Submit</span>
          <span class="sm:hidden">Submit</span>
          <CheckIcon class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore'
import Button from '@/components/ui/Button.vue'
import Progress from '@/components/ui/Progress.vue'
import Badge from '@/components/ui/Badge.vue'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const emit = defineEmits(['go-to-review'])

const store = useQuestionnaireStore()

// Don't destructure to maintain reactivity
const currentStep = computed(() => store.currentStep)
const totalSteps = computed(() => store.totalSteps)
const steps = computed(() => store.steps)
const progressPercentage = computed(() => store.progressPercentage)
const canGoNext = computed(() => store.canGoNext)
const canGoPrevious = computed(() => store.canGoPrevious)

// Actions can be destructured safely as they're functions
const { nextStep, previousStep, goToStep } = store

function getStepClasses(index) {
  if (index < currentStep.value) {
    return 'bg-primary text-primary-foreground border-primary shadow-md'
  } else if (index === currentStep.value) {
    return 'bg-background text-primary border-primary border-2 shadow-sm ring-2 ring-primary/20'
  } else {
    return 'bg-background text-muted-foreground border-border hover:border-primary/30 hover:text-primary/70'
  }
}

function getStepTextClasses(index) {
  if (index < currentStep.value) {
    return 'text-primary font-semibold'
  } else if (index === currentStep.value) {
    return 'text-primary font-semibold'
  } else {
    return 'text-muted-foreground group-hover:text-primary/70'
  }
}

function getStepDotClasses(index) {
  if (index < currentStep.value) {
    return 'bg-primary shadow-md'
  } else if (index === currentStep.value) {
    return 'bg-primary shadow-lg ring-2 ring-primary/30'
  } else {
    return 'bg-muted group-hover:bg-primary/30'
  }
}

function getShortTitle(title) {
  // Return shortened version for tablet view
  const shortTitles = {
    'Household Identification': 'Household ID',
    'Head Profile': 'Head Profile',
    'Household Composition': 'Composition',
    'Housing Conditions': 'Housing',
    'Health & Nutrition': 'Health',
    'Education': 'Education',
    'Livelihood & Income': 'Livelihood',
    'Disaster Preparedness': 'Disaster Prep',
    'Cultural Participation': 'Cultural',
    'Feedback & Aspirations': 'Feedback'
  }
  return shortTitles[title] || title.split(' ')[0]
}

function goToReview() {
  emit('go-to-review')
}
</script>