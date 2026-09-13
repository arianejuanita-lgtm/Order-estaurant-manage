<script setup lang="ts">
import { Star, Pencil, Trash2 } from "lucide-vue-next";
import Boutton from "../comom/Boutton.vue";
import logo from '../../../assets/logo.png';
import { useMenuItem } from "@/presentation/stores/useMenuItem";

const menu = useMenuItem();

defineProps<{
    item:{
        id:number,
        name:string,
        description:string,
        price:number,
        rating:number,
        reviews:number,
        image:string
    }
}>();

const handleImageError = (event: Event) => {
    const target = event.target as HTMLImageElement;
    target.src = logo;
};
</script>

<template>
  <div class="food-card">
    <div class="food-image-wrapper">
      <img 
        :src="item.image || logo" 
        :alt="item.name" 
        @error="handleImageError" 
      />
      <div class="card-actions">
        <div class="action-btn">
            <Pencil :size="16" />
        </div>
        <div class="action-btn" @click="menu.deleteMenuItem(item.id)">
            <Trash2 :size="16" />        
        </div>
      </div>
    </div>

    <div class="food-info">
      <h3 class="food-name">{{ item.name }}</h3>
      <p class="food-description">{{ item.description }}</p>

      <div class="food-meta">
        <div class="rating">
          <Star class="star-icon" :size="16" fill="#f59e0b" color="#f59e0b" />
          <span>{{ item.rating }} <small>({{ item.reviews }})</small></span>
        </div>
      </div>

      <div class="food-footer">
        <span class="price">${{ item.price }}</span>
        <Boutton title="Add" :haut="20" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.food-card {
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  padding: 12px;
}

.food-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.food-image-wrapper {
  width: 100%;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.food-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-actions {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
}

.action-btn {
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #ffffff;
}

.food-info {
  padding: 12px 4px 4px 4px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.food-name {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 6px 0;
}

.food-description {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 0 0 12px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.food-meta {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

.rating small {
  color: #9ca3af;
  font-weight: normal;
}

.food-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #f3f4f6;
}

.price {
  font-size: 1.15rem;
  font-weight: 700;
  color: #059669;
}
</style>