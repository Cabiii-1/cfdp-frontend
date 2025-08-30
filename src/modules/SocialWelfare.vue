<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">H. Social Welfare & Services</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Social welfare and services information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Reference Note as per DOCX -->
      <div class="space-y-4">
        <div class="p-4 bg-muted rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Data Reference</h3>
          <p class="text-sm text-muted-foreground">
            {{ formData.note }}
          </p>
        </div>

        <!-- Additional information display -->
        <div class="space-y-4">
          <h4 class="text-base font-medium">Summary of Social Welfare Information</h4>
          <p class="text-sm text-muted-foreground">
            The social welfare and services information is collected from the Head of Family profile 
            (Section B) and Household Composition (Section C), which include details about:
          </p>
          <ul class="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-4">
            <li>PhilHealth membership status</li>
            <li>4Ps beneficiary status</li>
            <li>PCIC Insurance coverage</li>
            <li>Other government program participation</li>
            <li>Specific programs and scholarships received</li>
          </ul>
          
          <div class="mt-6 p-3 border-l-4 border-primary bg-primary/5 rounded-r-lg">
            <p class="text-sm">
              <strong>Note:</strong> All relevant social welfare data has been captured in the previous sections 
              and will be automatically included in the final report compilation.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore'
import Card from '@/components/ui/Card.vue'

const store = useQuestionnaireStore()

const formData = computed({
  get: () => store.formData.social_welfare,
  set: (value) => store.updateStepData('social_welfare', value)
})
</script>