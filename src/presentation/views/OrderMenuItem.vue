<script setup lang="ts">
import { computed } from "vue";
import Orderitem from "./component/OrderItem.vue";
import Facture from "./component/Facture.vue";
import { useOrder } from "../stores/useOrder";

const orderStore = useOrder();

const subTotal = computed(() => {
  return orderStore.orderMenuItem.reduce((acc, order) => {
    console.log("totalPrice order list menu items ",order.totalPrice);
    return acc + order.totalPrice;
  }, 0);
});
</script>

<template>
  <div class="max-w-[1200px] mx-auto py-8 px-4 font-['Inter',sans-serif] text-[#2c3e50]">
    <div class="mb-8">
      <h1 class="text-[2rem] font-bold text-[#1a1a1a] mb-2">Order Summary</h1>
      <p class="text-[#666] text-[0.95rem]">Verify your items before confirming the order</p>  
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
      <div class="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#eaeaea]">
        <div class="flex justify-between items-center mb-6 pb-3 border-b border-[#f0f0f0]">
          <h3 class="text-[1.1rem] font-semibold m-0">Your Selected Delicacies</h3>
          <span class="bg-[#F5BE18] py-1 px-3 rounded-[20px] text-[0.85rem] font-semibold"
            >{{ orderStore.orderMenuItem.length }} recipes</span
          >
        </div>

        <div v-if="orderStore.orderMenuItem.length === 0" class="text-center py-12 text-[#888]">
          <p class="m-0">Your cart is currently empty.</p>
        </div>

        <div v-else class="flex flex-col gap-4">
          <div v-for="ord in orderStore.orderMenuItem" :key="ord.id">
            <div v-for="item in ord.items" :key="item.menuItemId">
              <Orderitem :item="item" :orderId="ord.id!" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#eaeaea] h-fit">
        <Facture :subTotal="subTotal" />
      </div>
    </div>
  </div>
</template>