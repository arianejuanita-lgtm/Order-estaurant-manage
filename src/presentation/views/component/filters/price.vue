<!-- <script setup lang="ts">
import { useFilter } from '@/presentation/stores/useFilter';

import { ref, computed } from 'vue';

const {PriceRanges}=useFilter();

const prixMin = computed(() => {
  return price.value && price.value.length > 0 ? Math.min(...price.value) : 0;
});

const prixMax = computed(() => {
  return price.value && price.value.length > 0 ? Math.max(...price.value) : 100;
});

const valMin = ref(prixMin.value);
const valMax = ref(prixMax.value);

const controlMin = () => {
  if (valMin.value > valMax.value) {
    valMin.value = valMax.value;
  }
};

const controlMax = () => {
  if (valMax.value < valMin.value) {
    valMax.value = valMin.value;
  }
};

const trackStyle = computed(() => {
  const minPercent = ((valMin.value - prixMin.value) / (prixMax.value - prixMin.value)) * 100;
  const maxPercent = ((valMax.value - prixMin.value) / (prixMax.value - prixMin.value)) * 100;
  
  return {
    background: `linear-gradient(to right, #d1d5db ${minPercent}%, #F5BE18 ${minPercent}%, #F5BE18 ${maxPercent}%, #d1d5db ${maxPercent}%)`
  };
});
</script>

<template>
  <div class="range-wrapper">
    <label class="range-label">Price range  : {{ valMin }}€ - {{ valMax }}€</label>
    
    <div class="range-container">
    
      <div class="range-track" :style="trackStyle"></div>
      
      <input 
        type="range" 
        :min="prixMin" 
        :max="prixMax" 
        v-model.number="valMin" 
        @input="controlMin"
        class="slider"
      />
      <input 
        type="range" 
        :min="prixMin" 
        :max="prixMax" 
        v-model.number="valMax" 
        @input="controlMax"
        class="slider"
      />
    </div>
  </div>
</template>

<style scoped>
.range-wrapper {
  font-family: sans-serif;
  width: 100%;
  max-width: 350px;
  padding: 10px;
}

.range-label {
  display: block;
  margin-bottom: 15px;
}

.range-container {
  position: relative;
  width: 100%;
  height: 6px;
}

.range-track {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 3px;
  pointer-events: none;
}

.slider {
  position: absolute;
  top: -6px; 
  width: 100%;
  height: 18px;
  appearance: none;
  -webkit-appearance: none;
  background: none;
  pointer-events: none; 
  margin: 0;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #F5BE18;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  pointer-events: auto; 
}


.slider::-moz-range-thumb {
  height: 14px;
  width: 14px;
  border-radius: 50%;
  background: #F5BE18;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
  cursor: pointer;
  pointer-events: auto;
}
</style> -->
