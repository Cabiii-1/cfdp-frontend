<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">I. Disaster Preparedness & Safety</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Disaster preparedness and safety information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Format -->
      <div class="space-y-6">
        <!-- Has HH experienced disaster in last 5 yrs? -->
        <div class="space-y-4">
          <div class="space-y-2">
            <Label class="text-sm font-medium">Has HH experienced disaster in last 5 yrs?</Label>
            <div class="flex items-center space-x-8">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.experienced_disaster_last_5_years"
                  type="radio"
                  :value="true"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Yes</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.experienced_disaster_last_5_years"
                  type="radio"
                  :value="false"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ No</span>
              </label>
            </div>
          </div>

          <!-- Disaster Types (if yes) -->
          <div v-if="formData.experienced_disaster_last_5_years === true" class="space-y-3 ml-4">
            <Label class="text-sm font-medium">Details (for Y response options)</Label>
            <div class="space-y-2">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.disaster_types_experienced.flood"
                  type="checkbox"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Flood</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.disaster_types_experienced.typhoon"
                  type="checkbox"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Typhoon</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.disaster_types_experienced.earthquake"
                  type="checkbox"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Earthquake</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.disaster_types_experienced.landslide"
                  type="checkbox"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Landslide</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.disaster_types_experienced.storm_surges"
                  type="checkbox"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">☐ Storm surges</span>
              </label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="formData.disaster_types_experienced.others"
                    type="checkbox"
                    class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span class="text-sm">☐ Others</span>
                </label>
                <div v-if="formData.disaster_types_experienced.others" class="ml-6">
                  <Input
                    v-model="formData.disaster_types_experienced.others_specify"
                    placeholder="please specify ___________________________"
                    class="h-8 text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Evacuation center accessible? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Evacuation center accessible?</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.evacuation_center_accessible"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.evacuation_center_accessible"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
            </label>
          </div>
        </div>

        <!-- Household has emergency kit? -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Household has emergency kit?</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_has_emergency_kit"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.household_has_emergency_kit"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
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
  get: () => store.formData.disaster_preparedness,
  set: (value) => store.updateStepData('disaster_preparedness', value)
})
</script>