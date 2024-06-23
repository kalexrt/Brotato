import { shopShotgunImg } from "../constants";
import { ShopItem } from "./ShopItem";

export class ShotgunShop extends ShopItem{
    constructor(){
        super();
        this.image = shopShotgunImg;
        this.name = 'Shotgun';
        this.description = 'Close range, High damage gun.'
    }
}