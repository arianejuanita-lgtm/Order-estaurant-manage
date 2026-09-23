<script lang="ts" setup>
import { computed } from 'vue';
import { ArrowRight, Check } from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
        label?: string;                                    
        variant?: 'next' | 'finish';         
        type?: 'button' | 'submit' | 'reset'; 
    }>(),
    {
        variant: 'next',
        type: 'submit' 
    }
);

const currentIcon = computed(() => {
    return props.variant === 'finish' ? Check : ArrowRight;
});

const variantClasses = computed(() => {
    if (props.variant === 'finish') {
        return 'bg-green-500 hover:bg-green-600 text-white font-semibold shadow-sm';
    }
    return 'bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold shadow-sm';
});
</script>

<template>
    <button 
        :type="type"
        class="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all cursor-pointer"
        :class="variantClasses"
    >
        <span>{{ label }}</span>
        <component :is="currentIcon" class="w-4 h-4" />
    </button>
</template>