export interface IStep{
    id: number;
    title: string;
    description: string;
}

export const steps: IStep[] = [
    { 
        id: 1,
        title: "Basic Information",
        description: "Start with the main details of your product"
    },
    { 
        id: 2,
        title: "Pricing and Variants",
        description: "Define the base price and options if necessary"
    },
    { 
        id: 3,
        title: "Availability and Sales",
        description: "Choose where and how you will sell this product"
    },
    { 
        id: 4,
        title: "Advanced Information",
        description: "Add extra details to better manage your product"
    },
];