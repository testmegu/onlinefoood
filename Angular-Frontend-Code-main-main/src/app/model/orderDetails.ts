import { Order } from "./Order";

export class OrderDetails
{
    orderDetailsId: number;
    itemId: number;
    itemName: string;
    itemPrice: number;
    quantity: number;
    totalPrice: number;
    restaurantId: number;
    status: string;
    comments: string;
    order: Order;

    constructor() {};
}