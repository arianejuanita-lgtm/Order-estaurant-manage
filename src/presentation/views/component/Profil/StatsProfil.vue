<script lang="ts" setup>
defineProps<{
    stats:any[];
}>();
</script>

<template>
        <div class="grid grid-cols-3 lg:grid-cols-1 gap-3">
            <div 
              v-for="(stat, index) in stats" 
              :key="index"
              class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
            >
              <div class="p-2.5 bg-[#F5BE18]/10 rounded-lg text-[#F5BE18]">
                <component :is="stat.icon" :size="20" />
              </div>
              <div>
                <p class="text-xs text-gray-500 font-medium">{{ stat.label }}</p>
                <p class="text-base font-bold text-gray-900">{{ stat.value }}</p>
              </div>
            </div>
          </div>
</template>