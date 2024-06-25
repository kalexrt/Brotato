import { shopSpeedImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class Speed extends ShopItem{
    constructor(){
        super();
        this.image = shopSpeedImg;
        this.name = 'Speed up';
        this.description = 'Increase player Move Speed by 1.'
    }
}