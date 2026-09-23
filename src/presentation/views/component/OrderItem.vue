<script setup lang="ts">
import logo from "../../../assets/logo.png";
import { Trash2 } from "lucide-vue-next";
import { useOrder } from "@/presentation/stores/useOrder";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { computed } from "vue";
import Plusmoin from "../comom/Plusmoin.vue";

const props = defineProps<{
  item: {
    menuItemId: number;
    name: string;
    price: number;
    quantity: number;
    portionSize?: string;
  };
  orderId: number;
}>();

const orderStore = useOrder();
const menuItemsStore = useMenuItem();

const menuItemDetails = computed(() => {
  return menuItemsStore.menuItems.find((x) => x.id === props.item.menuItemId);
});

const addQuantity = () => {
  orderStore.incrementItemQuantity(props.item.menuItemId);
};

const removeQuantity = () => {
  orderStore.decrementItemQuantity(props.item.menuItemId);
};

const removeItem = () => {
  orderStore.deleteOrderMenu(props.orderId);
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = logo;
};

console.log("prix de chaque order", props.item.price);
</script>

<template>
  <div class="flex gap-4 p-4 bg-[#fafafa] rounded-xl items-center transition-colors duration-200 hover:bg-[#f5f5f5]">
    <div class="flex-shrink-0">
      <img
        :src="menuItemDetails?.image || logo"
        :alt="item.name"
        @error="handleImageError"
        class="w-[70px] h-[70px] object-cover rounded-[10px]"
      />
    </div>

    <div class="flex-1 flex flex-col gap-2">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="text-base font-semibold m-0 mb-[0.2rem] text-[#222]">{{ item.name }}</h4>
          <p v-if="menuItemDetails" class="text-[0.85rem] text-[#666] m-0">{{ menuItemDetails.description }}</p>
          <p v-if="item.portionSize" class="text-[0.75rem] text-[#888] mt-[2px] mb-0">Portion: {{ item.portionSize }}</p>
        </div>
        <button 
          class="bg-transparent border-none text-[#ff4d4d] cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-[#ff4d4d1a]" 
          @click="removeItem" 
          aria-label="Remove item"
        >
          <Trash2 :size="18" />
        </button>
      </div>

      <div class="flex justify-between items-center">
               <Plusmoin
           v-model:current-quantity="item.quantity"
    @add="addQuantity"
    @remove="removeQuantity"/>
     

        <div>
          <p class="font-bold text-[#1a1a1a] m-0">${{ (item.price * item.quantity).toFixed(0) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>