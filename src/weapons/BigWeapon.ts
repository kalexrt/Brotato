import { bigWeaponHeight, bigWeaponWidth } from "../globals/constants";
import { BaseWeapon } from "./BaseWeapon";
import Point from "../shape/Point";

export class BigWeapon extends BaseWeapon {
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.height =  bigWeaponHeight;
        this.width = bigWeaponWidth;
    }
}