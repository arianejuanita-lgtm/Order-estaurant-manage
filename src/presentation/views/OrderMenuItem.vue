<script setup lang="ts">
import { computed } from "vue";
import Orderitem from "./component/OrderItem.vue";
import Facture from "./component/Facture.vue";
import { useOrder } from "../stores/useOrder";

const orderStore = useOrder();

const subTotal = computed(() => {
  return orderStore.orderMenuItem.reduce((acc, order) => {
    return acc + order.totalPrice;
  }, 0);
});
</script>

<template>
  <div class="order-container">
    <div class="order-header">
      <h1>Order Summary</h1>
      <p>Verify your items before confirming the order</p>
    </div>

    <div class="order-grid">
      <div class="recap-card">
        <div class="recap-header">
          <h3>Your Selected Delicacies</h3>
          <span class="badge"
            >{{ orderStore.orderMenuItem.length }} recipes</span
          >
        </div>

        <div v-if="orderStore.orderMenuItem.length === 0" class="empty-state">
          <p>Your cart is currently empty.</p>
        </div>

        <div v-else class="items-list">
          <div v-for="ord in orderStore.orderMenuItem" :key="ord.id">
            <div v-for="item in ord.items" :key="item.menuItemId">
              <Orderitem :item="item" :orderId="ord.id!" />
            </div>
          </div>
        </div>
      </div>

      <div class="invoice-card">
        <Facture :subTotal="subTotal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: "Inter", sans-serif;
  color: #2c3e50;
}

.order-header {
  margin-bottom: 2rem;
}

.order-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.order-header p {
  color: #666;
  font-size: 0.95rem;
}

.order-grid {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.recap-card,
.invoice-card {
  background: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaeaea;
}

.recap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f0f0f0;
}

.recap-header h3 {
  font-size: 1.1rem;
  font-weight: 600;
}

.badge {
  background: #F5BE18;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #888;
}

@media (max-width: 900px) {
  .order-grid {
    grid-template-columns: 1fr;
  }
}
</style>
