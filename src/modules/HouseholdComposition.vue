<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">C. Household Composition</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Information about all household members</p>
      <p class="text-xs text-muted-foreground mt-2">(Enumerator to list ALL household members)</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- Table Header -->
      <div class="mb-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Household Members</h3>
          <Button @click="addMember" size="sm" class="text-sm">
            + Add Member
          </Button>
        </div>
      </div>

      <!-- Desktop Table View -->
      <div class="hidden lg:block overflow-x-auto">
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr class="bg-muted">
              <th class="border border-gray-300 p-2 text-xs font-medium">Full Name</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Relationship to HH Head</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Age</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Sex</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Civil Status</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Highest Education Attained</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Occupation/Source of Income</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Monthly Income (₱)</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">PhilHealth Member (Y/N)</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">4Ps Beneficiary (Y/N)</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Beneficiary of Other Programs (Y/N)(specify if Y)</th>
              <th class="border border-gray-300 p-2 text-xs font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(member, index) in formData" :key="index" class="hover:bg-muted/50">
              <td class="border border-gray-300 p-1">
                <Input v-model="member.full_name" class="h-8 text-xs border-0" placeholder="Full name" />
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model="member.relationship_to_hh_head" class="h-8 text-xs border-0" placeholder="Relationship" />
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model.number="member.age" type="number" class="h-8 text-xs border-0 w-16" placeholder="Age" min="0" />
              </td>
              <td class="border border-gray-300 p-1">
                <select v-model="member.sex" class="h-8 text-xs border-0 bg-transparent w-full">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model="member.civil_status" class="h-8 text-xs border-0" placeholder="Status" />
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model="member.highest_education_attained" class="h-8 text-xs border-0" placeholder="Education" />
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model="member.occupation_source_of_income" class="h-8 text-xs border-0" placeholder="Occupation" />
              </td>
              <td class="border border-gray-300 p-1">
                <Input v-model.number="member.monthly_income" type="number" class="h-8 text-xs border-0 w-20" placeholder="Income" min="0" />
              </td>
              <td class="border border-gray-300 p-1">
                <select v-model="member.philhealth_member" class="h-8 text-xs border-0 bg-transparent w-full">
                  <option :value="null">Select</option>
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </td>
              <td class="border border-gray-300 p-1">
                <select v-model="member.fourps_beneficiary" class="h-8 text-xs border-0 bg-transparent w-full">
                  <option :value="null">Select</option>
                  <option :value="true">Yes</option>
                  <option :value="false">No</option>
                </select>
              </td>
              <td class="border border-gray-300 p-1">
                <div class="space-y-1">
                  <select v-model="member.beneficiary_other_programs" class="h-8 text-xs border-0 bg-transparent w-full">
                    <option :value="null">Select</option>
                    <option :value="true">Yes</option>
                    <option :value="false">No</option>
                  </select>
                  <Input v-if="member.beneficiary_other_programs === true" v-model="member.other_programs_specify" class="h-6 text-xs border-0" placeholder="Specify" />
                </div>
              </td>
              <td class="border border-gray-300 p-1">
                <Button @click="removeMember(index)" size="sm" variant="destructive" class="h-6 w-6 p-0">
                  ×
                </Button>
              </td>
            </tr>
            <!-- Empty state -->
            <tr v-if="formData.length === 0">
              <td colspan="12" class="border border-gray-300 p-4 text-center text-muted-foreground">
                No household members added yet. Click "Add Member" to start.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="lg:hidden space-y-4">
        <div v-for="(member, index) in formData" :key="index" class="border rounded-lg p-4 space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-medium text-sm">Member {{ index + 1 }}</h4>
            <Button @click="removeMember(index)" size="sm" variant="destructive" class="h-6 w-6 p-0">
              ×
            </Button>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div class="space-y-1">
              <Label class="text-xs font-medium">Full Name</Label>
              <Input v-model="member.full_name" class="h-8 text-xs" placeholder="Full name" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Relationship to HH Head</Label>
              <Input v-model="member.relationship_to_hh_head" class="h-8 text-xs" placeholder="Relationship" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Age</Label>
              <Input v-model.number="member.age" type="number" class="h-8 text-xs" placeholder="Age" min="0" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Sex</Label>
              <select v-model="member.sex" class="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Civil Status</Label>
              <Input v-model="member.civil_status" class="h-8 text-xs" placeholder="Civil status" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Highest Education Attained</Label>
              <Input v-model="member.highest_education_attained" class="h-8 text-xs" placeholder="Education" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Occupation/Source of Income</Label>
              <Input v-model="member.occupation_source_of_income" class="h-8 text-xs" placeholder="Occupation" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">Monthly Income (₱)</Label>
              <Input v-model.number="member.monthly_income" type="number" class="h-8 text-xs" placeholder="Income" min="0" />
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">PhilHealth Member (Y/N)</Label>
              <select v-model="member.philhealth_member" class="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                <option :value="null">Select</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
            <div class="space-y-1">
              <Label class="text-xs font-medium">4Ps Beneficiary (Y/N)</Label>
              <select v-model="member.fourps_beneficiary" class="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                <option :value="null">Select</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
            </div>
            <div class="space-y-1 sm:col-span-2">
              <Label class="text-xs font-medium">Beneficiary of Other Programs (Y/N)</Label>
              <select v-model="member.beneficiary_other_programs" class="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                <option :value="null">Select</option>
                <option :value="true">Yes</option>
                <option :value="false">No</option>
              </select>
              <Input v-if="member.beneficiary_other_programs === true" v-model="member.other_programs_specify" class="h-8 text-xs mt-2" placeholder="Specify programs" />
            </div>
          </div>
        </div>

        <!-- Empty state for mobile -->
        <div v-if="formData.length === 0" class="border rounded-lg p-6 text-center text-muted-foreground">
          <p class="text-sm">No household members added yet.</p>
          <p class="text-xs">Click "Add Member" to start adding household members.</p>
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
import Button from '@/components/ui/Button.vue'

const store = useQuestionnaireStore()

const formData = computed({
  get: () => store.formData.household_composition,
  set: (value) => store.updateStepData('household_composition', value)
})

function addMember() {
  const newMember = {
    full_name: '',
    relationship_to_hh_head: '',
    age: null,
    sex: '',
    civil_status: '',
    highest_education_attained: '',
    occupation_source_of_income: '',
    monthly_income: null,
    philhealth_member: null,
    fourps_beneficiary: null,
    beneficiary_other_programs: null,
    other_programs_specify: ''
  }
  formData.value.push(newMember)
}

function removeMember(index) {
  formData.value.splice(index, 1)
}
</script>