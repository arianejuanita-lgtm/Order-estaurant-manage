<script setup lang="ts">
defineProps<{
    isLoading:boolean;
}>();
</script>
<template>
       <div v-if="isLoading" class="flex flex-col items-center justify-center py-20 gap-3">
            <div class="w-10 h-10 border-4 border-[#F5BE18] border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm font-medium text-gray-500">Loading Product ...</p>
        </div>
</template>