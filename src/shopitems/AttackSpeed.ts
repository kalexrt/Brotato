import { shopAtckSpeedImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class AttackSpeed extends ShopItem{
    constructor(){
        super();
        this.image = shopAtckSpeedImg;
        this.name = 'Attack Speed Up';
        this.description = 'Increases attack speed of all weapons by 20ms.'
    }
}