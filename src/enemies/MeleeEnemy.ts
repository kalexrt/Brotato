import { Enemy } from "../entities/Enemy";
import { meleeEnemyImg } from "../globals/constants";

export class MeleeEnemy extends Enemy{
    constructor(x:number,y:number) {
        super(x,y);
        this.image = meleeEnemyImg;
    }
}