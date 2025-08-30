<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">D. Housing & Living Conditions</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Housing and living conditions information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Format -->
      <div class="space-y-6">
        <!-- Type of Dwelling -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Type of Dwelling</Label>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.type_of_dwelling"
                type="radio"
                value="Concrete"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Concrete</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.type_of_dwelling"
                type="radio"
                value="Semi-concrete"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Semi-concrete</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.type_of_dwelling"
                type="radio"
                value="Light Materials"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Light Materials</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.type_of_dwelling"
                type="radio"
                value="Makeshift"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Makeshift</span>
            </label>
          </div>
        </div>

        <!-- Tenure Status -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Tenure Status</Label>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.tenure_status"
                type="radio"
                value="Owned"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Owned</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.tenure_status"
                type="radio"
                value="Rented"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Rented</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.tenure_status"
                type="radio"
                value="Informal"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Informal</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.tenure_status"
                type="radio"
                value="Shared"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Shared</span>
            </label>
          </div>
        </div>

        <!-- Number of Rooms -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Number of Rooms</Label>
          <Input
            v-model.number="formData.number_of_rooms"
            type="number"
            placeholder="_______"
            class="h-10 text-sm w-24"
            min="0"
          />
        </div>

        <!-- Source of Drinking Water -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Source of Drinking Water</Label>
          <div class="flex flex-wrap items-center gap-4 mb-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.source_of_drinking_water"
                type="radio"
                value="Piped"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Piped</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.source_of_drinking_water"
                type="radio"
                value="Deep well"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Deep well</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.source_of_drinking_water"
                type="radio"
                value="Open well"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Open well</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.source_of_drinking_water"
                type="radio"
                value="Spring"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Spring</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.source_of_drinking_water"
                type="radio"
                value="Others"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Others</span>
            </label>
          </div>
          <div v-if="formData.source_of_drinking_water === 'Others'" class="mt-2">
            <Input
              v-model="formData.drinking_water_others_specify"
              placeholder="please specify _________________________"
              class="h-10 text-sm"
            />
          </div>
        </div>

        <!-- Toilet Facility -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Toilet Facility</Label>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.toilet_facility"
                type="radio"
                value="Flush"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Flush</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.toilet_facility"
                type="radio"
                value="Septic"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Septic</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.toilet_facility"
                type="radio"
                value="Open pit"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Open pit</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.toilet_facility"
                type="radio"
                value="None"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ None</span>
            </label>
          </div>
        </div>

        <!-- Lighting Source -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Lighting Source</Label>
          <div class="flex flex-wrap items-center gap-4 mb-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.lighting_source"
                type="radio"
                value="Electricity"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Electricity</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.lighting_source"
                type="radio"
                value="Kerosene"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Kerosene</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.lighting_source"
                type="radio"
                value="Solar"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Solar</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.lighting_source"
                type="radio"
                value="Others"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Others</span>
            </label>
          </div>
          <div v-if="formData.lighting_source === 'Others'" class="mt-2">
            <Input
              v-model="formData.lighting_others_specify"
              placeholder="please specify __________________________"
              class="h-10 text-sm"
            />
          </div>
        </div>

        <!-- Cooking Fuel -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Cooking Fuel</Label>
          <div class="flex flex-wrap items-center gap-4 mb-2">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.cooking_fuel"
                type="radio"
                value="LPG"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ LPG</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.cooking_fuel"
                type="radio"
                value="Charcoal"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Charcoal</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.cooking_fuel"
                type="radio"
                value="Wood"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Wood</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.cooking_fuel"
                type="radio"
                value="Electricity"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Electricity</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.cooking_fuel"
                type="radio"
                value="Others"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Others</span>
            </label>
          </div>
          <div v-if="formData.cooking_fuel === 'Others'" class="mt-2">
            <Input
              v-model="formData.cooking_fuel_others_specify"
              placeholder="please specify ____________________________"
              class="h-10 text-sm"
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
  get: () => store.formData.housing_conditions,
  set: (value) => store.updateStepData('housing_conditions', value)
})
</script>