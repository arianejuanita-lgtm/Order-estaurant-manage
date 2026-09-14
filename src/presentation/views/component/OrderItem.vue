<script setup lang="ts">
import logo from "../../../assets/logo.png";
import { Trash2 } from "lucide-vue-next";
import { useOrder } from "@/presentation/stores/useOrder";
import { useMenuItem } from "@/presentation/stores/useMenuItem";
import { computed } from "vue";

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
  props.item.quantity++;
  console.log("prix de chaque order add", props.item.price);
};

const removeQuantity = () => {
  if (props.item.quantity > 1) {
    props.item.quantity--;
    console.log("prix de chaque order remove", props.item.price);
  }
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
  <div class="order-item-card">
    <div class="item-image-wrapper">
      <img
        :src="menuItemDetails?.image || logo"
        :alt="item.name"
        @error="handleImageError"
      />
    </div>

    <div class="item-details">
      <div class="item-info-top">
        <div class="text-info">
          <h4>{{ item.name }}</h4>
          <p v-if="menuItemDetails">{{ menuItemDetails.description }}</p>
          <p v-if="item.portionSize" class="portion-text">Portion: {{ item.portionSize }}</p>
        </div>
        <button class="delete-btn" @click="removeItem" aria-label="Remove item">
          <Trash2 :size="18" />
        </button>
      </div>

      <div class="item-info-bottom">
        <div class="qty-control">
          <button @click="removeQuantity" class="qty-btn" aria-label="Decrease quantity">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="addQuantity" class="qty-btn" aria-label="Increase quantity">+</button>
        </div>

        <div class="item-price">
          <p>${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-item-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #fafafa;
  border-radius: 12px;
  align-items: center;
  transition: background 0.2s;
}

.order-item-card:hover {
  background: #f5f5f5;
}

.item-image-wrapper img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 10px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-info-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.text-info h4 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.2rem 0;
  color: #222;
}

.text-info p {
  font-size: 0.85rem;
  color: #666;
  margin: 0;
}

.portion-text {
  font-size: 0.75rem;
  color: #888;
  margin-top: 2px !important;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: rgba(255, 77, 77, 0.1);
}

.item-info-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #ddd;
  padding: 2px 8px;
  border-radius: 8px;
  font-weight: 600;
}

.qty-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  color: #F5BE18;
  padding: 0 4px;
}

.qty-btn:hover {
  color: #F5BE18;
}

.item-price p {
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}
</style>