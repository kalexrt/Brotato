import { shopHpImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class MaxHp extends ShopItem{
    constructor(){
        super();
        this.image = shopHpImg;
        this.name = 'Max Hp up';
        this.description = 'Increase your maximum health by 5.'
    }
}