import { Supplement } from "./Supplement";
// export interface IVariants {
//   id: string;
//   label: string;
//   subtitle: string;
//   price: number;
//   status: string;
//   is_default: boolean;
//   is_popular: boolean;
// }

export interface IStock {
  quantity: number;
  alert_threshold: number;
  sold_by_unit: boolean;
  in_stock: boolean;
}
export interface ISalesModes {
  dine_in: boolean;
  takeaway: boolean;
  delivery: boolean;
}

export interface IStats {
  sales_7d: number;
  revenue_7d: number;
  orders_7d: number;
  trend_percent: number;
}
export interface IMenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  delivery_time: string;
  preparation_time: string;
  category: string;
  category_id: string;
  dietary: string[];
  image: string;
  gallery: string[];
  is_available: boolean;
  is_popular: boolean;
  status: ItemStatus;
  stock: IStock;
  vat: number;
  portion_sizes: string[];
  sales_modes: ISalesModes[];
  // variants: IVariants[];
  supplements: Supplement[];
  stats: IStats;
  created_at: string;
  updated_at: string;
}

export type ItemStatus = "available" | "out_of_stock" | "hidden";

export class MenuItem {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public rating: number;
  public reviews: number;
  public deliveryTime: string;
  public preparationTime: string;
  public category: string;
  public categoryId: string;
  public dietary: string[];
  public image: string;
  public gallery: string[];
  public isAvailable: boolean;
  public isPopular: boolean;
  public status: ItemStatus;
  public stock: IStock;
  public vat: number;
  public portionSizes: string[];
  public salesModes: ISalesModes[];
  // public variants: IVariants[];
  public supplements: Supplement[];
  public stats: IStats;
  public createdAt: string;
  public updatedAt: string;

  constructor(props: IMenuItemProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.rating = props.rating;
    this.reviews = props.reviews;
    this.deliveryTime = props.delivery_time;
    this.category = props.category;
    this.dietary = props.dietary;
    this.image = props.image;
    this.isAvailable = props.is_available;
    this.portionSizes = props.portion_sizes;
    this.preparationTime = props.preparation_time;
    this.categoryId = props.category_id;
    this.gallery = props.gallery;
    this.isPopular = props.is_popular;
    this.status = props.status;
    this.salesModes = props.sales_modes;
    // this.variants = props.variants;
    this.stock = props.stock;
    this.vat = props.vat;
    this.supplements = props.supplements;
    this.stats = props.stats;
    this.createdAt = props.created_at;
    this.updatedAt = props.updated_at;
  }

  public isVegetarian(): boolean {
    return (
      this.dietary.includes("Vegetarian") || this.dietary.includes("Vegan")
    );
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      rating: this.rating,
      reviews: this.reviews,
      delivery_time: this.deliveryTime,
      category: this.category,
      dietary: this.dietary,
      image: this.image,
      is_available: this.isAvailable,
      portion_sizes: this.portionSizes,
      preparation_time: this.preparationTime,
      category_id: this.categoryId,
      gallery: this.gallery,
      is_popular: this.isPopular,
      status: this.status,
      sales_modes: this.salesModes,
      // variants: this.variants,
      stock: this.stock,
      vat: this.vat,
      supplements: this.supplements,
      stats: this.stats,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
    };
  }
}
