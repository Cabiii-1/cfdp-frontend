// Schema mapping utilities for the CFDP Questionnaire

export const sectionMapping = {
  'A': 'household_identification',
  'B': 'head_profile', 
  'C': 'household_members',
  'D': 'housing',
  'E': 'health',
  'F': 'education',
  'G': 'livelihood',
  'H': 'disaster',
  'I': 'cultural',
  'J': 'feedback'
}

export const reverseSectionMapping = Object.fromEntries(
  Object.entries(sectionMapping).map(([key, value]) => [value, key])
)

// Field labels for better UI display
export const fieldLabels = {
  household_identification: {
    barangay: 'Barangay',
    municipality: 'Municipality',
    province: 'Province',
    region: 'Region',
    enumerator_name: 'Enumerator Name',
    date_of_interview: 'Date of Interview',
    household_head_name: 'Household Head Name',
    address: 'Complete Address',
    contact_number: 'Contact Number',
    gps_coordinates: 'GPS Coordinates'
  },
  head_profile: {
    name: 'Full Name',
    age: 'Age',
    sex: 'Sex',
    civil_status: 'Civil Status',
    educational_attainment: 'Educational Attainment',
    occupation: 'Occupation',
    monthly_income: 'Monthly Income (PHP)',
    religion: 'Religion',
    ethnicity: 'Ethnicity',
    pwd_status: 'Person with Disability',
    senior_citizen: 'Senior Citizen'
  }
}

// Options for select fields
export const selectOptions = {
  sex: [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' }
  ],
  civil_status: [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Separated', label: 'Separated' },
    { value: 'Live-in', label: 'Live-in' }
  ],
  educational_attainment: [
    { value: 'No formal education', label: 'No formal education' },
    { value: 'Elementary undergraduate', label: 'Elementary undergraduate' },
    { value: 'Elementary graduate', label: 'Elementary graduate' },
    { value: 'High school undergraduate', label: 'High school undergraduate' },
    { value: 'High school graduate', label: 'High school graduate' },
    { value: 'College undergraduate', label: 'College undergraduate' },
    { value: 'College graduate', label: 'College graduate' },
    { value: 'Post graduate', label: 'Post graduate' }
  ],
  relationship_to_head: [
    { value: 'Spouse', label: 'Spouse' },
    { value: 'Son/Daughter', label: 'Son/Daughter' },
    { value: 'Parent', label: 'Parent' },
    { value: 'Sibling', label: 'Sibling' },
    { value: 'Grandparent', label: 'Grandparent' },
    { value: 'Grandchild', label: 'Grandchild' },
    { value: 'Other relative', label: 'Other relative' },
    { value: 'Non-relative', label: 'Non-relative' }
  ]
}

// Helper function to get field label
export function getFieldLabel(section, field) {
  return fieldLabels[section]?.[field] || field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Helper function to get select options
export function getSelectOptions(field) {
  return selectOptions[field] || []
}

// API endpoint mapping for Laravel backend integration
export const apiEndpoints = {
  submit: '/api/questionnaire/submit',
  draft: '/api/questionnaire/draft',
  validate: '/api/questionnaire/validate',
  upload: '/api/questionnaire/upload'
}

// Helper function to prepare data for API submission
export function prepareApiData(formData) {
  return {
    sections: formData,
    submitted_at: new Date().toISOString(),
    version: '1.0'
  }
}