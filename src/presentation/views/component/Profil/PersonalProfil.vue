<script lang="ts" setup>
import type { UserData } from '../../Profil.vue';
defineProps<{
    profileFields:any[];
    user:UserData;
    isEditing:boolean;
}>();
</script>
<template>
       <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 class="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Personal Details</h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="field in profileFields" 
                :key="field.key" 
                class="space-y-1.5"
              >
                <label class="text-xs font-bold uppercase tracking-wider text-gray-500">{{ field.label }}</label>
                <div class="relative flex items-center">
                  <component :is="field.icon" :size="18" class="absolute left-3 text-gray-400" />
                  <input 
                    :type="field.type" 
                    v-model=user[field.key] 
                    :disabled="!isEditing"
                    class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:border-[#F5BE18] disabled:bg-gray-50 disabled:text-gray-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
</template>