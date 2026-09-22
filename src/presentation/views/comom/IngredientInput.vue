<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, X } from 'lucide-vue-next';
import clickBoutton from './clickBoutton.vue';

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits(['update:modelValue']);

const inputVal = ref('');
const errorMessage = ref('');

const addIngredient = () => {
  if (!inputVal.value.trim()) {
    errorMessage.value = "L'ingrédient ne peut pas être vide.";
    return;
  }
  if (props.modelValue.includes(inputVal.value.trim())) {
    errorMessage.value = "Cet ingrédient est déjà ajouté.";
    return;
  }

  errorMessage.value = '';
  const updatedList = [...props.modelValue, inputVal.value.trim()];
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
  <div class="flex flex-col gap-2.5">
    <label class="text-sm font-semibold text-gray-700">Ingrédients</label>
    <div class="flex gap-2">
      <input 
        type="text" 
        v-model="inputVal"
        placeholder="Ajouter un ingrédient (ex: Tomate, Fromage...)"
        @keydown.enter.prevent="addIngredient"
        class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-400 focus:outline-none transition-all text-gray-800 bg-white text-sm"
      />
      <clickBoutton :click="addIngredient" :icon="Plus" title="Ajouter" />
    </div>

    <span v-if="errorMessage" class="text-xs text-red-500">{{ errorMessage }}</span>

    <div v-if="modelValue.length > 0" class="flex flex-wrap gap-2 mt-1">
      <div
        v-for="(ingredient, index) in modelValue"
        :key="index"
        class="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-xs"
      >
        <span>{{ ingredient }}</span>
        <clickBoutton :click="() => removeIngredient(index)" :icon="X" />
      </div>
    </div>
  </div>
</template>