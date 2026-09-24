<script setup lang="ts">
import { useFiltered } from '@/presentation/stores/useFiltered';
import { ref, computed, watch } from 'vue';
import { useMenuItem } from '@/presentation/stores/useMenuItem';

const filteredStore = useFiltered();
const menuStore = useMenuItem();

const maxPriceCalculated = computed(() => {
  if (!menuStore.menuItems || menuStore.menuItems.length === 0) return 1000; 
  const prices = menuStore.menuItems.map(item => Number(item.price) || 0);
  return Math.max(...prices);
});

const prixMin = computed(() => 0);
const prixMax = computed(() => maxPriceCalculated.value);

const valMin = ref<number>(filteredStore.minPrice);
const valMax = ref<number>(filteredStore.maxPrice);

watch(maxPriceCalculated, (newMax) => {
  if (filteredStore.maxPrice === 1000 || filteredStore.maxPrice > newMax) {
    valMax.value = newMax;
    filteredStore.maxPrice = newMax;
  }
});

const controlMin = () => {
  if (valMin.value > valMax.value) {
    valMin.value = valMax.value;
  }
  filteredStore.minPrice = valMin.value;
};

const controlMax = () => {
  if (valMax.value < valMin.value) {
    valMax.value = valMin.value;
  }
  filteredStore.maxPrice = valMax.value;
};

watch(() => filteredStore.minPrice, (newMin) => {
  if (newMin === 0) valMin.value = 0;
});

watch(() => filteredStore.maxPrice, (newMax) => {
  if (newMax >= maxPriceCalculated.value) valMax.value = maxPriceCalculated.value;
});

const trackStyle = computed(() => {
  const currentMin = prixMin.value;
  const currentMax = prixMax.value || 1;
  const range = currentMax - currentMin || 1;

  const minPercent = ((valMin.value - currentMin) / range) * 100;
  const maxPercent = ((valMax.value - currentMin) / range) * 100;
  
  return {
    background: `linear-gradient(to right, #d1d5db ${minPercent}%, #F5BE18 ${minPercent}%, #F5BE18 ${maxPercent}%, #d1d5db ${maxPercent}%)`
  };
});
</script>

<template>
  <div class="w-full max-w-[350px] p-2.5 font-sans">
    <label class="block mb-3.5 text-sm font-semibold text-gray-700">
      Price range : {{ valMin }}$- {{ valMax }}$
    </label>
    
    <div class="relative w-full h-1.5">
      <div class="absolute inset-0 rounded-[3px] pointer-events-none" :style="trackStyle"></div>
      
      <input 
        type="range" 
        :min="prixMin" 
        :max="prixMax" 
        v-model.number="valMin" 
        @input="controlMin"
        class="absolute -top-1.5 w-full h-[18px] appearance-none bg-transparent pointer-events-none m-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F5BE18] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#F5BE18] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
      />
      <input 
        type="range" 
        :min="prixMin" 
        :max="prixMax" 
        v-model.number="valMax" 
        @input="controlMax"
        class="absolute -top-1.5 w-full h-[18px] appearance-none bg-transparent pointer-events-none m-0 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#F5BE18] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-[14px] [&::-moz-range-thumb]:w-[14px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#F5BE18] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-[0_1px_3px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto"
      />
    </div>
  </div>
</template>