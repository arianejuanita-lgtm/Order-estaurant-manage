<script setup lang="ts">
defineProps<{
    isModalOpen: boolean;
    modalMessage: string;
}>();

const emit = defineEmits<{
    (e: 'update:isModalOpen', value: boolean): void
}>();

const closeModal = () => {
    emit('update:isModalOpen', false);
};
</script>

<template>
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-gray-100 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold shrink-0">
                    ⚠️
                </div>
                <div>
                    <h4 class="text-lg font-bold text-gray-900">Incomplete Step</h4>
                    <p class="text-sm text-gray-500 mt-0.5">{{ modalMessage }}</p>
                </div>
            </div>
            <div class="flex justify-end pt-2">
                <button 
                    @click="closeModal" 
                    class="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                >
                    Got it
                </button>
            </div>
        </div>
    </div>
</template>