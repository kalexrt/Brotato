import { shopScrewdriverImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class ScrewdriverShop extends ShopItem{
    constructor(){
        super();
        this.image = shopScrewdriverImg;
        this.name = 'Screwdriver';
        this.description = 'Melee weapon that screws your enemies.'
    }
}