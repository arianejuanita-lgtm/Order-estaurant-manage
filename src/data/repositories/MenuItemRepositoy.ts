import { MenuItem } from "@/domain/entities/MenuItem";
import { apiClient } from "../datasources/apiClient";
interface IMenuItemRepository {
  getMenuItem(): Promise<MenuItem[]>;
  createMenuItem(menuItem: MenuItem): Promise<MenuItem>;
  updateMenuItem(menuItem: MenuItem): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;
}

export class MenuItemRepository implements IMenuItemRepository {
  async getMenuItem(): Promise<MenuItem[]> {
    const response = await apiClient.get(""); 
    const items = response.data.record.menu_items;

    return items.map(
      (item: any) =>
        new MenuItem({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          rating: item.rating,
          reviews: item.reviews,
          delivery_time: item.delivery_time,
          category: item.category,
          dietary: item.dietary,
          image: item.image,
          is_available: item.is_available,  
          portion_sizes: item.portion_sizes, 
        })
    );
  }

  async createMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    
    const getResponse = await apiClient.get("");
    const currentData = getResponse.data.record;
    const existingItems = currentData.menu_items || [];
    
    const updatedItems = [...existingItems, menuItem.toJSON()];
    
    await apiClient.put("", {
      ...currentData,
      menu_items: updatedItems
    });

alert("Création d'un menuitem : " + menuItem.name);

    return menuItem;
  }

  async updateMenuItem(menuItem: MenuItem): Promise<MenuItem> {
        console.log("modification d'un menuitem",menuItem);

    const getResponse = await apiClient.get("");
    const currentData = getResponse.data.record;
    const existingItems = currentData.menu_items || [];

    const updatedItems = existingItems.map((item: any) => 
      item.id === menuItem.id ? menuItem.toJSON() : item
    );

    await apiClient.put("", {
      ...currentData,
      menu_items: updatedItems
    });

    alert("modification d'un menuitem : " + menuItem.name);

    return menuItem;
  }

 async deleteMenuItem(id: number): Promise<void> {
    const getResponse = await apiClient.get("");
    const currentData = getResponse.data.record;
    const existingItems = currentData.menu_items || [];

    const updatedItems = existingItems.filter((item: any) => item.id !== id);

    await apiClient.put("", {
      ...currentData,
      menu_items: updatedItems
    });
  }


}