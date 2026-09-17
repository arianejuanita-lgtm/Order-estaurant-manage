<script setup lang="ts">
import { Star, Pencil, Trash2 } from "lucide-vue-next";
import Boutton from "../comom/Boutton.vue";
import logo from '../../../assets/logo.png';
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { useOrder } from "@/presentation/stores/useOrder.ts";
import { ref, computed, onMounted } from "vue";
import DialogBox from "../comom/DialogBox.vue";
import DetailsItem from "../DetailsItem.vue";
import type { MenuItem } from "@/domain/entities/MenuItem";

const orderStore = useOrder();
const menu = useMenuItem();
const checked = ref<boolean>(false);
const isDialogOpen = ref<boolean>(false);
const isDetailsOpen = ref<boolean>(false); 

const props = defineProps<{
    item: MenuItem;
}>();

const emit = defineEmits(["edit"]);

const currentQuantity = computed(() => {
  const existingOrder = orderStore.orderMenuItem.find(ord => 
    ord.items.some(i => i.menuItemId === props.item.id)
  );
  if (existingOrder) {
    const orderItem = existingOrder.items.find(i => i.menuItemId === props.item.id); 
    return orderItem ? orderItem.quantity : 1;
  }
  return 1;
});

onMounted(() => {
  const exists = orderStore.orderMenuItem.some(ord => 
    ord.items.some(i => i.menuItemId === props.item.id)
  );
  if (exists) checked.value = true;
});

const totalPrice = computed(() => props.item.price * currentQuantity.value);

const handleclick = () => {
  checked.value = true;
  orderStore.addItemToOrder(props.item);
};

const addQte = () => {
  orderStore.addItemToOrder(props.item);
};

const removeQte = () => {
  const existingOrder = orderStore.orderMenuItem.find(ord => 
    ord.items.some(i => i.menuItemId === props.item.id)
  );
  if (existingOrder) {
    const existingItem = existingOrder.items.find(i => i.menuItemId === props.item.id);
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      existingOrder.totalPrice = existingItem.price * existingItem.quantity;
    } else if (existingItem && existingItem.quantity === 1) {
      orderStore.deleteOrderMenu(existingOrder.id!);
      checked.value = false;
    }
  }
};

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.src = logo;
};

const openDeleteDialog = () => {
  isDialogOpen.value = true;
};

const handleConfirmDelete = () => {
  menu.deleteMenuItem(props.item.id);
  isDialogOpen.value = false;
};

const handleEditClick = () => {
  emit("edit", props.item);
};
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col p-3">
    
    <div 
      @click="isDetailsOpen = true" 
      class="w-full h-40 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative cursor-pointer group"
    >
      <img 
        :src="item.image || logo" 
        :alt="item.name" 
        @error="handleImageError" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="bg-white/90 text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">View details</span>
      </div>

      <div class="absolute top-2 left-2 right-2 flex justify-between pointer-events-none">
        <div @click.stop.prevent="handleEditClick" class="w-8 h-8 bg-white/85 hover:bg-white rounded-full flex items-center justify-center cursor-pointer pointer-events-auto shadow-md transition-colors">
            <Pencil :size="16" class="text-gray-700" />
        </div>
        <div @click.stop.prevent="openDeleteDialog" class="w-8 h-8 bg-white/85 hover:bg-white rounded-full flex items-center justify-center cursor-pointer pointer-events-auto shadow-md transition-colors text-red-500">
            <Trash2 :size="16" />        
        </div>
      </div>
    </div>

    <DetailsItem
      :item="item"
      :isOpen="isDetailsOpen"
      :currentQuantity="currentQuantity"
      :totalPrice="totalPrice"
      :checked="checked"
      @close="isDetailsOpen = false"
      @add="handleclick"
      @remove="removeQte"
    />

    <DialogBox 
      :item="item" 
      :isOpen="isDialogOpen"
      mode="delete"
      @close="isDialogOpen = false"
      @confirm="handleConfirmDelete"
    />

    <div class="pt-3 px-1 pb-1 flex flex-col flex-grow">
      <h3 class="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1">{{ item.name }}</h3>
      <p class="text-xs text-gray-500 mb-3 line-clamp-2">{{ item.description }}</p>

      <div class="flex items-center mb-3">
        <div class="flex items-center gap-1 text-xs font-semibold text-gray-700">
          <Star :size="16" fill="#f59e0b" color="#f59e0b" />
          <span>{{ item.rating }} <span class="text-gray-400 font-normal">({{ item.reviews }})</span></span>
        </div>
      </div>

      <div class="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <span class="text-lg font-bold text-gray-900">${{ totalPrice.toFixed(0) }}</span>
        
        <div v-if="!checked" @click="handleclick">
          <Boutton title="Add" :haut="32" class="px-4 py-1 text-xs bg-amber-400 hover:bg-amber-500 font-bold rounded-xl shadow-xs" />
        </div>

        <div v-else class="flex items-center gap-2.5 font-semibold text-sm">
          <div @click="removeQte" class="cursor-pointer px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-md select-none transition-colors">-</div>
          <span class="text-gray-800">{{ currentQuantity }}</span>
          <div @click="addQte" class="cursor-pointer px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-md select-none transition-colors">+</div>
        </div>
      </div>
    </div>
  </div>
</template>