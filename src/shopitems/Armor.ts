import { shopArmorImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class Armor extends ShopItem{
    constructor(){
        super();
        this.image = shopArmorImg;
        this.name = 'Armor';
        this.description = 'Increase your armor by 1.'
    }
}