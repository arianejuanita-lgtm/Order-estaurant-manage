<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate';

defineProps<{
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    modelValue?: string;
    maxLength?: number;
}>();

defineEmits(['update:modelValue']);
</script>

<template>
    <div class="flex flex-col gap-1.5">
        <div class="flex justify-between items-center text-sm font-medium text-gray-700">
            <label :for="name">{{ label }} <span v-if="required" class="text-amber-500">*</span></label> 
            <span v-if="maxLength" class="text-xs text-gray-400">
                {{ modelValue?.length || 0 }}/{{ maxLength }}
            </span>
        </div>
        <Field 
            :name="name" 
            :type="type || 'text'" 
            :placeholder="placeholder"
            :model-value="modelValue"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800"
        />
        <ErrorMessage :name="name" class="text-xs text-red-500" />
    </div>
</template>