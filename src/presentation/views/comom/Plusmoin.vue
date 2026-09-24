<script lang="ts" setup>
import { Minus, Plus } from 'lucide-vue-next'; 

defineProps<{
    currentQuantity: number;
}>();

const emit = defineEmits<{
    (e: 'remove'): void;
    (e: 'add'): void;
    (e: 'update:currentQuantity', value: number): void;
}>();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    
    if (!isNaN(value)) {
        const finalValue = value < 1 ? 1 : value;
        emit('update:currentQuantity', finalValue);
        target.value = finalValue.toString();
    } else if (target.value === '') {
        emit('update:currentQuantity', 1);
    }
};
</script>

<template>
    <div class="flex items-center gap-2">
        <button 
            @click.stop="emit('remove')"
            class="w-7 h-7 bg-white hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer border-none"
        >
            <Minus :size="12" />
        </button>

        <input 
            type="number" 
            min="1"
            :value="currentQuantity"
            @input="handleInput"
            @click.stop
            class="w-12 text-center font-bold text-gray-900 text-xs bg-gray-50 border border-gray-200 rounded-md py-1 focus:outline-none focus:ring-1 focus:ring-amber-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button 
            @click.stop="emit('add')"
            class="w-7 h-7 bg-amber-400 hover:bg-amber-400 text-black rounded-lg flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer border-none"
        >
            <Plus :size="12" />
        </button>
    </div>
</template>