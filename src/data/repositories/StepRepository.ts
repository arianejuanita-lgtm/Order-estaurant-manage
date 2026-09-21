export interface IStep{
    id :number;
    title:string;
    description:string;
}

export const steps : IStep[] =[
    { 
        id:1,
        title:"Informations de base",
        description:"Commencer par les informations principales de votre produit"
    },
        { 
        id:2,
        title:"Prix et variantes",
        description:"Definissez le prix de base des options si necessaire"
    },
        { 
        id:3,
        title:"Disponibilite et vente",
        description:"Choisissez ou et comment vous allez vendre ce produit "
    },
        { 
        id:4,
        title:"Informations avancees",
        description:"Ajoutez des details supplementaires pour mieux gerer votre produits"
    },
];