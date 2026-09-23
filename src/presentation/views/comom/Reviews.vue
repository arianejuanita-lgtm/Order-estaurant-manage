<script lang="ts" setup>
import { Star } from 'lucide-vue-next';
defineProps<{
    rating:number;
    reviews:number;
}>();
</script>

<template>
          <div class="flex items-center mb-3">
        <div
          class="flex items-center gap-1 text-xs font-semibold text-gray-700"
        >
          <Star :size="16" fill="#f59e0b" color="#f59e0b" />
          <span
            >{{ rating }}
            <span class="text-gray-400 font-normal"
              >({{ reviews }})</span
            ></span
          >
        </div>
      </div>
</template>