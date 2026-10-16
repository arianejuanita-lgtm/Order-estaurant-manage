import { MenuItem } from "@/domain/entities/MenuItem";
import { apiClient } from "../datasources/apiClient";
import { dbDataSource } from "@/rxBD/db";

interface IMenuItemRepository {
  getMenuItem(): Promise<MenuItem[]>;
  createMenuItem(menuItem: MenuItem): Promise<MenuItem>;
  updateMenuItem(menuItem: MenuItem): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;
}

export class MenuItemRepository implements IMenuItemRepository {
  
  async getMenuItem(): Promise<MenuItem[]> {
    try {
      let localItems = await dbDataSource.getAll();

      if (!localItems || localItems.length === 0) {
        console.log('Cache local vide. Chargement initial depuis l\'API...');
        const response = await apiClient.get(""); 
        const apiItems = response.data.record.menu_items || [];

        for (const item of apiItems) {
          const menuItem = new MenuItem({
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
            is_popular: item.isPopular ?? item.is_popular,
            status: item.status,
            sales_modes: item.sales_modes,
            variants: item.variants,
            stock: item.stock,
            vat: item.vat,
            supplements: item.supplements,
            stats: item.stats,
            created_at: item.created_at,
            updated_at: item.updated_at,
          });
          
          await dbDataSource.add(menuItem.toJSON());
        }

        localItems = await dbDataSource.getAll();
      } else {
        console.log('Utilisation des données du cache local (IndexedDB)');
      }

      return localItems.map((item: any) => new MenuItem(item));

    } catch (error) {
      console.warn("Erreur réseau, utilisation exclusive du cache local IndexedDB", error);
      const localItems = await dbDataSource.getAll();
      return localItems.map((item: any) => new MenuItem(item));
    }
  }

async createMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    const rawData = JSON.parse(JSON.stringify(menuItem.toJSON ? menuItem.toJSON() : menuItem));
    
    const { id, ...dataToSave } = rawData;

    const newId = await dbDataSource.add(dataToSave);
    
    const savedData = { ...dataToSave, id: Number(newId) };
    
    console.log('Élément ajouté avec succès dans le cache local :', savedData);

    return new MenuItem({
      id: savedData.id,
      name: savedData.name,
      description: savedData.description,
      price: savedData.price,
      rating: savedData.rating,
      reviews: savedData.reviews,
      delivery_time: savedData.delivery_time ,
      preparation_time: savedData.preparation_time,
      category: savedData.category,
      category_id: savedData.category_id,
      dietary: savedData.dietary,
      image: savedData.image,
      is_available: savedData.is_available ?? savedData.isAvailable ?? true,
      is_popular: savedData.is_popular ?? savedData.isPopular ?? false,
      status: savedData.status,
      portion_sizes: savedData.portion_sizes,
      sales_modes: savedData.sales_modes,
      variants: savedData.variants,
      stock: savedData.stock,
      vat: savedData.vat,
      supplements: savedData.supplements,
      stats: savedData.stats,
      gallery: savedData.gallery,
      created_at: savedData.created_at,
      updated_at: savedData.updated_at,
    });
  }

  async updateMenuItem(menuItem: MenuItem): Promise<MenuItem> {
    const dataToSave = menuItem.toJSON ? menuItem.toJSON() : { ...menuItem };

    await dbDataSource.update(dataToSave);
    console.log('Élément mis à jour dans le cache local :', dataToSave);

    return menuItem;
  }

  async deleteMenuItem(id: number): Promise<void> {
       await dbDataSource.delete(id);
    console.log(`Élément ${id} supprimé du cache local`);
  }
}








// import { MenuItem } from "@/domain/entities/MenuItem";
// import { apiClient } from "../datasources/apiClient";
// import { dbService } from "@/rxBD/db";

// interface IMenuItemRepository {
//   getMenuItem(): Promise<MenuItem[]>;
//   createMenuItem(menuItem: MenuItem): Promise<MenuItem>;
//   updateMenuItem(menuItem: MenuItem): Promise<MenuItem>;
//   deleteMenuItem(id: number): Promise<void>;
// }

// export class MenuItemRepository implements IMenuItemRepository {
  
//   async getMenuItem(): Promise<MenuItem[]> {
//     try {
//       const response = await apiClient.get(""); 
//       const items = response.data.record.menu_items || [];

//       console.log('Fetch items from API, now storing in local IndexedDB...');

//       const menuItems = items.map(
//         (item: any) =>
//           new MenuItem({
//             id: item.id,
//             name: item.name,
//             description: item.description,
//             price: item.price,
//             rating: item.rating,
//             reviews: item.reviews,
//             delivery_time: item.delivery_time,
//             category: item.category,
//             dietary: item.dietary,
//             image: item.image,
//             is_available: item.is_available,
//             portion_sizes: item.portion_sizes,
//             preparation_time: item.preparation_time,
//             category_id: item.category_id,
//             gallery: item.gallery,
//             is_popular: item.isPopular ?? item.is_popular,
//             status: item.status,
//             sales_modes: item.sales_modes,
//             variants: item.variants,
//             stock: item.stock,
//             vat: item.vat,
//             supplements: item.supplements,
//             stats: item.stats,
//             created_at: item.created_at,
//             updated_at: item.updated_at,
//           })
//       );

//       for (const menuItem of menuItems) {
//         await dbService.update(menuItem.toJSON());
//       }

//       return menuItems;

//     } catch (error) {
//       console.warn("API unreachable, falling back to local IndexedDB data...", error);
      
//       const localItems = await dbService.getAll();
//       return localItems.map((item: any) => new MenuItem(item));
//     }
//   }

//   async createMenuItem(menuItem: MenuItem): Promise<MenuItem> {
//     const getResponse = await apiClient.get("");
//     const currentData = getResponse.data.record;
//     const existingItems = currentData.menu_items || [];
    
//     const updatedItems = [...existingItems, menuItem.toJSON()];
    
//     await apiClient.put("", {
//       ...currentData,
//       menu_items: updatedItems
//     });

//     console.log('dbService.add', dbService.add(menuItem.toJSON()));
//     await dbService.add(menuItem.toJSON());

//     return menuItem;
//   }

//   async updateMenuItem(menuItem: MenuItem): Promise<MenuItem> {
//     const getResponse = await apiClient.get("");
//     const currentData = getResponse.data.record;
//     const existingItems = currentData.menu_items || [];

//     const updatedItems = existingItems.map((item: any) => 
//       item.id === menuItem.id ? menuItem.toJSON() : item
//     );

//     await apiClient.put("", {
//       ...currentData,
//       menu_items: updatedItems
//     });

//     await dbService.update(menuItem.toJSON());

//     return menuItem;
//   }

//  async deleteMenuItem(id: number): Promise<void> {
//     const getResponse = await apiClient.get("");
//     const currentData = getResponse.data.record;
//     const existingItems = currentData.menu_items || [];

//     const updatedItems = existingItems.filter((item: any) => item.id !== id);

//     await apiClient.put("", {
//       ...currentData,
//       menu_items: updatedItems
//     });

//     await dbService.delete(id);
//   }
// }