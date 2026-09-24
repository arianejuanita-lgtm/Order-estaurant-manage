<script setup lang="ts">
import { Star, Pencil, Trash2 } from "lucide-vue-next";
import Boutton from "../comom/Boutton.vue";
import logo from "../../../assets/logo.png";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { useOrder } from "@/presentation/stores/useOrder.ts";
import { ref, computed, onMounted } from "vue";
import DialogBox from "../comom/DialogBox.vue";
import DetailsItem from "../DetailsItem.vue";
import type { MenuItem } from "@/domain/entities/MenuItem";
import { useRouter } from "vue-router";
import Suppersed from "../comom/Suppersed.vue";
import Pencilc from "../comom/Pencilc.vue";
import Truckc from "../comom/Truckc.vue";
import Reviews from "../comom/Reviews.vue";
import Plusmoin from "../comom/Plusmoin.vue";
import Loading from "../comom/Loading.vue"; 

const orderStore = useOrder();
const menu = useMenuItem();
const checked = ref<boolean>(false);
const isDialogOpen = ref<boolean>(false);
const isDetailsOpen = ref<boolean>(false);
const router = useRouter();
const isLoading = ref<boolean>(false);

const props = defineProps<{
  item: MenuItem;
}>();

const currentQuantity = computed({
  get: () => {
    const existingOrder = orderStore.orderMenuItem.find((ord) =>
      ord.items.some((i) => i.menuItemId === props.item.id),
    );
    if (existingOrder) {
      const orderItem = existingOrder.items.find(
        (i) => i.menuItemId === props.item.id,
      );
      return orderItem ? orderItem.quantity : 1;
    }
    return 1;
  },
  set: (newVal: number) => {
    const existingOrder = orderStore.orderMenuItem.find((ord) =>
      ord.items.some((i) => i.menuItemId === props.item.id),
    );
    if (existingOrder) {
      const existingItem = existingOrder.items.find(
        (i) => i.menuItemId === props.item.id,
      );
      if (existingItem) {
        existingItem.quantity = newVal < 1 ? 1 : newVal;
        existingOrder.totalPrice = existingItem.price * existingItem.quantity;
      }
    }
  }
});

onMounted(() => {
  const exists = orderStore.orderMenuItem.some((ord) =>
    ord.items.some((i) => i.menuItemId === props.item.id),
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
  const existingOrder = orderStore.orderMenuItem.find((ord) =>
    ord.items.some((i) => i.menuItemId === props.item.id),
  );
  if (existingOrder) {
    const existingItem = existingOrder.items.find(
      (i) => i.menuItemId === props.item.id,
    );
    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity--;
      existingOrder.totalPrice = existingItem.price * existingItem.quantity;
    } else if (existingItem && existingItem.quantity === 1) {
      
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

const handleConfirmDelete = async () => {
    isDialogOpen.value = false; 
    isLoading.value = true;     
    
    try {
        await menu.deleteMenuItem(props.item.id);
    } catch (error) {
        console.error("Erreur lors de la suppression", error);
        isLoading.value = false; 
    }
};

const handleEditClick = (menuId: number) => {
   router.push(`/edit-menu-item/${menuId}`);
};

const goToDetails = (menuId: number) => {
  router.push(`/detail-menu-item/${menuId}`);
};
</script>

<template>
  <div
    class="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col p-3"
  >
    <div v-if="isLoading" class="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-50 flex items-center justify-center">
        <Loading :isLoading="isLoading"/>
    </div>

    <div
      @click="goToDetails(item.id)"
      class="w-full h-40 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative cursor-pointer group"
    >
      <img
        :src="item.image || logo"
        :alt="item.name"
        @error="handleImageError"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />

      <div
        class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
      >
        <span
          class="bg-white/90 text-gray-800 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
          >View details</span
        >
      </div>

      <Suppersed>
        <template #left>
          <Pencilc :click="()=>handleEditClick(item.id)" />
        </template>
        <template #right>
          <Truckc :click="openDeleteDialog" />
        </template>
      </Suppersed>
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
      <h3 class="text-base font-semibold text-gray-900 mb-1.5 line-clamp-1">
        {{ item.name }}
      </h3>
      <p class="text-xs text-gray-500 mb-3 line-clamp-2">
        {{ item.description }}
      </p>

      <Reviews :rating="item.rating" :reviews="item.reviews"/>

      <div
        class="flex justify-between items-center mt-auto pt-2 border-t border-gray-100"
      >
        <span class="text-lg font-bold text-gray-900"
          >${{ totalPrice.toFixed(0) }}</span
        >

        <div v-if="!checked" @click="handleclick">
          <Boutton
            title="Add"
            :haut="32"
            class="px-4 py-1 text-xs bg-amber-400 hover:bg-amber-400 font-bold rounded-xl shadow-xs"
          />
        </div>

        <div v-else class="flex items-center gap-2.5 font-semibold text-sm">
          <Plusmoin
           v-model:current-quantity="currentQuantity"
           @add="addQte"
           @remove="removeQte"/>
        </div>
      </div>
    </div>
  </div>
</template>