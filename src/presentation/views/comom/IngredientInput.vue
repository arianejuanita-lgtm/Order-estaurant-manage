<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, X } from 'lucide-vue-next';
import clickBoutton from './clickBoutton.vue';
import { Form, Field, ErrorMessage, useForm } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';

const props = defineProps<{
    modelValue: string[];
}>();

const emit = defineEmits(['update:modelValue']);

const inputVal = ref('');

const validationSchema = toTypedSchema(
    zod.object({
        ingredient: zod.string().min(1, "Ingredient cannot be empty."),
    })
);

const { validateField, setFieldError } = useForm({
    validationSchema,
});

const addIngredient = async () => {
    const trimmedVal = inputVal.value.trim();

    const validationResult = await validateField('ingredient');
    if (!validationResult.valid || !trimmedVal) {
        return;
    }

    if (props.modelValue.includes(trimmedVal)) {
        setFieldError('ingredient', "This ingredient has already been added.");
        return;
    }

    const updatedList = [...props.modelValue, trimmedVal];
    emit('update:modelValue', updatedList);
    inputVal.value = '';
};

const removeIngredient = (index: number) => {
    const updatedList = [...props.modelValue];
    updatedList.splice(index, 1);
    emit('update:modelValue', updatedList);
};
</script>

<template>
  <Form class="flex flex-col gap-2.5" :validation-schema="validationSchema">
    <label class="text-sm font-semibold text-gray-700">Ingredients</label>
    
    <div class="relative flex items-center">
      <Field 
        name="ingredient"
        type="text" 
        v-model="inputVal"
        placeholder="Add an ingredient (e.g., Tomato, Cheese...)"
        @keydown.enter.prevent="addIngredient"
        class="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800 bg-white text-sm"
      />
      
      <div class="absolute right-1.5 flex items-center">
        <clickBoutton 
          type="button"
          :click="addIngredient" 
          :icon="Plus" 
          title="Add" 
          class="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400 hover:bg-amber-400 transition-colors"
        />
      </div>
    </div>

    <ErrorMessage name="ingredient" class="text-xs text-red-500" />

    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 mt-1">
      <div
        v-for="(ingredient, index) in modelValue"
        :key="index"
        class="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs"
      >
        <span>{{ ingredient }}</span>
        <clickBoutton type="button" :click="() => removeIngredient(index)" :icon="X" size="h-4 px-2 rounded-xl text-xs" />
      </div>
    </div>
  </Form>
</template>