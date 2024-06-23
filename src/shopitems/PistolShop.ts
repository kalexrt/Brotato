import { shopPistolImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class PistolShop extends ShopItem{
    constructor(){
        super();
        this.image = shopPistolImg;
        this.name = 'Pistol';
        this.description = 'A basic pistol with moderate damage.'
    }
}