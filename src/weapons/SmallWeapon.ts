import { weaponHeight, weaponWidth } from "../globals/constants";
import { BaseWeapon } from "./BaseWeapon";
import Point from "../shape/Point";

export class SmallWeapon extends BaseWeapon {
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.height =  weaponHeight;
        this.width = weaponWidth;
    }
    
}