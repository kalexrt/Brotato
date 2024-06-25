import { Enemy } from "../entities/Enemy";
import { meleeEnemyImg } from "../constants";

export class MeleeEnemy extends Enemy{
    constructor(x:number,y:number) {
        super(x,y);
        this.image = meleeEnemyImg;
    }
}