<script setup lang="ts">
import { Star, Clock, CheckCircle2, XCircle, ArrowLeft, ShoppingBag, Plus, Minus } from "lucide-vue-next";
import logo from '../../assets/logo.png';
import type { MenuItem } from "@/domain/entities/MenuItem";
import ClickBoutton from "./comom/clickBoutton.vue";

defineProps<{
  item: MenuItem;
  isOpen: boolean;
  currentQuantity: number;
  totalPrice: number;
  checked: boolean;
}>();

const emit = defineEmits(["close", "add", "remove"]);

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = logo;
};
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 overflow-y-auto animate-fadeIn">
  
      <div class="bg-white w-full max-w-[300px] sm:max-w-[500px] rounded-2xl overflow-hidden shadow-2xl flex flex-col relative max-h-[92vh] sm:max-h-[65vh]">
        
        <button 
          @click.stop="emit('close')"
          class="absolute top-2.5 left-2.5 z-10 flex items-center justify-center w-7 h-7 bg-white/80 backdrop-blur-md rounded-full text-gray-700 hover:bg-white hover:text-black transition-all shadow-md cursor-pointer border-none"
          aria-label="Fermer"
        >
          <ArrowLeft :size="16" />
        </button>

        <div class="w-full h-36 sm:h-40 bg-gray-100 relative overflow-hidden flex items-center justify-center shrink-0">
          <img 
            :src="item.image || logo" 
            :alt="item.name" 
            @error="handleImageError"
            class="w-full h-full object-cover"
          />
          <span class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full tracking-wide">
            {{ item.category }}
          </span>
        </div>

        <div class="p-3.5 sm:p-4 flex flex-col flex-grow overflow-y-auto">
          <div class="flex justify-between items-start gap-3 mb-2">
            <h2 class="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
              {{ item.name }}
            </h2>
            <span class="text-base sm:text-lg font-black text-amber-400 whitespace-nowrap">
              ${{ item.price.toFixed(0) }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2 mb-2.5 text-[11px]">
            <div class="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg text-amber-400 font-semibold">
              <Star :size="12" fill="#f59e0b" color="#f59e0b" />
              <span>{{ item.rating }}</span>
              <span class="text-amber-400/70 font-normal">({{ item.reviews }})</span>
            </div>

            <div class="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-lg text-gray-700 font-medium">
              <Clock :size="12" class="text-gray-500" />
              <span>{{ item.deliveryTime }}</span>
            </div>

            <div :class="['flex items-center gap-1 px-2 py-0.5 rounded-lg font-medium', item.isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700']">
              <CheckCircle2 v-if="item.isAvailable" :size="12" />
              <XCircle v-else :size="12" />
              <span>{{ item.isAvailable ? 'Available' : 'Unavailable' }}</span>
            </div>
          </div>

          <div class="mb-2.5">
            <h4 class="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Description</h4>
            <p class="text-gray-600 text-xs leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <div v-if="item.dietary && item.dietary.length > 0" class="mb-2.5">
            <h4 class="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Dietary</h4>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="diet in item.dietary" 
                :key="diet"
                class="bg-gray-100 text-gray-800 text-[10px] font-semibold px-2 py-0.5 rounded-md"
              >
                {{ diet }}
              </span>
            </div>
          </div>

          <div v-if="item.portionSizes && item.portionSizes.length > 0" class="mb-3">
            <h4 class="text-[10px] font-bold text-gray-900 uppercase tracking-wider mb-1">Portion Sizes</h4>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="portion in item.portionSizes" 
                :key="portion"
                class="border border-gray-200 text-gray-700 text-[10px] font-semibold px-2 py-0.5 rounded-md"
              >
                {{ portion }}
              </span>
            </div>
          </div>

          <div class="mt-auto pt-2.5 border-t border-gray-100 flex items-center justify-between gap-3 shrink-0">
            <div class="flex flex-col">
              <span class="text-[9px] text-gray-400 font-medium">Total Price</span>
              <span class="text-sm font-bold text-gray-900">${{ totalPrice.toFixed(2) }}</span>
            </div>

            <div v-if="!checked">
              
              <button 
                @click.stop="emit('add')"
                :disabled="!item.isAvailable"
                class="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-200 disabled:text-gray-400 text-black font-bold px-3.5 py-1.5 rounded-xl shadow-md transition-all cursor-pointer border-none text-xs"
              >
                <ShoppingBag :size="14" />
                Add to Cart
              </button>
            </div>

            <div v-else class="flex items-center gap-2 bg-gray-100 p-1 rounded-xl">
              <button 
                @click.stop="emit('remove')"
                class="w-7 h-7 bg-white hover:bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer border-none"
              >
                <Minus :size="12" />
              </button>
              <span class="w-5 text-center font-bold text-gray-900 text-xs">{{ currentQuantity }}</span>
              <button 
                @click.stop="emit('add')"
                class="w-7 h-7 bg-amber-400 hover:bg-amber-500 text-black rounded-lg flex items-center justify-center font-bold shadow-sm transition-colors cursor-pointer border-none"
              >
                <Plus :size="12" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template> 