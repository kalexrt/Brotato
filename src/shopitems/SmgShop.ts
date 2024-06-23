import { shopSmgImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class SmgShop extends ShopItem{
    constructor(){
        super();
        this.image = shopSmgImg;
        this.name = 'Smg';
        this.description = 'A fast-firing submachine gun.'
    }
}