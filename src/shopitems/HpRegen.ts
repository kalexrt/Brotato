import { shopHpRegenImg } from "../globals/constants";
import { ShopItem } from "./ShopItem";

export class HpRegen extends ShopItem{
    constructor(){
        super();
        this.image = shopHpRegenImg;
        this.name = 'Hp Regeneration';
        this.description = 'Increases Hp regen by 1.'
    }
}