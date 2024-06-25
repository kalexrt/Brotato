import { headEnemyImg } from "../globals/constants";
import { Enemy } from "../entities/Enemy";

export class HeadEnemy extends Enemy{
    constructor(x:number,y:number) {
        super(x,y);
        this.image = headEnemyImg;
        this.damage = 2;
    }
}