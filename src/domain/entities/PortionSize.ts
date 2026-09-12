export interface IPortionSizeProps {
  id: string;
  label: string;
}

export class PortionSize {
  public id: string;
  public label: string;

  constructor(props: IPortionSizeProps) {
    this.id = props.id;
    this.label = props.label;
  }

  public toJSON() {
    return {
      id: this.id,
      label: this.label,
    };
  }
}