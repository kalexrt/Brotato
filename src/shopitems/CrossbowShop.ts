import { shopCrossbowImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class CrossbowShop extends ShopItem{
    constructor(){
        super();
        this.image = shopCrossbowImg;
        this.name = 'Crossbow';
        this.description = 'Fires powerful bolts with high accuracy.'
    }
}