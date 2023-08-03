import { Category } from "./category";
import { ShoppingCart } from "./shopping-cart";

export class Item {

    id!: number;
    quantity!: number;
    price!: number;
    title!: string;
    imageUrl!: string;
    category!: Category;

    constructor(init?: Partial<Item>) {
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}