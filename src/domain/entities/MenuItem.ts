export interface IMenuItemProps {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  delivery_time: string;
  category: string;
  dietary: string[];
  image: string;
  is_available: boolean;
  portion_sizes: string[];
}
// export interface MenuItem {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   rating: number;
//   reviews: number;
//   delivery_time: string;
//   preparation_time: number;
//   category: string;
//   category_id: string;
//   dietary: string[];
//   image: string;
//   gallery: string[];
//   is_available: boolean;
//   is_popular: boolean;
//   is_new: boolean;
//   status: ItemStatus;
//   stock: Stock;
//   vat: number;
//   portion_sizes: string[];
//   sales_modes: SalesModes;
//   variants: Variant[];
//   supplements: Supplement[];
//   stats: ItemStats;
//   created_at: string;
//   updated_at: string;
// }

export type ItemStatus = 'available' | 'out_of_stock' | 'hidden';

export class MenuItem {
  public id: number;
  public name: string;
  public description: string;
  public price: number;
  public rating: number;
  public reviews: number;
  public deliveryTime: string;
  public category: string;
  public dietary: string[];
  public image: string;
  public isAvailable: boolean;
  public portionSizes: string[];

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
  }
  
  public isVegetarian(): boolean {
    return this.dietary.includes('Vegetarian') || this.dietary.includes('Vegan');
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
    };
  }
}