import { shopPctDamageImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class PercentDamage extends ShopItem{
    constructor(){
        super();
        this.image = shopPctDamageImg;
        this.name = 'Damage Up';
        this.description = 'Increase your total damage output by 10%'
    }
}