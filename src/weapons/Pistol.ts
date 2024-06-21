import { SmallWeapon } from "./SmallWeapon";
import Point from "../shape/Point";
import { bulletImg, pistolImg, pistolSound } from "../constants";

export class Pistol extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = pistolImg;
        this.sound = pistolSound;
        this.damage = this.tier * 10;
        this.fireRate = 1000 - this.tier*50;
        this.range = 300;
        this.projectile = bulletImg;
    }
}