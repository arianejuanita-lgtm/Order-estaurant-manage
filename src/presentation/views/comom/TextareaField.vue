<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps<{
    name: string;
    label: string;
    placeholder?: string;
    rows?: number;
    modelValue?: string;
    maxLength?: number;
}>();

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <div class="flex justify-between items-center text-sm font-medium text-gray-700">
            <label :for="name">{{ label }}</label>
            <span v-if="maxLength && typeof modelValue === 'string'" class="text-xs text-gray-400">
                {{ modelValue?.length || 0 }}/{{ maxLength }}
            </span>
        </div>

        <Field 
            :name="name" 
            as="textarea" 
            :rows="rows || 3"
            :placeholder="placeholder"
            :model-value="modelValue"
            @input="handleInput"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800 resize-none bg-white"
        />

        <ErrorMessage :name="name" class="text-xs text-red-500" />
    </div>
</template>