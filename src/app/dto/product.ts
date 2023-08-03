import { Category } from "./category";

export interface Product {

    id: number;
    title: string;
    price: number;
    category: Category;
    imageUrl: string;
}