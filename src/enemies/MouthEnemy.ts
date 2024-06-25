import { mouthEnemyImg } from "../globals/constants";
import { Enemy } from "../entities/Enemy";

export class MouthEnemy extends Enemy{
    constructor(x:number,y:number) {
        super(x,y);
        this.image = mouthEnemyImg;
        this.damage = 2;
    }
}