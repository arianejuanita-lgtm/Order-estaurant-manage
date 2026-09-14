<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFilter } from '../stores/useFilter';
import { useMenuItem } from '../stores/useMenuItem';
import { MenuItem } from '@/domain/entities/MenuItem';

const route = useRoute();
const router = useRouter();
const filterStore = useFilter();
const menuStore = useMenuItem();

const itemId = Number(route.params.id);

const form = reactive({
  id: itemId,
  name: '',
  description: '',
  price: 0,
  rating: 5,
  reviews: 0,
  delivery_time: '30 min',
  category: '',
  dietary: [] as string[],
  image: '',
  is_available: true,
  portion_sizes: [] as string[]
});

onMounted(async () => {
  // S'assurer que les données sont chargées
  if (menuStore.menuItems.length === 0) {
    await menuStore.fecthMenuItems();
  }
  
  const existingItem = menuStore.menuItems.find((m) => m.id === itemId);
  
  // Sécurité : si l'élément n'existe pas, on redirige vers l'accueil pour éviter la page blanche
  if (!existingItem) {
    console.warn("Élément introuvable avec l'ID :", itemId);
    router.push('/');
    return;
  }
  
  form.name = existingItem.name;
  form.description = existingItem.description;
  form.price = existingItem.price;
  form.rating = existingItem.rating;
  form.reviews = existingItem.reviews;
  form.delivery_time = existingItem.deliveryTime;
  form.category = existingItem.category;
  form.dietary = [...existingItem.dietary];
  form.image = existingItem.image;
  form.is_available = existingItem.isAvailable;
  form.portion_sizes = [...existingItem.portionSizes];
});

const handleSubmit = async () => {
  const updatedItem = new MenuItem({
    id: form.id,
    name: form.name,
    description: form.description,
    price: Number(form.price),
    rating: Number(form.rating),
    reviews: Number(form.reviews),
    delivery_time: form.delivery_time,
    category: form.category,
    dietary: form.dietary,
    image: form.image,
    is_available: form.is_available,
    portion_sizes: form.portion_sizes
  });

  await menuStore.updatedMenuItem(updatedItem);
  router.push('/');
};
</script>

<template>
  <div class="form-container">
    <h2>Edit Menu Item</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" v-model="form.description" required></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Price ($)</label>
          <input type="number" step="0.01" id="price" v-model.number="form.price" required />
        </div>

        <div class="form-group">
          <label for="delivery_time">Delivery Time</label>
          <input type="text" id="delivery_time" v-model="form.delivery_time" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="rating">Rating</label>
          <input type="number" step="0.1" min="0" max="5" id="rating" v-model="form.rating" />
        </div>

        <div class="form-group">
          <label for="reviews">Reviews</label>
          <input type="number" id="reviews" v-model.number="form.reviews" />
        </div>
      </div>

      <div class="form-group">
        <label for="category">Category</label>
        <select id="category" v-model="form.category" required>
          <option disabled value="">Select a category</option>
          <option v-for="cat in filterStore.categories" key="cat" :value="cat">
            {{ cat.label }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Dietary</label>
        <div class="checkbox-group">
          <label v-for="diet in filterStore.dietaries" key="diet" class="checkbox-label">
            <input type="checkbox" :value="diet.label || diet" v-model="form.dietary" />
            {{ diet.label }}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>Portion Sizes</label>
        <div class="checkbox-group">
          <label v-for="portion in filterStore.portionSizes" key="portion.id || portion" class="checkbox-label">
            <input type="checkbox" :value="portion.label || portion" v-model="form.portion_sizes" />
            {{ portion.label}}
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="image">Image URL</label>
        <input type="url" id="image" v-model="form.image" placeholder="https://..." />
      </div>

      <div class="form-group checkbox-row">
        <label>
          <input type="checkbox" v-model="form.is_available" />
          Available
        </label>
      </div>

      <button type="submit" class="submit-btn">Update</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: flex;
  gap: 16px;
}

.form-row .form-group {
  flex: 1;
}

label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #374151;
  margin-bottom: 6px;
}

input[type="text"],
input[type="number"],
input[type="url"],
select,
textarea {
  padding: 10px 12px;
  border: 1px solid gray;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: gray;
}

textarea {
  resize: vertical;
  height: 80px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: normal;
  font-size: 0.9rem;
  cursor: pointer;
}

.checkbox-row {
  flex-direction: row;
  align-items: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #F5BE18;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 10px;
}
</style>