# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CFDP (Community-based Family Development Program) Questionnaire application built with Vue 3, Vite, TailwindCSS, and shadcn/ui. It's a multi-step form wizard designed to digitize the CFDP questionnaire with 10 sections (A-K).

**Tech Stack:**
- Vue 3 with Composition API (`<script setup>` syntax)
- Vite (build tool and dev server)  
- TailwindCSS (utility-first CSS)
- shadcn/ui Vue components (via radix-vue)
- Pinia (state management)
- Zod (validation)
- Vee-validate (form validation)

## Development Commands

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production 
- `npm run preview` - Preview production build

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Button, Card, Input, Label)
│   ├── form/            # Form-specific components
│   │   └── FormStepper.vue # Multi-step form navigation
│   └── layout/
│       └── MainLayout.vue # Main application layout
├── modules/             # Questionnaire sections (A-K)
│   ├── HouseholdIdentification.vue
│   ├── HeadProfile.vue  
│   ├── HouseholdComposition.vue
│   ├── HousingConditions.vue
│   ├── HealthNutrition.vue
│   ├── Education.vue
│   ├── LivelihoodIncome.vue
│   ├── DisasterPreparedness.vue
│   ├── CulturalParticipation.vue
│   └── FeedbackAspirations.vue
├── pages/
│   ├── Questionnaire.vue # Main form wizard
│   └── ReviewSubmit.vue  # Final review and submission
├── store/
│   └── useQuestionnaireStore.js # Pinia store with form schema
├── utils/
│   ├── validation.js     # Zod validation schemas
│   └── schemaMapping.js  # Field labels and API mapping
├── lib/
│   └── utils.js         # Utility functions (cn helper)
├── App.vue              # Root component with view routing
└── main.js              # App entry point with Pinia setup
```

## State Management

The application uses a centralized Pinia store (`useQuestionnaireStore`) that contains:
- **Form data schema** matching 10 questionnaire sections
- **Step navigation** (currentStep, nextStep, previousStep, goToStep)  
- **Progress tracking** (progressPercentage, canGoNext, canGoPrevious)
- **Data management** (updateStepData, resetForm, exportData)

## Form Architecture

- **Multi-step wizard** with progress bar and step indicators
- **Dynamic component loading** based on current step
- **Two-way data binding** between components and Pinia store
- **Validation** using Zod schemas for each section
- **Review page** showing all submitted data before final submission
- **JSON export** functionality for data portability

## Configuration

- **Path aliases**: `@` → `src/` directory
- **Node version**: ^20.19.0 || >=22.12.0
- **Dev server**: Port 3000 with auto-open
- **TailwindCSS**: Configured with shadcn/ui design tokens
- **Form validation**: Zod schemas in `utils/validation.js`

## Integration Notes

- **Backend ready**: Schema designed for Laravel API integration
- **API endpoints**: Defined in `utils/schemaMapping.js`
- **Data format**: JSON structure matches backend expectations
- **File uploads**: Structure supports file attachment features