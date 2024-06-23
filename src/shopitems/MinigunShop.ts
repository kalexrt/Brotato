import { shopMinigunImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class MinigunShop extends ShopItem{
    constructor(){
        super();
        this.image = shopMinigunImg;
        this.name = 'Minigun';
        this.description = 'High rate of fire, High damage gun. Nothing can go wrong.'
    }
}