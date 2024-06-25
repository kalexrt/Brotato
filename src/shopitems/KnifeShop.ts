import { shopKnifeImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class KnifeShop extends ShopItem{
    constructor(){
        super();
        this.image = shopKnifeImg;
        this.name = 'Knife';
        this.description = 'Staby melee wepon to stab your enemies with :)'
    }
}