import { Enemy } from "../entities/Enemy";
import { bigEnemyImg } from "../globals/constants";

export class BigeEnemy extends Enemy{
    constructor(x:number,y:number){
        super(x,y);
        this.image = bigEnemyImg;
        this.height = 75;
        this.width = 75;
        this.speed = 1;
        this.health = 300;
        this.damage = 5;
    }
}