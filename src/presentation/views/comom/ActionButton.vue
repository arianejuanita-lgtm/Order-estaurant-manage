<script lang="ts" setup>
import { computed } from 'vue';
import { ArrowRight, Check } from 'lucide-vue-next';
import { Button } from "@/components/ui/button";

const props = withDefaults(
    defineProps<{
        label?: string;                                
        variant?: 'next' | 'finish' | 'default';         
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
</script>

<template>
    <Button :type="type" :variant="variant">
        <span>{{ label }}</span>
        <component :is="currentIcon" class="w-4 h-4" />
    </Button>
</template>