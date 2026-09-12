export interface ICategoryProps {
  id: string;
  label: string;
  icon: string;
}

export class Category {
  public id: string;
  public label: string;
  public icon: string;

  constructor(props: ICategoryProps) {
    this.id = props.id;
    this.label = props.label;
    this.icon = props.icon;
  }

  public toJSON() {
    return {
      id: this.id,
      label: this.label,
      icon: this.icon,
    };
  }
}