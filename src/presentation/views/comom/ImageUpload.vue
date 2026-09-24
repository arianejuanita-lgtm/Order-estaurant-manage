<script lang="ts" setup>
import { ref } from 'vue';
import { Camera, RefreshCw } from 'lucide-vue-next';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits(['update:modelValue']);

const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const onFileSelected = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        const file = target.files[0];
        const imageUrl = URL.createObjectURL(file);
        emit('update:modelValue', imageUrl);
    }
};
</script>

<template>
    <div class="w-full">
        <input 
            ref="fileInputRef" 
            type="file" 
            accept="image/png, image/jpeg" 
            class="hidden" 
            @change="onFileSelected"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div 
                @click="triggerFileInput"
                :class="[
                    'border-2 border-dashed border-gray-300 hover:border-amber-400 bg-gray-50 hover:bg-amber-50/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-52 gap-3',
                    modelValue ? 'hidden md:flex' : 'flex'
                ]"
            >
                <div class="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-amber-400">
                    <Camera class="w-6 h-6" />
                </div>
                <div class="flex flex-col gap-1">
                    <p class="font-semibold text-gray-800 text-sm">Add a photo</p>
                    <p class="text-xs text-gray-400">Drag and drop an image or click to browse JPG, PNG (max 5 MB)</p>
                </div>
            </div>
            
            <div 
                :class="[
                    'border border-gray-200 bg-gray-900/5 rounded-2xl p-2 flex flex-col items-center justify-center relative h-52 overflow-hidden shadow-sm w-full',
                    modelValue ? 'flex' : 'hidden md:flex'
                ]"
            >
                <template v-if="!modelValue">
                    <div class="flex flex-col items-center justify-center text-gray-400 text-center gap-2">
                        <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                            <Camera class="w-5 h-5" />
                        </div>
                        <p class="text-xs">No image selected</p>
                    </div>
                </template>

                <template v-else>
                    <img :src="modelValue" alt="Preview" class="w-full h-full object-contain rounded-xl absolute inset-0 p-2" />
                    <button 
                        type="button"
                        @click="triggerFileInput"
                        class="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold px-4 py-2 rounded-xl shadow-md backdrop-blur-sm transition-all cursor-pointer"
                    >
                        <RefreshCw class="w-3.5 h-3.5 text-amber-400" />
                        <span>Change</span>
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>