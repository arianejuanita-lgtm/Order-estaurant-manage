import { Category } from "@/domain/entities/Category";
import { PriceRange } from "@/domain/entities/PriceRange";
import { PortionSize } from "@/domain/entities/PortionSize";
import { Dietary } from "@/domain/entities/Dietary";
import { apiClient } from "../datasources/apiClient";

interface IFilterRepository {
  getCategories(): Promise<Category[]>;
  getPriceRange(): Promise<PriceRange[]>;
  getPortionSize(): Promise<PortionSize[]>;
  getDietary(): Promise<Dietary[]>;
}

export class FilterRepository implements IFilterRepository {
  async getCategories(): Promise<Category[]> {
    const response = await apiClient.get("/categories");
    return response.data.filters.categories.map(
      (item: any) =>
        new Category({
          id: item.id,
          label: item.label,
          icon: item.icon,
        }),
    );
  }

  async getDietary(): Promise<Dietary[]> {
    const response = await apiClient.get("/dietary");
    return response.data.filters.dietary.map(
      (item: any) =>
        new Dietary({
          id: item.id,
          label: item.label,
        }),
    );
  }

  async getPortionSize(): Promise<PortionSize[]> {
    const response = await apiClient.get("portion_sizes");
    return response.data.filters.portion_sizes.map(
      (item: any) =>
        new PortionSize({
          id: item.id,
          label: item.label,
        }),
    );
  }

  async getPriceRange(): Promise<PriceRange[]> {
    const response = await apiClient.get("/price_range");
    return response.data.filters.price_range.map(
      (item: any) =>
        new PriceRange({
          min: item.min,
          max: item.max,
        }),
    );
  }
}
