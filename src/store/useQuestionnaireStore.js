import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useQuestionnaireStore = defineStore('questionnaire', () => {
  // Current step tracking
  const currentStep = ref(0)
  const totalSteps = ref(11)

  // Form data schema - matching DOCX exactly
  const formData = ref({
    // A. Household Identification
    household_identification: {
      barangay_code: '',
      enumerator: '',
      supervisor: '',
      date_accomplished: '',
      household_id_number: '',
      barangay: '',
      municipality: '',
      legislative_district: '', // 1, 2, or 3
      enumerator_name: '',
      date_of_interview: '' // format: ___ / ___ / 2025
    },
    
    // B. Head of the Family/HH Profile
    head_profile: {
      name: '', // First name, Middle Name, Last Name
      sex: '', // Male or Female
      age: null, // _______ years
      civil_status: '', // Single, Married, Widowed, Separated, Cohabiting
      ethnicity: '',
      religion: '',
      highest_education_attained: '',
      occupation_source_of_income: '',
      monthly_income: null, // ₱
      philhealth_member: null, // Yes/No
      fourps_beneficiary: null, // Yes/No
      pcic_insurance: null, // Yes/No
      beneficiary_other_programs: null, // Yes/No
      other_programs_specify: '' // If yes, please specify
    },
    
    // C. Household Composition - Table format
    household_composition: [
      // Each member object has these fields from DOCX:
      // {
      //   full_name: '',
      //   relationship_to_hh_head: '',
      //   age: null,
      //   sex: '',
      //   civil_status: '',
      //   highest_education_attained: '',
      //   occupation_source_of_income: '',
      //   monthly_income: null,
      //   philhealth_member: null, // Y/N
      //   fourps_beneficiary: null, // Y/N
      //   beneficiary_other_programs: null, // Y/N (specify if Y)
      //   other_programs_specify: ''
      // }
    ],
    
    // D. Housing & Living Conditions
    housing_conditions: {
      type_of_dwelling: '', // Concrete, Semi-concrete, Light Materials, Makeshift
      tenure_status: '', // Owned, Rented, Informal, Shared
      number_of_rooms: null,
      source_of_drinking_water: '', // Piped, Deep well, Open well, Spring, Others
      drinking_water_others_specify: '',
      toilet_facility: '', // Flush, Septic, Open pit, None
      lighting_source: '', // Electricity, Kerosene, Solar, Others
      lighting_others_specify: '',
      cooking_fuel: '', // LPG, Charcoal, Wood, Electricity, Others
      cooking_fuel_others_specify: ''
    },
    
    // E. Health & Nutrition
    health_nutrition: {
      family_member_with_disability: null, // Yes/No
      disability_specify: '',
      family_member_with_chronic_illness: null, // Yes/No
      chronic_illness_specify: '',
      children_0_5_fully_immunized: null, // Yes/No
      pregnant_women_in_household: null, // Yes/No
      nutrition_status_children_0_12: '' // Normal, Underweight, Severely Underweight, Overweight
    },
    
    // F. Education - Table + Additional questions
    education: {
      school_age_children: [
        // Each child object has these fields from DOCX:
        // {
        //   full_name: '',
        //   age: null,
        //   gender: '',
        //   school_enrolled: '',
        //   school_level: '',
        //   scholarship: ''
        // }
      ],
      has_internet_access: null, // Yes/No
      equipment_available: {
        laptop_pc: false,
        cellular_phone: false,
        others: false
      },
      internet_provider: {
        globe_telecoms: false,
        smart_telecoms: false,
        starlink: false,
        others: false,
        others_specify: ''
      }
    },
    
    // G. Livelihood & Income
    livelihood_income: {
      monthly_household_income_sources: {
        farming: null,
        fishing: null,
        employment: null,
        business: null,
        remittances: null,
        others: null
      },
      has_savings: null, // Yes/No
      has_access_to_microcredit: null, // Yes/No
      credit_type: '' // Formal (cooperative bank) or Informal (acquaintances, relatives, 5-6)
    },
    
    // H. Social Welfare & Services
    social_welfare: {
      // Refer to Section B and C for data
      note: 'Refer to Section B. Head of the Family/ HH Profile and Section C. Household Composition for data'
    },
    
    // I. Disaster Preparedness & Safety
    disaster_preparedness: {
      experienced_disaster_last_5_years: null, // Yes/No
      disaster_types_experienced: {
        flood: false,
        typhoon: false,
        earthquake: false,
        landslide: false,
        storm_surges: false,
        others: false,
        others_specify: ''
      },
      evacuation_center_accessible: null, // Yes/No
      household_has_emergency_kit: null // Yes/No
    },
    
    // J. Cultural & Community Participation
    cultural_participation: {
      member_of_community_organization: null, // Yes/No
      community_organization_specify: '',
      household_visits_provincial_museum: null, // Yes/No
      museum_visit_frequency: '',
      household_visits_provincial_library: null, // Yes/No
      library_visit_frequency: ''
    },
    
    // K. Feedback & Aspirations
    feedback_aspirations: {
      family_top_3_needs: {
        need_1: '',
        need_2: '',
        need_3: ''
      },
      programs_expected_from_provincial_government: '',
      family_included_in_government_planning: null // Yes/No
    }
  })

  // Step configuration
  const steps = [
    { key: 'household_identification', title: 'A. Household Identification', component: 'HouseholdIdentification' },
    { key: 'head_profile', title: 'B. Head of the Family/HH Profile', component: 'HeadProfile' },
    { key: 'household_composition', title: 'C. Household Composition', component: 'HouseholdComposition' },
    { key: 'housing_conditions', title: 'D. Housing & Living Conditions', component: 'HousingConditions' },
    { key: 'health_nutrition', title: 'E. Health & Nutrition', component: 'HealthNutrition' },
    { key: 'education', title: 'F. Education', component: 'Education' },
    { key: 'livelihood_income', title: 'G. Livelihood & Income', component: 'LivelihoodIncome' },
    { key: 'social_welfare', title: 'H. Social Welfare & Services', component: 'SocialWelfare' },
    { key: 'disaster_preparedness', title: 'I. Disaster Preparedness & Safety', component: 'DisasterPreparedness' },
    { key: 'cultural_participation', title: 'J. Cultural & Community Participation', component: 'CulturalParticipation' },
    { key: 'feedback_aspirations', title: 'K. Feedback & Aspirations', component: 'FeedbackAspirations' }
  ]

  // Computed properties
  const currentStepData = computed(() => {
    const stepKey = steps[currentStep.value]?.key
    return stepKey ? formData.value[stepKey] : {}
  })

  const progressPercentage = computed(() => {
    return Math.round((currentStep.value / (totalSteps.value - 1)) * 100)
  })

  const canGoNext = computed(() => {
    return currentStep.value < totalSteps.value - 1
  })

  const canGoPrevious = computed(() => {
    return currentStep.value > 0
  })

  const currentStepInfo = computed(() => {
    return steps[currentStep.value] || {}
  })

  // Actions
  function nextStep() {
    if (canGoNext.value) {
      currentStep.value++
    }
  }

  function previousStep() {
    if (canGoPrevious.value) {
      currentStep.value--
    }
  }

  function goToStep(stepIndex) {
    if (stepIndex >= 0 && stepIndex < totalSteps.value) {
      currentStep.value = stepIndex
    }
  }

  function updateStepData(stepKey, data) {
    if (formData.value[stepKey]) {
      formData.value[stepKey] = { ...formData.value[stepKey], ...data }
    }
  }

  function updateCurrentStepData(data) {
    const stepKey = steps[currentStep.value]?.key
    if (stepKey) {
      updateStepData(stepKey, data)
    }
  }

  function resetForm() {
    currentStep.value = 0
    // Reset form data to initial state
    Object.keys(formData.value).forEach(key => {
      if (typeof formData.value[key] === 'object' && !Array.isArray(formData.value[key])) {
        formData.value[key] = {}
      } else if (Array.isArray(formData.value[key])) {
        formData.value[key] = []
      } else {
        formData.value[key] = ''
      }
    })
  }

  function exportData() {
    return JSON.stringify(formData.value, null, 2)
  }

  return {
    // State
    currentStep,
    totalSteps,
    formData,
    steps,
    
    // Computed
    currentStepData,
    progressPercentage,
    canGoNext,
    canGoPrevious,
    currentStepInfo,
    
    // Actions
    nextStep,
    previousStep,
    goToStep,
    updateStepData,
    updateCurrentStepData,
    resetForm,
    exportData
  }
})