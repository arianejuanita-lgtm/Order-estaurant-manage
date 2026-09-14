export interface OrderItem {
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  portionSize?: string;
}

export interface OrderProps {
  id?: number ;
  items: OrderItem[];
  totalPrice: number;
  status: string; 
  createdAt?: string | Date;
}

export class Order {
  public id?: number ;
  public items: OrderItem[];
  public totalPrice: number;
  public status: string;
  public createdAt: string | Date;

  constructor(props: OrderProps) {
    this.id = props.id;
    this.items = props.items;
    this.totalPrice = props.totalPrice;
    this.status = props.status;
    this.createdAt = props.createdAt || new Date();
  }

  public toJSON() {
    return {
      id: this.id,
      items: this.items,
      totalPrice: this.totalPrice,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}