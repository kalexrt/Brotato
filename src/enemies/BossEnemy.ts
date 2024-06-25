import { Enemy } from "../entities/Enemy";
import { bossEnemyImg } from "../constants";

export class BossEnemy extends Enemy{
    constructor(x:number,y:number){
        super(x,y);
        this.image = bossEnemyImg;
        this.height = 80;
        this.width = 80;
        this.speed = 1;
        this.health = 3000;
        this.damage = 5;
    }
}