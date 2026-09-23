<script lang="ts" setup>
import { useCreateMenuItem } from '@/presentation/stores/useCreateMenuItem';

const createStore = useCreateMenuItem();
</script>

<template>
    <div class="flex flex-col gap-4">
        <h3 class="text-lg font-bold text-gray-900 border-b pb-2">Product Preview</h3>
        
        <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
            <div class="h-36 bg-gray-900/5 rounded-xl overflow-hidden flex items-center justify-center relative">
                <img 
                    v-if="createStore.formState.image" 
                    :src="createStore.formState.image" 
                    class="w-full h-full object-contain p-1" 
                />
                <span v-else class="text-gray-400 text-xs">No image</span>
            </div>

            <div class="flex flex-col gap-1">
                <span class="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    {{ createStore.formState.category || 'Category' }}
                </span>
                <h4 class="font-bold text-gray-900 text-base">
                    {{ createStore.formState.name || 'Product name' }}
                </h4>
                <p class="text-xs text-gray-500 line-clamp-2">
                    {{ createStore.formState.description || 'Product description...' }}
                </p>
            </div>

            <div class="flex items-center justify-between pt-2 border-t border-gray-200">
                <span class="text-xs text-gray-500">Price:</span>
                <span class="font-bold text-gray-900">{{ createStore.formState.price || 0 }} XAF</span>
            </div>
        </div>
    </div>
</template>