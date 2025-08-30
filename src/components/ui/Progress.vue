<template>
  <div
    ref="progressRef"
    class="relative h-2 w-full overflow-hidden rounded-full bg-secondary"
    v-bind="$attrs"
  >
    <div
      class="h-full w-full flex-1 bg-primary transition-all"
      :style="{ transform: `translateX(-${100 - (modelValue || 0)}%)` }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100,
  },
})

const progressRef = ref()
</script>