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
      preparation_time: item.preparation_time,
      category_id: item.category_id,
      gallery: item.gallery,
      is_popular: item.isPopular,
      status: item.status,
      sales_modes: item.sales_modes,
      variants: item.variants,
      stock: item.stock,
      vat: item.vat,
      supplements: item.supplements,
      stats: item.stats,
      created_at: item.created_at,
      updated_at: item.updated_at,
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