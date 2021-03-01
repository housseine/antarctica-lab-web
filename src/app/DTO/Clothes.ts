import { Categorie } from "./Categorie";

export class Clothes {
    id: number;
    label: string;
    description: string;
    date: Date;
    categories: Set<Categorie>;
}