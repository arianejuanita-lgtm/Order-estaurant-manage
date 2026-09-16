<script setup lang="ts">
import { computed, ref } from 'vue';
import { useOrder } from '@/presentation/stores/useOrder';
import { Order } from '@/domain/entities/Order';
import { router } from '@/router/routes';

const props = defineProps<{
  subTotal: number;
}>();

const orderStore = useOrder();
const isLoading = ref(false); 

const tax = computed(() => props.subTotal * 0.1925);
const packagingFee = 5;
const total = computed(() => props.subTotal + tax.value + packagingFee);

const handleConfirm = async () => {
  if (isLoading.value) return;
  isLoading.value = true;

  try {
    const allItems = orderStore.orderMenuItem.flatMap(ord => ord.items);

    const newOrder = new Order({
      id: Date.now(),
      items: allItems,
      totalPrice: total.value,
      status: "finish",
      createdAt: new Date().toISOString()
    });

    await orderStore.createOrderMenuItem(newOrder);
    
    orderStore.orderMenuItem = [];
    
    router.push('/');
  } catch (error) {
    console.error("Erreur lors de la validation de la commande", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full">
    <h3 class="text-[1.2rem] font-bold mb-[0.2rem] text-neutral-900">Transparent Billing</h3>
    <p class="text-[0.85rem] text-neutral-500 mb-6">Payment Details</p>

    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center text-[0.95rem] text-neutral-700">
        <p class="m-0">Items Subtotal</p>
        <p class="m-0">${{ subTotal.toFixed(0) }}</p>
      </div>

      <div class="flex justify-between items-center text-[0.95rem] text-neutral-700">
        <p class="m-0">Delivery</p>
        <p class="m-0 text-emerald-600 font-semibold">Free</p>
      </div>

      <div class="flex justify-between items-center text-[0.95rem] text-neutral-700">
        <p class="m-0">Tax (VAT 19.25%)</p>
        <p class="m-0">${{ tax.toFixed(0) }}</p>
      </div>

      <div class="flex justify-between items-center text-[0.95rem] text-neutral-700">
        <p class="m-0">Packaging Service Fee</p>
        <p class="m-0">${{ packagingFee.toFixed(0) }}</p>
      </div>

      <div class="h-[1px] bg-neutral-200 my-2"></div>

      <div class="flex justify-between items-center font-bold text-[1.1rem] text-neutral-900">
        <p class="m-0">Net Total to Pay</p>
        <p class="m-0">${{ total.toFixed(0) }}</p>
      </div>

      <button 
        @click="handleConfirm"
        :disabled="isLoading"
        class="mt-4 w-full bg-[#F5BE18] hover:bg-[#e0ab12] active:scale-[0.98] border-none p-[0.85rem] rounded-[10px] text-base font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <!-- Spinner SVG du loader -->
        <svg 
          v-if="isLoading" 
          class="animate-spin h-5 w-5 text-neutral-900" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <span>{{ isLoading ? 'Processing...' : `Confirm & Pay $${total.toFixed(0)}` }}</span>
      </button>
    </div>
  </div>
</template>