<script setup lang="ts">
defineProps<{
    item:any[]
}>();
</script>

<template>
        <div v-if="item && item.length > 0" class="mb-2.5">
            <h4 class="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Dietary</h4>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="diet in item" 
                :key="diet"
                class="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-md"
              >
                {{ diet }}
              </span>
            </div>
          </div>
</template>