import { defineStore } from "pinia";
import { MenuItemRepository } from "@/data/repositories/MenuItemRepositoy";
import { MenuItem } from "@/domain/entities/MenuItem";
import { ref, computed } from "vue";

const menuItemRepository = new MenuItemRepository();

export const useMenuItem = defineStore("menuItem", () => {
  const menuItems = ref<MenuItem[]>([]);

  async function fecthMenuItems() {
    try {
      menuItems.value = await menuItemRepository.getMenuItem();
    } catch (error) {
      console.log(error);
    } finally {
      console.log(menuItems.value);
    }
  }

  async function addMenuItem(item: MenuItem) {
    try {
      const newMenuItem = new MenuItem({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        delivery_time: item.deliveryTime,
        category: item.category,
        dietary: item.dietary,
        image: item.image,
        is_available: item.isAvailable,
        portion_sizes: item.portionSizes,
      });

      const created = await menuItemRepository.createMenuItem(newMenuItem);
      menuItems.value.unshift(created);
    } catch (error) {
      console.log("erreur de creation", error);
    } finally {
      console.log("menu item cree", menuItems.value);
    }
  }

   async function updatedMenuItem(item: MenuItem) {
    try {
      const updatedMenuItem = new MenuItem({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        rating: item.rating,
        reviews: item.reviews,
        delivery_time: item.deliveryTime,
        category: item.category,
        dietary: item.dietary,
        image: item.image,
        is_available: item.isAvailable,
        portion_sizes: item.portionSizes,
      });

      const updated = await menuItemRepository.updateMenuItem(updatedMenuItem);
      menuItems.value
    } catch (error) {
      console.log("erreur de modification", error);
    } finally {
      console.log("menu item modifie", menuItems.value);
    }
  }

  async function deleteMenuItem(id:number) {
    try {
        await menuItemRepository.deleteMenuItem(id);
        menuItems.value = menuItems.value.filter((item)=> item.id !== id);
    } catch (error) {
        console.log("erreur de suppression", error); 
    }finally{

    }
    
  }

  return {
    menuItems,
    addMenuItem,
    updatedMenuItem,
    fecthMenuItems,
    deleteMenuItem

  };


});
