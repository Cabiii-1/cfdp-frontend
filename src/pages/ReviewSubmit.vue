<template>
  <MainLayout>
    <div class="space-y-4 sm:space-y-6">
      <div class="text-center sm:text-left">
        <h1 class="text-2xl sm:text-3xl font-bold text-foreground">Review & Submit</h1>
        <p class="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">Please review your answers before submitting the questionnaire.</p>
      </div>

      <!-- Review Sections -->
      <div class="space-y-4 sm:space-y-6">
        <Card 
          v-for="(section, key) in formSections" 
          :key="key"
          class="p-4 sm:p-6"
        >
          <h3 class="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">{{ section.title }}</h3>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div 
              v-for="(value, field) in section.data" 
              :key="field"
              class="space-y-1 p-2 sm:p-0 rounded-md sm:rounded-none bg-muted/30 sm:bg-transparent"
            >
              <dt class="text-xs sm:text-sm font-medium text-muted-foreground">{{ formatFieldName(field) }}</dt>
              <dd class="text-sm sm:text-base text-foreground break-words">{{ formatFieldValue(value) }}</dd>
            </div>
          </div>
        </Card>
      </div>

      <!-- Action Buttons - Mobile Responsive -->
      <div class="pt-4 sm:pt-6 border-t space-y-3 sm:space-y-0 sm:flex sm:justify-between sm:items-center">
        <Button 
          variant="outline" 
          @click="goBackToForm"
          size="sm"
          class="w-full sm:w-auto flex items-center justify-center gap-2 h-12 sm:h-auto"
        >
          <ChevronLeftIcon class="h-4 w-4" />
          <span class="sm:inline">Back to Form</span>
        </Button>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
          <Button 
            variant="outline" 
            @click="exportData"
            size="sm"
            class="flex items-center justify-center gap-2 h-12 sm:h-auto"
          >
            <DownloadIcon class="h-4 w-4" />
            <span class="hidden xs:inline">Export JSON</span>
            <span class="xs:hidden">Export</span>
          </Button>
          
          <Button 
            @click="submitForm"
            size="sm"
            class="flex items-center justify-center gap-2 h-12 sm:h-auto bg-primary hover:bg-primary/90"
          >
            <CheckIcon class="h-4 w-4" />
            <span class="hidden xs:inline">Submit Questionnaire</span>
            <span class="xs:hidden">Submit</span>
          </Button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore'
import MainLayout from '@/components/layout/MainLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { ChevronLeftIcon, DownloadIcon, CheckIcon } from 'lucide-vue-next'

const emit = defineEmits(['go-back-to-form'])

const store = useQuestionnaireStore()

const formSections = computed(() => {
  const sections = {}
  
  store.steps.forEach(step => {
    const sectionData = store.formData[step.key]
    if (sectionData && Object.keys(sectionData).length > 0) {
      sections[step.key] = {
        title: step.title,
        data: sectionData
      }
    }
  })
  
  return sections
})

function formatFieldName(field) {
  return field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatFieldValue(value) {
  if (value === null || value === undefined || value === '') {
    return 'Not provided'
  }
  
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'None'
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  
  return String(value)
}

function goBackToForm() {
  emit('go-back-to-form')
}

function exportData() {
  const dataStr = store.exportData()
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
  
  const exportFileDefaultName = `cfdp-questionnaire-${new Date().toISOString().split('T')[0]}.json`
  
  const linkElement = document.createElement('a')
  linkElement.setAttribute('href', dataUri)
  linkElement.setAttribute('download', exportFileDefaultName)
  linkElement.click()
}

function submitForm() {
  // This would typically send data to a backend API
  // For now, we'll show an alert
  alert('Questionnaire submitted successfully! In a real application, this would send data to your Laravel backend.')
  
  // Reset form after submission
  store.resetForm()
  emit('go-back-to-form')
}
</script>