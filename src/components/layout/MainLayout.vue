<template>
  <div class="min-h-screen bg-background flex flex-col">
    <!-- Mobile-first responsive header -->
    <header class="bg-card shadow-sm border-b sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <div class="flex items-center min-w-0 flex-1">
            <h1 class="text-lg sm:text-xl font-semibold text-foreground truncate">
              CFDP Questionnaire
            </h1>
          </div>
          
          <!-- Desktop subtitle -->
          <div class="hidden lg:block text-sm text-muted-foreground">
            Community-based Family Development Program
          </div>
          
          <!-- Mobile menu button / info icon -->
          <div class="lg:hidden ml-2">
            <button 
              @click="showMobileInfo = !showMobileInfo"
              class="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              :class="{ 'text-foreground bg-muted': showMobileInfo }"
            >
              <InfoIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <!-- Mobile info panel -->
        <div 
          v-if="showMobileInfo"
          class="lg:hidden border-t bg-muted/50 px-3 py-2 text-xs text-muted-foreground"
        >
          Community-based Family Development Program
        </div>
      </div>
    </header>
    
    <!-- Main content with responsive padding -->
    <main class="flex-1 w-full">
      <div class="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <slot />
      </div>
    </main>
    
    <!-- Responsive footer -->
    <footer class="mt-auto py-4 sm:py-6 text-center border-t bg-card">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <p class="text-xs sm:text-sm text-muted-foreground">
          <span class="hidden sm:inline">&copy; 2024 CFDP Questionnaire System</span>
          <span class="sm:hidden">&copy; 2024 CFDP System</span>
        </p>
        
        <!-- Mobile app-like navigation hint -->
        <div class="mt-2 text-xs text-muted-foreground/60 sm:hidden">
          <p>Swipe or use buttons to navigate</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { InfoIcon } from 'lucide-vue-next'

const showMobileInfo = ref(false)
</script>