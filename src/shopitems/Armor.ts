import { shopArmorImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class Armor extends ShopItem{
    constructor(){
        super();
        this.image = shopArmorImg;
        this.name = 'Armor';
        this.description = 'Increase your armor by 1.'
    }
}