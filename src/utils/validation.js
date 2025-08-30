import { z } from 'zod'

// Household Identification Schema
export const householdIdentificationSchema = z.object({
  barangay: z.string().min(1, 'Barangay is required'),
  municipality: z.string().min(1, 'Municipality is required'),
  province: z.string().min(1, 'Province is required'),
  region: z.string().min(1, 'Region is required'),
  enumerator_name: z.string().min(1, 'Enumerator name is required'),
  date_of_interview: z.string().min(1, 'Date of interview is required'),
  household_head_name: z.string().min(1, 'Household head name is required'),
  address: z.string().min(1, 'Address is required'),
  contact_number: z.string().optional(),
  gps_coordinates: z.object({
    latitude: z.union([z.string(), z.number()]).optional(),
    longitude: z.union([z.string(), z.number()]).optional()
  }).optional()
})

// Head Profile Schema
export const headProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0, 'Age must be a positive number').max(120, 'Age must be realistic'),
  sex: z.enum(['Male', 'Female'], { required_error: 'Sex is required' }),
  civil_status: z.enum(['Single', 'Married', 'Widowed', 'Separated', 'Live-in'], { required_error: 'Civil status is required' }),
  educational_attainment: z.string().min(1, 'Educational attainment is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  monthly_income: z.number().min(0, 'Monthly income must be positive').optional(),
  religion: z.string().optional(),
  ethnicity: z.string().optional(),
  pwd_status: z.boolean().default(false),
  senior_citizen: z.boolean().default(false)
})

// Household Member Schema
export const householdMemberSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(0).max(120),
  sex: z.enum(['Male', 'Female']),
  relationship_to_head: z.string().min(1, 'Relationship to head is required'),
  civil_status: z.string().optional(),
  educational_attainment: z.string().optional(),
  occupation: z.string().optional(),
  pwd_status: z.boolean().default(false),
  senior_citizen: z.boolean().default(false)
})

// Housing Schema
export const housingSchema = z.object({
  type_of_building: z.string().min(1, 'Type of building is required'),
  construction_materials: z.object({
    roof: z.string().optional(),
    walls: z.string().optional(),
    floor: z.string().optional()
  }),
  tenure_status: z.string().optional(),
  number_of_rooms: z.number().min(1, 'Number of rooms must be at least 1').optional(),
  access_to_electricity: z.boolean().default(false),
  water_source: z.string().optional(),
  toilet_facility: z.string().optional(),
  waste_disposal: z.string().optional(),
  cooking_fuel: z.string().optional()
})

// Health Schema
export const healthSchema = z.object({
  health_insurance: z.object({
    philhealth: z.boolean().default(false),
    private_insurance: z.boolean().default(false),
    hmo: z.boolean().default(false),
    none: z.boolean().default(false)
  }),
  access_to_healthcare: z.string().optional(),
  common_health_issues: z.array(z.string()).default([]),
  nutritional_status: z.object({
    undernourished_members: z.number().min(0).optional(),
    feeding_programs: z.boolean().default(false)
  }),
  maternal_health: z.object({
    pregnant_members: z.number().min(0).optional(),
    access_to_prenatal_care: z.boolean().default(false)
  })
})

// Education Schema
export const educationSchema = z.object({
  school_age_children: z.number().min(0).optional(),
  enrolled_children: z.number().min(0).optional(),
  out_of_school_youth: z.number().min(0).optional(),
  reasons_for_not_attending: z.array(z.string()).default([]),
  distance_to_school: z.string().optional(),
  education_support_programs: z.array(z.string()).default([]),
  adult_literacy: z.object({
    literate_adults: z.number().min(0).optional(),
    illiterate_adults: z.number().min(0).optional()
  })
})

// Livelihood Schema
export const livelihoodSchema = z.object({
  primary_income_source: z.string().optional(),
  secondary_income_sources: z.array(z.string()).default([]),
  monthly_household_income: z.number().min(0).optional(),
  employment_status: z.array(z.string()).default([]),
  skills_training: z.array(z.string()).default([]),
  access_to_credit: z.boolean().default(false),
  savings_account: z.boolean().default(false),
  agricultural_activities: z.object({
    owns_land: z.boolean().default(false),
    land_size: z.number().min(0).optional(),
    crops_grown: z.array(z.string()).default([]),
    livestock: z.array(z.string()).default([])
  }),
  business_activities: z.array(z.string()).default([])
})

// Disaster Preparedness Schema
export const disasterSchema = z.object({
  experienced_disasters: z.array(z.string()).default([]),
  preparedness_measures: z.object({
    emergency_kit: z.boolean().default(false),
    evacuation_plan: z.boolean().default(false),
    early_warning_system: z.boolean().default(false),
    disaster_insurance: z.boolean().default(false)
  }),
  vulnerability_assessment: z.object({
    flood_prone: z.boolean().default(false),
    earthquake_prone: z.boolean().default(false),
    landslide_prone: z.boolean().default(false),
    typhoon_prone: z.boolean().default(false)
  }),
  recovery_support_needed: z.array(z.string()).default([])
})

// Cultural Schema
export const culturalSchema = z.object({
  indigenous_community: z.boolean().default(false),
  cultural_practices: z.array(z.string()).default([]),
  language_spoken: z.string().optional(),
  participation_in_cultural_activities: z.boolean().default(false),
  cultural_preservation_concerns: z.array(z.string()).default([]),
  traditional_knowledge: z.array(z.string()).default([])
})

// Feedback Schema
export const feedbackSchema = z.object({
  priority_needs: z.array(z.string()).default([]),
  suggested_programs: z.array(z.string()).default([]),
  community_participation_willingness: z.string().optional(),
  preferred_communication_channels: z.array(z.string()).default([]),
  additional_comments: z.string().optional(),
  satisfaction_with_government_services: z.number().min(1).max(5).optional()
})

// Complete Form Schema
export const completeFormSchema = z.object({
  household_identification: householdIdentificationSchema,
  head_profile: headProfileSchema,
  household_members: z.array(householdMemberSchema).default([]),
  housing: housingSchema,
  health: healthSchema,
  education: educationSchema,
  livelihood: livelihoodSchema,
  disaster: disasterSchema,
  cultural: culturalSchema,
  feedback: feedbackSchema
})

// Schema mapping for easy access
export const schemaMap = {
  household_identification: householdIdentificationSchema,
  head_profile: headProfileSchema,
  household_members: z.array(householdMemberSchema),
  housing: housingSchema,
  health: healthSchema,
  education: educationSchema,
  livelihood: livelihoodSchema,
  disaster: disasterSchema,
  cultural: culturalSchema,
  feedback: feedbackSchema
}