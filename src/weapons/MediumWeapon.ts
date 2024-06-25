import { BaseWeapon } from "./BaseWeapon";
import Point from "../shape/Point";
import { midWeaponHeight, midWeaponWidth } from "../globals/constants";

export class MediumWeapon extends BaseWeapon {
    constructor(weaponPositions: Point[]) {
        super(weaponPositions);
        this.height =  midWeaponHeight;
        this.width = midWeaponWidth;
    }
}