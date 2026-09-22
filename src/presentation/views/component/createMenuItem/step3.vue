<script lang="ts" setup>
import type { IStep } from '@/data/repositories/StepRepository';
import { ArrowRight, ArrowLeft } from 'lucide-vue-next';

defineProps<{
    itemStep: IStep
}>();

const emit = defineEmits(['next', 'prev']);
</script>

<template>
    <div class="flex flex-col gap-6">
        <div>
            <h3 class="text-xl font-bold text-gray-900">{{itemStep.id}}. {{ itemStep.title }}</h3>
            <p class="text-sm text-gray-500 mt-1">{{ itemStep.description }}</p>
        </div>

        <div class="py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
            Formulaire Étape
        </div>

        <div class="flex justify-between pt-4 border-t border-gray-100">
            <button 
                @click="emit('prev')"
                class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
                <ArrowLeft class="w-4 h-4" />
                <span>Retour</span>
            </button>
            <button 
                @click="emit('next')"
                class="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
            >
                <span>Suivant</span>
                <ArrowRight class="w-4 h-4" />
            </button>
        </div>
    </div>
</template>