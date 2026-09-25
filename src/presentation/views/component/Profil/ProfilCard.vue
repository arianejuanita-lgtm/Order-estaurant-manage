<script lang="ts" setup>
defineProps<{
    avatar:string;
    role:string;
    name:string;
    location:string;
}>();
</script>
<template>
             <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div class="relative w-24 h-24 sm:w-28 sm:h-28 mb-4">
              <img 
                :src="avatar" 
                alt="User Avatar" 
                class="w-full h-full rounded-full object-cover border-4 border-[#F5BE18]/20 shadow-inner"
              />
              <span class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <h2 class="text-lg font-bold text-gray-900">{{ name }}</h2>
            <p class="text-xs font-semibold text-[#F5BE18] bg-[#F5BE18]/10 px-3 py-1 rounded-full mt-1">
              {{ role }}
            </p>
            <p class="text-sm text-gray-500 mt-2 flex items-center gap-1">
              <MapPin :size="14" /> {{ location }}
            </p>
          </div>
</template>