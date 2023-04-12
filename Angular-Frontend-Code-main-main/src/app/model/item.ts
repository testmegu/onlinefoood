import { Restaurant } from "./restaurant";

export class Item
{
    itemId: number;
    itemName: string;
    itemPrice: number;
    description: string;
    restaurant: Restaurant;
    constructor() {}
}