import { Enemy } from "../entities/Enemy";
import { speedyEnemyImg } from "../globals/constants";

export class SpeedyEnemy extends Enemy{
    constructor(x:number,y:number){
        super(x,y);
        this.image = speedyEnemyImg;
        this.speed = 4;
        this.health = 15;
    }
}