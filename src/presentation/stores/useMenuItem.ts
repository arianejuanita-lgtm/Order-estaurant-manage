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
  } catch (error: any) {
    console.error("erreur de creation", error.response?.data || error);
  }
}

async function updatedMenuItem(item: MenuItem) {
  try {
    const updated = await menuItemRepository.updateMenuItem(item);
    const index = menuItems.value.findIndex((m) => m.id === updated.id);
    if (index !== -1) {
      menuItems.value[index] = updated;
    }
  } catch (error: any) {
    console.error("erreur de modification", error.response?.data || error);
  }
}

async function deleteMenuItem(id: number) {
  try {
    await menuItemRepository.deleteMenuItem(id);
    menuItems.value = menuItems.value.filter((item) => item.id !== id);
  } catch (error: any) {
    console.error("erreur de suppression", error);
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