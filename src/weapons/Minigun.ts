import { minigunImg, minigunSound } from "../constants";
import Point from "../shape/Point";
import { BigWeapon } from "./BigWeapon";

export class Minigun extends BigWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = minigunImg;
        this.sound = minigunSound;
        this.damage = this.tier * 10;
        this.fireRate = 300 - this.tier * 50;
        this.range = 300;
    }
}