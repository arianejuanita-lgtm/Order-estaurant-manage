import { defineStore } from "pinia";
import { MenuItemRepository } from "@/data/repositories/MenuItemRepositoy";
import { MenuItem } from "@/domain/entities/MenuItem";
import { ref } from "vue";

const menuItemRepository = new MenuItemRepository();

export const useMenuItem = defineStore("menuItem", () => {
  const menuItems = ref<MenuItem[]>([]);

  async function fecthMenuItems() {
    try {
      menuItems.value = await menuItemRepository.getMenuItem();
    } catch (error) {
      console.log(error);
    }
  }

  async function addMenuItem(item: MenuItem) {
    try {
      const created = await menuItemRepository.createMenuItem(item);
      menuItems.value.unshift(created);
      await fecthMenuItems();
    } catch (error) {
      console.log("erreur de creation", error);
    }
  }

  async function updatedMenuItem(item: MenuItem) {
    try {
      const updated = await menuItemRepository.updateMenuItem(item);
      const index = menuItems.value.findIndex((m) => m.id === updated.id);
      if (index !== -1) {
        menuItems.value[index] = updated;
      }
      await fecthMenuItems();
    } catch (error) {
      console.log("erreur de modification", error);
    }
  }

  async function deleteMenuItem(id: number) {
    try {
      await menuItemRepository.deleteMenuItem(id);
      menuItems.value = menuItems.value.filter((item) => item.id !== id);
      await fecthMenuItems();
    } catch (error) {
      console.log("erreur de suppression", error); 
    }
  }

  async function allMenuItem() {
    await fecthMenuItems();
  }

  return {
    menuItems,
    addMenuItem,
    updatedMenuItem,
    fecthMenuItems,
    deleteMenuItem,
    allMenuItem
  };
});