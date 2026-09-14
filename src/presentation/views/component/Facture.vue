<script setup lang="ts">
import { computed } from 'vue';
import { useOrder } from '@/presentation/stores/useOrder';
import { Order } from '@/domain/entities/Order';
import { router } from '@/router/routes';

const props = defineProps<{
  subTotal: number;
}>();

const orderStore = useOrder();
const tax = computed(() => props.subTotal * 0.1925);
const packagingFee = 5;
const total = computed(() => props.subTotal + tax.value + packagingFee);

const handleConfirm = async () => {
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
};
</script>

<template>
  <div class="invoice-container">
    <h3>Transparent Billing</h3>
    <p class="subtitle">Payment Details</p>

    <div class="invoice-breakdown">
      <div class="row">
        <p>Items Subtotal</p>
        <p>${{ subTotal.toFixed(2) }}</p>
      </div>

      <div class="row">
        <p>Delivery</p>
        <p class="free">Free</p>
      </div>

      <div class="row">
        <p>Tax (VAT 19.25%)</p>
        <p>${{ tax.toFixed(2) }}</p>
      </div>

      <div class="row">
        <p>Packaging Service Fee</p>
        <p>${{ packagingFee.toFixed(2) }}</p>
      </div>

      <div class="divider"></div>

      <div class="row total-row">
        <p>Net Total to Pay</p>
        <p>${{ total.toFixed(2) }}</p>
      </div>

      <button class="pay-btn" @click="handleConfirm">
        <span>Confirm & Pay ${{ total.toFixed(2) }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.invoice-container h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
  color: #1a1a1a;
}

.subtitle {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.invoice-breakdown {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  color: #444;
}

.row p {
  margin: 0;
}

.free {
  color: #2e7d32;
  font-weight: 600;
}

.divider {
  height: 1px;
  background: #eee;
  margin: 0.5rem 0;
}

.total-row {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.pay-btn {
  margin-top: 1rem;
  width: 100%;
  background: #F5BE18;
  border: none;
  padding: 0.85rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.pay-btn:hover {
  background: #e0ab12;
}

.pay-btn:active {
  transform: scale(0.98);
}
</style>