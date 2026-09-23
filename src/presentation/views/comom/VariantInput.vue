<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, X } from 'lucide-vue-next';
import clickBoutton from './clickBoutton.vue';

export interface IVariants {
  id: string;
  label: string;
  subtitle: string;
  price: number;
  status: string;
  is_default: boolean;
  is_popular: boolean;
}

const props = defineProps<{
  modelValue: IVariants[];
}>();

const emit = defineEmits(['update:modelValue']);

const labelInput = ref('');
const priceInput = ref<number | undefined>(undefined);
const errorMessage = ref('');

const filterKeys = (event: KeyboardEvent) => {
  if (['e', 'E', '+', '-'].includes(event.key)) {
    event.preventDefault();
  }
};

const addVariant = () => {
  if (!labelInput.value.trim()) {
    errorMessage.value = "The label is required.";
    return;
  }
  if (priceInput.value === undefined || isNaN(priceInput.value) || priceInput.value < 0) {
    errorMessage.value = "A valid positive price is required.";
    return;
  }

  errorMessage.value = '';

  const newVariant: IVariants = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    label: labelInput.value.trim(),
    subtitle: '',
    price: Number(priceInput.value),
    status: 'active',
    is_default: false,
    is_popular: false,
  };

  const updatedList = [...props.modelValue, newVariant];
  emit('update:modelValue', updatedList);

  labelInput.value = '';
  priceInput.value = undefined;
};

const removeVariant = (index: number) => {
  const updatedList = [...props.modelValue];
  updatedList.splice(index, 1);
  emit('update:modelValue', updatedList);
};
</script>

<template>
  <div class="flex flex-col gap-3">
    <label class="text-sm font-medium text-gray-700">Add variants (Label & Price required)</label>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
      <input
        type="text"
        v-model="labelInput"
        placeholder="Name (Ex: XL, Spicy...)"
        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800 bg-white text-sm"
      />

      <input
        type="number"
        min="0"
        v-model.number="priceInput"
        placeholder="Price (Ex: 500)"
        @keydown="filterKeys"
        @keydown.enter.prevent="addVariant"
        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800 bg-white text-sm"
      />

      <clickBoutton :click="addVariant" :icon="Plus" title="Add" />
    </div>

    <span v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</span>

    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 mt-1">
      <div
        v-for="(variant, index) in modelValue"
        :key="variant.id || index"
        class="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-2 rounded-xl text-xs font-semibold shadow-xs"
      >
        <div class="flex flex-col">
          <span class="font-bold">{{ variant.label }}</span>
          <span class="text-[10px] text-amber-700">+{{ variant.price }} XAF</span>
        </div>

        <clickBoutton :click="() => removeVariant(index)" :icon="X" />
      </div>
    </div>
  </div>
</template>