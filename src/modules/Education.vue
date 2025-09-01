<template>
  <div class="space-y-4 sm:space-y-6">
    <!-- Header matching DOCX -->
    <div class="text-center sm:text-left">
      <h2 class="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">F. Education</h2>
      <p class="text-sm sm:text-base text-muted-foreground">Educational information</p>
    </div>

    <Card class="p-4 sm:p-6">
      <!-- School Age Children Table -->
      <div class="space-y-6">
        <!-- Table Section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">School Age Children</h3>
            <Button @click="addChild" size="sm" class="text-sm">
              + Add Child
            </Button>
          </div>

          <!-- Desktop Table View -->
          <div class="hidden lg:block overflow-x-auto">
            <table class="w-full border-collapse border border-gray-300">
              <thead>
                <tr class="bg-muted">
                  <th class="border border-gray-300 p-2 text-xs font-medium">Full Name of Children of School age</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">Age</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">Gender</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">School enrolled</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">School level</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">Scholarship</th>
                  <th class="border border-gray-300 p-2 text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(child, index) in formData.school_age_children" :key="index" class="hover:bg-muted/50">
                  <td class="border border-gray-300 p-1">
                    <Input v-model="child.full_name" class="h-8 text-xs border-0" placeholder="Full name" />
                  </td>
                  <td class="border border-gray-300 p-1">
                    <Input v-model.number="child.age" type="number" class="h-8 text-xs border-0 w-16" placeholder="Age" min="0" />
                  </td>
                  <td class="border border-gray-300 p-1">
                    <select v-model="child.gender" class="h-8 text-xs border-0 bg-transparent w-full">
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </td>
                  <td class="border border-gray-300 p-1">
                    <Input v-model="child.school_enrolled" class="h-8 text-xs border-0" placeholder="School" />
                  </td>
                  <td class="border border-gray-300 p-1">
                    <Input v-model="child.school_level" class="h-8 text-xs border-0" placeholder="Level" />
                  </td>
                  <td class="border border-gray-300 p-1">
                    <Input v-model="child.scholarship" class="h-8 text-xs border-0" placeholder="Scholarship" />
                  </td>
                  <td class="border border-gray-300 p-1">
                    <Button @click="removeChild(index)" size="sm" variant="destructive" class="h-6 w-6 p-0">
                      ×
                    </Button>
                  </td>
                </tr>
                <!-- Empty state -->
                <tr v-if="formData.school_age_children.length === 0">
                  <td colspan="7" class="border border-gray-300 p-4 text-center text-muted-foreground">
                    No school-age children added yet. Click "Add Child" to start.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile Card View -->
          <div class="lg:hidden space-y-4">
            <div v-for="(child, index) in formData.school_age_children" :key="index" class="border rounded-lg p-4 space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="font-medium text-sm">Child {{ index + 1 }}</h4>
                <Button @click="removeChild(index)" size="sm" variant="destructive" class="h-6 w-6 p-0">
                  ×
                </Button>
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1 sm:col-span-2">
                  <Label class="text-xs font-medium">Full Name</Label>
                  <Input v-model="child.full_name" class="h-8 text-xs" placeholder="Full name" />
                </div>
                <div class="space-y-1">
                  <Label class="text-xs font-medium">Age</Label>
                  <Input v-model.number="child.age" type="number" class="h-8 text-xs" placeholder="Age" min="0" />
                </div>
                <div class="space-y-1">
                  <Label class="text-xs font-medium">Gender</Label>
                  <select v-model="child.gender" class="flex h-8 w-full rounded-md border border-input bg-background px-2 text-xs">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <Label class="text-xs font-medium">School enrolled</Label>
                  <Input v-model="child.school_enrolled" class="h-8 text-xs" placeholder="School" />
                </div>
                <div class="space-y-1">
                  <Label class="text-xs font-medium">School level</Label>
                  <Input v-model="child.school_level" class="h-8 text-xs" placeholder="Level" />
                </div>
                <div class="space-y-1 sm:col-span-2">
                  <Label class="text-xs font-medium">Scholarship</Label>
                  <Input v-model="child.scholarship" class="h-8 text-xs" placeholder="Scholarship" />
                </div>
              </div>
            </div>

            <!-- Empty state for mobile -->
            <div v-if="formData.school_age_children.length === 0" class="border rounded-lg p-6 text-center text-muted-foreground">
              <p class="text-sm">No school-age children added yet.</p>
              <p class="text-xs">Click "Add Child" to start adding school-age children.</p>
            </div>
          </div>
        </div>

        <!-- Additional Questions Section -->
        <div class="space-y-6 pt-6 border-t">
          <!-- Internet Access -->
          <div class="space-y-4">
            <div class="space-y-2">
              <Label class="text-sm font-medium">Does the HH has access to internet/digital learning equipment/tools?</Label>
              <div class="flex items-center space-x-8">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="formData.has_internet_access"
                    type="radio"
                    :value="true"
                    class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span class="text-sm">Yes</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input
                    v-model="formData.has_internet_access"
                    type="radio"
                    :value="false"
                    class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                  />
                  <span class="text-sm">No</span>
                </label>
              </div>
            </div>

            <!-- Equipment Available -->
            <div v-if="formData.has_internet_access === true" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label class="text-sm font-medium">Equipment/Tool available</Label>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.equipment_available.laptop_pc"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Laptop/ PC</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.equipment_available.cellular_phone"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Cellular Phone</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.equipment_available.others"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Others</span>
                  </label>
                </div>
              </div>

              <!-- Internet Provider -->
              <div class="space-y-2">
                <Label class="text-sm font-medium">Internet Provider</Label>
                <div class="space-y-2">
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.internet_provider.globe_telecoms"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Globe Telecoms</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.internet_provider.smart_telecoms"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Smart Telecoms</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.internet_provider.starlink"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Starlink</span>
                  </label>
                  <label class="flex items-center space-x-2 cursor-pointer">
                    <input
                      v-model="formData.internet_provider.others"
                      type="checkbox"
                      class="w-4 h-4 text-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <span class="text-sm">Others</span>
                  </label>
                  <div v-if="formData.internet_provider.others" class="mt-2">
                    <Input
                      v-model="formData.internet_provider.others_specify"
                      
                      class="h-8 text-xs"
                    />
                  </div>
                </div>
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
import Button from '@/components/ui/Button.vue'

const store = useQuestionnaireStore()

const formData = computed({
  get: () => store.formData.education,
  set: (value) => store.updateStepData('education', value)
})

function addChild() {
  const newChild = {
    full_name: '',
    age: null,
    gender: '',
    school_enrolled: '',
    school_level: '',
    scholarship: ''
  }
  formData.value.school_age_children.push(newChild)
}

function removeChild(index) {
  formData.value.school_age_children.splice(index, 1)
}
</script>