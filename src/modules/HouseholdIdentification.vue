<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">A. Household Identification</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Basic household information and identification details</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Header Information -->
      <div class="mb-6 p-4 bg-muted rounded-lg">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="space-y-1">
            <Label for="barangay_code" class="text-sm font-medium">Barangay Code:</Label>
            <Input
              id="barangay_code"
              v-model="formData.barangay_code"
              
              class="h-10 text-sm"
            />
          </div>
          <div class="space-y-1">
            <Label for="enumerator" class="text-sm font-medium">Enumerator:</Label>
            <Input
              id="enumerator"
              v-model="formData.enumerator"
              
              class="h-10 text-sm"
            />
          </div>
          <div class="space-y-1">
            <Label for="supervisor" class="text-sm font-medium">Supervisor:</Label>
            <Input
              id="supervisor"
              v-model="formData.supervisor"
              
              class="h-10 text-sm"
            />
          </div>
        </div>
        <div class="mt-4">
          <Label for="date_accomplished" class="text-sm font-medium">Date accomplished:</Label>
          <Input
            id="date_accomplished"
            v-model="formData.date_accomplished"
            type="date"
            class="h-10 text-sm max-w-xs"
          />
        </div>
      </div>

      <!-- Suggested Fields Table matching DOCX -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold mb-4">Suggested Fields</h3>
        
        <!-- Grid layout matching the DOCX table -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="household_id_number" class="text-sm font-medium">Household ID Number</Label>
              <Input
                id="household_id_number"
                v-model="formData.household_id_number"
                
                class="h-10 text-sm"
              />
            </div>

            <div class="space-y-2">
              <Label for="barangay" class="text-sm font-medium">Barangay</Label>
              <Input
                id="barangay"
                v-model="formData.barangay"
                
                class="h-10 text-sm"
              />
            </div>

            <div class="space-y-2">
              <Label for="municipality" class="text-sm font-medium">Municipality</Label>
              <Input
                id="municipality"
                v-model="formData.municipality"
                
                class="h-10 text-sm"
              />
            </div>
          </div>

          <div class="space-y-4">
            <div class="space-y-2">
              <Label for="legislative_district" class="text-sm font-medium">Legislative District</Label>
              <select
                id="legislative_district"
                v-model="formData.legislative_district"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select district</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div class="space-y-2">
              <Label for="enumerator_name" class="text-sm font-medium">Enumerator's Name</Label>
              <Input
                id="enumerator_name"
                v-model="formData.enumerator_name"
                
                class="h-10 text-sm"
              />
            </div>

            <div class="space-y-2">
              <Label for="date_of_interview" class="text-sm font-medium">Date of Interview</Label>
              <div class="flex items-center space-x-2">
                <Input
                  v-model="formData.date_of_interview"
                  
                  class="h-10 text-sm"
                />
                <span class="text-sm text-muted-foreground">Format: MM / DD / 2025</span>
              </div>
            </div>
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
  get: () => store.formData.household_identification,
  set: (value) => store.updateStepData('household_identification', value)
})
</script>