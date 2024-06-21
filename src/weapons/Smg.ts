import { SmallWeapon } from "./SmallWeapon";
import Point from "../shape/Point";
import { smgImg, smgSound } from "../constants";

export class Smg extends SmallWeapon{
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.image = smgImg;
        this.sound = smgSound;
        this.damage = this.tier * 7;
        this.fireRate = 300 - this.tier*20;
        this.range = 300;
    }
}