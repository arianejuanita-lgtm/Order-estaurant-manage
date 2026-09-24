<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Check, ArrowRight, Plus, UtensilsCrossed } from 'lucide-vue-next';
import { useCreateMenuItem } from '@/presentation/stores/useCreateMenuItem';

const createStore = useCreateMenuItem();
const form = createStore.formState;

interface ConfettiPiece {
  id: number;
  left: number;
  duration: number;
  delay: number;
  color: string;
  tx: number;
}

const confettiPieces = ref<ConfettiPiece[]>([]);

onMounted(() => {
  const pieces: ConfettiPiece[] = [];
  const colors = ['bg-amber-400', 'bg-emerald-500', 'bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-orange-500'];
  
  for (let i = 0; i < 40; i++) {
    const isLeft = i % 2 === 0;
    const left = isLeft ? Math.random() * 20 : 80 + Math.random() * 20;
    const tx = (isLeft ? 1 : -1) * (80 + Math.random() * 120);
    const color = colors[Math.floor(Math.random() * colors.length)] as string;

    pieces.push({
      id: i,
      left,
      duration: 1.8 + Math.random() * 1.5,
      delay: Math.random() * 0.3,
      color,
      tx
    });
  }
  confettiPieces.value = pieces;
});
</script>

<template>
  <div class="h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden bg-gray-50/50 relative">
    
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <div 
        v-for="p in confettiPieces" 
        :key="p.id"
        class="absolute bottom-0 w-2 h-3.5 rounded-xs opacity-90"
        :class="p.color"
        :style="{
          left: `${p.left}%`,
          animation: `fallAndSpread ${p.duration}s cubic-bezier(0.25, 1, 0.5, 1) ${p.delay}s forwards`,
          '--tx': `${p.tx}px`
        }"
      ></div>
    </div>

    <div class="w-full max-w-xs sm:max-w-sm flex flex-col items-center text-center gap-3 sm:gap-4 relative z-10 bg-white/90 backdrop-blur-xl p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100">
      
      <div class="relative">
        <div class="absolute -inset-2 bg-amber-100 rounded-full animate-ping opacity-60"></div>
        <div class="relative w-14 h-14 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center text-white shadow-md shadow-amber-400/25">
          <Check class="w-7 h-7 sm:w-8 sm:h-8 stroke-[3]" />
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <h2 class="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
          Product successfully created!
        </h2>
        <p class="text-xs text-gray-500">
          Your product has been added to your catalog.
        </p>
      </div>

      <div class="w-full bg-gray-50 border border-gray-100 rounded-xl p-2.5 sm:p-3 flex items-center gap-3 text-left">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-white overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
          <img v-if="form.image" :src="form.image" alt="Preview" class="w-full h-full object-cover" />
          <UtensilsCrossed v-else class="w-5 h-5 text-gray-400" />
        </div>

        <div class="flex flex-col flex-1 min-w-0 gap-0.5">
          <h3 class="font-bold text-gray-800 text-xs sm:text-sm truncate">{{ form.name || 'Product name' }}</h3>
          <span class="text-amber-400 font-extrabold text-xs sm:text-sm">
            {{ form.price ? `${form.price} $` : '0 $' }}
          </span>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full" :class="form.isAvailable ? 'bg-emerald-500' : 'bg-red-400'"></span>
            <span class="text-[10px] sm:text-[11px] font-medium text-gray-500">
              {{ form.isAvailable ? 'Available' : 'Unavailable' }}
            </span>
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-2">
        <RouterLink 
          to="/home"
          class="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-400 text-white font-semibold rounded-xl shadow-sm shadow-amber-400/20 transition-all flex items-center justify-center gap-2 group cursor-pointer text-xs sm:text-sm"
        >
          <span>View product</span>
          <ArrowRight class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </RouterLink>

        <RouterLink 
          to="/create-menu-item"
          class="w-full py-2.5 px-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-2xs"
        >
          <Plus class="w-3.5 h-3.5 text-amber-400" />
          <span>Create another product</span>
        </RouterLink>
      </div>

      <RouterLink 
        to="/home"
        class="text-[11px] font-semibold text-gray-400 hover:text-gray-600 transition-colors"
      >
        Back to products
      </RouterLink>

    </div>
  </div>
</template>

<style scoped>
@keyframes fallAndSpread {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateY(-280px) translateX(var(--tx)) rotate(540deg) scale(1);
    opacity: 0;
  }
}
</style>