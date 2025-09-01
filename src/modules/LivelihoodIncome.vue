<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">G. Livelihood & Income</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Income sources and economic activities</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Monthly Household Income Sources -->
      <div class="space-y-6">
        <!-- Income Sources Section -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Monthly Household Income (from the source)</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Farming -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Farming</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.farming"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>

            <!-- Fishing -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Fishing</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.fishing"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>

            <!-- Employment -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Employment</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.employment"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>

            <!-- Business -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Business</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.business"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>

            <!-- Remittances -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Remittances</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.remittances"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>

            <!-- Others -->
            <div class="space-y-2">
              <Label class="text-sm font-medium flex items-center space-x-2">
                <span>Others</span>
              </Label>
              <Input
                v-model.number="formData.monthly_household_income_sources.others"
                type="number"
                placeholder="Amount (₱)"
                class="h-10 text-sm"
                min="0"
              />
            </div>
          </div>
        </div>

        <!-- Financial Questions -->
        <div class="space-y-6 pt-6 border-t">
          <!-- Has Savings -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Does HH have savings?</Label>
            <div class="flex items-center space-x-8">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.has_savings"
                  type="radio"
                  :value="true"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">Yes</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.has_savings"
                  type="radio"
                  :value="false"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">No</span>
              </label>
            </div>
          </div>

          <!-- Access to Micro-credit -->
          <div class="space-y-2">
            <Label class="text-sm font-medium">Does HH has Access to micro-credit/loans facility?</Label>
            <div class="flex items-center space-x-8 mb-4">
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.has_access_to_microcredit"
                  type="radio"
                  :value="true"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">Yes</span>
              </label>
              <label class="flex items-center space-x-2 cursor-pointer">
                <input
                  v-model="formData.has_access_to_microcredit"
                  type="radio"
                  :value="false"
                  class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                />
                <span class="text-sm">No</span>
              </label>
            </div>

            <!-- Credit Type (if yes) -->
            <div v-if="formData.has_access_to_microcredit === true" class="space-y-3 ml-4">
              <Label class="text-sm font-medium">If yes, specify if it is any of the following:</Label>
              <div class="space-y-2">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="formData.credit_type"
                    type="radio"
                    value="Formal (cooperative bank or any other similar financial)"
                    class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span class="text-sm">Formal (cooperative bank or any other similar financial)</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="formData.credit_type"
                    type="radio"
                    value="Informal (from acquaintances, relatives, 5-6, etc.)"
                    class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span class="text-sm">Informal (from acquaintances, relatives, 5-6, etc.)</span>
                </label>
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
  get: () => store.formData.livelihood_income,
  set: (value) => store.updateStepData('livelihood_income', value)
})
</script>