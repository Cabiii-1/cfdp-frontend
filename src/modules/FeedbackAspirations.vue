<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">K. Feedback & Aspirations</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Feedback and aspirations information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Format -->
      <div class="space-y-6">
        <!-- Top 3 Needs -->
        <div class="space-y-4">
          <Label class="text-sm font-medium">What is your family's top 3 needs which you want your Provincial Government to address?</Label>
          
          <div class="space-y-3">
            <div class="space-y-1">
              <Label class="text-xs font-medium">1.</Label>
              <Input
                v-model="formData.family_top_3_needs.need_1"
                
                class="h-10 text-sm"
              />
            </div>
            
            <div class="space-y-1">
              <Label class="text-xs font-medium">2.</Label>
              <Input
                v-model="formData.family_top_3_needs.need_2"
                
                class="h-10 text-sm"
              />
            </div>
            
            <div class="space-y-1">
              <Label class="text-xs font-medium">3.</Label>
              <Input
                v-model="formData.family_top_3_needs.need_3"
                
                class="h-10 text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Programs Expected -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">What programs do you expect from Provincial Government?</Label>
          <textarea
            v-model="formData.programs_expected_from_provincial_government"
            
            class="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows="4"
          ></textarea>
        </div>

        <!-- Inclusion in Government Planning -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Do you feel your family is included in government planning?</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_included_in_government_planning"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_included_in_government_planning"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
        </div>

        <!-- End of Questionnaire -->
        <div class="pt-6 border-t text-center">
          <p class="text-sm text-muted-foreground font-medium">(End of Questionnaire)</p>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useQuestionnaireStore } from '@/store/useQuestionnaireStore'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'

const store = useQuestionnaireStore()

const formData = computed({
  get: () => store.formData.feedback_aspirations,
  set: (value) => store.updateStepData('feedback_aspirations', value)
})
</script>