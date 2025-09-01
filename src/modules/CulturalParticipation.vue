<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">J. Cultural & Community Participation</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Cultural and community participation information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Format -->
      <div class="space-y-6">
        <!-- Member of any community organization? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Member of any community organization?</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.member_of_community_organization"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.member_of_community_organization"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
          
          <div v-if="formData.member_of_community_organization === true" class="space-y-2">
            <Label class="text-sm font-medium">If yes, please specify:</Label>
            <Input
              v-model="formData.community_organization_specify"
              
              class="h-10 text-sm max-w-xs"
            />
          </div>
        </div>

        <!-- Household visits provincial museum? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Household visits provincial museum?</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_visits_provincial_museum"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_visits_provincial_museum"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
          
          <div v-if="formData.household_visits_provincial_museum === true" class="space-y-2">
            <Label class="text-sm font-medium">Frequency:</Label>
            <Input
              v-model="formData.museum_visit_frequency"
              
              class="h-10 text-sm max-w-xs"
            />
          </div>
        </div>

        <!-- Household visits provincial library? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Household visits provincial library?</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_visits_provincial_library"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_visits_provincial_library"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">No</span>
            </label>
          </div>
          
          <div v-if="formData.household_visits_provincial_library === true" class="space-y-2">
            <Label class="text-sm font-medium">Frequency:</Label>
            <Input
              v-model="formData.library_visit_frequency"
              
              class="h-10 text-sm max-w-xs"
            />
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
  get: () => store.formData.cultural_participation,
  set: (value) => store.updateStepData('cultural_participation', value)
})
</script>