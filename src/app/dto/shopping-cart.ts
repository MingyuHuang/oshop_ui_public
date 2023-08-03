import { Item } from "./item";
import { Product } from "./product";

export class ShoppingCart {

    private _createdDate!: number;
    private _id!: number | any;
    private _items: Item[] = [];

    constructor(public itemsMap: { [itemId: string]: Item }) {

        this.itemsMap = itemsMap || {};
        for (let itemId in itemsMap) {
            let item = itemsMap[itemId];

            this.items.push(new Item({
                ...item,
                id: Number(itemId)
            }));
        }
    }

    get createdDate() {
        return this._createdDate;
    }
    get id() {
        return this._id;
    }
    get items() {
        return this._items;
    }
    get totalItemsCount() {


        let itemsCount = 0;
        for (let itemId in this.items) {
            itemsCount += this._items[itemId].quantity;
        }
        return itemsCount;
    }

    get totalPrice() {
        let sum = 0;
        for (let itemId in this._items) {
            sum += this._items[itemId].totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product) {

        let item = this.itemsMap[product.id];
        return item ? item.quantity : 0;
    }
}