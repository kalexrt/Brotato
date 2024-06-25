import { eyeEnemyImg } from "../constants";
import { Enemy } from "../entities/Enemy";

export class EyeEnemy extends Enemy{
    constructor(x:number,y:number) {
        super(x,y);
        this.image = eyeEnemyImg;
        this.damage = 2;
    }
}