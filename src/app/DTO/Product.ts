import { Categorie } from "./Categorie";
import { ProductColorSizes } from "./ProductColorSizes";

export class Product {
    id: number;
    label: string;
    description: string;
    date: Date;
    categories: Set<Categorie>;
    link: string;
    majority: string;
    gender: string;
    productColorSizes: Set<ProductColorSizes>;
}