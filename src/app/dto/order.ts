import { Item } from "./item";
import { ShoppingCart } from "./shopping-cart";

export class Order {

    id!: string;
    items!: any[]
    datePlaced!: number;
    userId!: string;
    shipping: any;
    shoppingCart!: ShoppingCart;

    constructor(init?: Partial<Order>) {

        Object.assign(this, init);

        if (this.shoppingCart) {

            this.datePlaced = new Date().getTime();
            this.items = this.shoppingCart.items.map(item => {
                return {

                    title: item.title,
                    imageUrl: item.imageUrl,
                    quantity: item.quantity,
                    totalPrice: item.totalPrice
                }
            })
        }

    }

    get totalPrice() {

        let sum = 0;
        for (let itemId in this.items) {
            sum += this.items[itemId].totalPrice;
        }
        return sum;
    }
}