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
    console.log('items',items);

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
     const response = await apiClient.post("/menu_items",menuItem.toJSON());
     const item=response.data.record.menu_items;
     return new MenuItem({
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
  }

async updateMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    const response = await apiClient.put(`/menu_items/${menuItem.id}`, menuItem.toJSON());
    
    const item = response.data.record.menu_items;
    return new MenuItem({
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
 }

  async deleteMenuItem(id: number): Promise<void> {
    await apiClient.delete(`/menu_items/${id}`);
  }
}
