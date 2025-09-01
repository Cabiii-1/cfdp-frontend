<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">E. Health & Nutrition</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Health and nutrition information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Format -->
      <div class="space-y-6">
        <!-- Any family member with disability? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Any family member with disability?</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_member_with_disability"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_member_with_disability"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
          
          <div v-if="formData.family_member_with_disability === true" class="space-y-2">
            <Label class="text-sm font-medium">If yes, please specify</Label>
            <Input
              v-model="formData.disability_specify"
              
              class="h-10 text-sm"
            />
          </div>
        </div>

        <!-- Any family member with chronic illness? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Any family member with chronic illness?</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_member_with_chronic_illness"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.family_member_with_chronic_illness"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
          
          <div v-if="formData.family_member_with_chronic_illness === true" class="space-y-2">
            <Label class="text-sm font-medium">If yes, please specify</Label>
            <Input
              v-model="formData.chronic_illness_specify"
              
              class="h-10 text-sm"
            />
          </div>
        </div>

        <!-- Children (0–5 yrs) fully immunized? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Children (0–5 yrs) fully immunized?</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.children_0_5_fully_immunized"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.children_0_5_fully_immunized"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
        </div>

        <!-- Pregnant women in household? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Pregnant women in household?</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.pregnant_women_in_household"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.pregnant_women_in_household"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
        </div>

        <!-- Nutrition Status of Children (0–12 yrs) -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Nutrition Status of Children (0–12 yrs)</Label>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.nutrition_status_children_0_12"
                type="radio"
                value="Normal"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Normal</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.nutrition_status_children_0_12"
                type="radio"
                value="Underweight"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Underweight</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.nutrition_status_children_0_12"
                type="radio"
                value="Severely Underweight"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Severely Underweight</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.nutrition_status_children_0_12"
                type="radio"
                value="Overweight"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Overweight</span>
            </label>
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
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'

const store = useQuestionnaireStore()

const formData = computed({
  get: () => store.formData.health_nutrition,
  set: (value) => store.updateStepData('health_nutrition', value)
})
</script>