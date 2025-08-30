<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">B. Head of the Family/HH Profile</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Information about the household head</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Question and Response Options Table Format -->
      <div class="space-y-6">
        <!-- Name -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Name of Household Head</Label>
          <Input
            v-model="formData.name"
            placeholder="_________________________________"
            class="h-10 text-sm"
          />
          <p class="text-xs text-muted-foreground">(First name, Middle Name, Last Name)</p>
        </div>

        <!-- Sex - Checkbox style -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Sex</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.sex"
                type="radio"
                value="Male"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Male</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.sex"
                type="radio"
                value="Female"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Female</span>
            </label>
          </div>
        </div>

        <!-- Age -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Age</Label>
          <div class="flex items-center space-x-2">
            <Input
              v-model.number="formData.age"
              type="number"
              placeholder="_______"
              class="h-10 text-sm w-24"
              min="0"
              max="120"
            />
            <span class="text-sm">years</span>
          </div>
        </div>

        <!-- Civil Status - Checkbox style -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Civil Status</Label>
          <div class="flex flex-wrap items-center gap-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.civil_status"
                type="radio"
                value="Single"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Single</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.civil_status"
                type="radio"
                value="Married"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Married</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.civil_status"
                type="radio"
                value="Widowed"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Widowed</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.civil_status"
                type="radio"
                value="Separated"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Separated</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.civil_status"
                type="radio"
                value="Cohabiting"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Cohabiting</span>
            </label>
          </div>
        </div>

        <!-- Ethnicity -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Ethnicity</Label>
          <Input
            v-model="formData.ethnicity"
            placeholder="____________________"
            class="h-10 text-sm"
          />
        </div>

        <!-- Religion -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Religion</Label>
          <Input
            v-model="formData.religion"
            placeholder="____________________"
            class="h-10 text-sm"
          />
        </div>

        <!-- Highest Education Attained -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Highest Education Attained</Label>
          <Input
            v-model="formData.highest_education_attained"
            placeholder="____________________"
            class="h-10 text-sm"
          />
        </div>

        <!-- Occupation/Source of Income -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Occupation/Source of Income</Label>
          <Input
            v-model="formData.occupation_source_of_income"
            placeholder="____________________"
            class="h-10 text-sm"
          />
        </div>

        <!-- Monthly Income -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Monthly Income (₱)</Label>
          <Input
            v-model.number="formData.monthly_income"
            type="number"
            placeholder="____________________"
            class="h-10 text-sm"
            min="0"
          />
        </div>

        <!-- PhilHealth Member -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">PhilHealth Member (Y/N)</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.philhealth_member"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.philhealth_member"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
            </label>
          </div>
        </div>

        <!-- 4Ps Beneficiary -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">4Ps Beneficiary (Y/N)</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.fourps_beneficiary"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.fourps_beneficiary"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
            </label>
          </div>
        </div>

        <!-- PCIC Insurance -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">PCIC Insurance (Y/N)</Label>
          <div class="flex items-center space-x-8">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.pcic_insurance"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.pcic_insurance"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
            </label>
          </div>
        </div>

        <!-- Beneficiary of Other Programs -->
        <div class="space-y-2">
          <Label class="text-sm font-medium">Beneficiary of Other Programs (Scholarships, Housing, Livelihood, etc.) (Y/N)</Label>
          <div class="flex items-center space-x-8 mb-3">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.beneficiary_other_programs"
                type="radio"
                :value="true"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ Yes</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input
                v-model="formData.beneficiary_other_programs"
                type="radio"
                :value="false"
                class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
              />
              <span class="text-sm">☐ No</span>
            </label>
          </div>
          
          <div v-if="formData.beneficiary_other_programs === true" class="space-y-2">
            <Label class="text-sm font-medium">If yes, please specify</Label>
            <Input
              v-model="formData.other_programs_specify"
              placeholder="_____________________________________________"
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
  get: () => store.formData.head_profile,
  set: (value) => store.updateStepData('head_profile', value)
})
</script>