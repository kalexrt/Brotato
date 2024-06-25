import { golemImg } from "../constants";
import { Player } from "../entities/Player";

export class Golem extends Player{
    constructor(){
        super();
        this.image = golemImg;
        this.maxHealth = 15;
        this.currHealth = 15;
        this.armor = 1;
        this.damageIncrease = 0.9;
    }
}