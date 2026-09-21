export interface ISupplement {
  id: string;
  label: string;
  price: number;
  icon: string;
}

export class Supplement{
  public id: string;
  public label:string;
  public price:number;
  public icon:string;

  constructor(props:ISupplement){
    this.id = props.id;
    this.label= props.label;
    this.price=props.price;
    this.icon=props.icon;
  }

  public toJSON(){
    return{
      id:this.id,
      label:this.label,
      price:this.price,
      icon:this.icon
    };
  }
}