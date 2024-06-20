import { weaponHeight, weaponWidth } from "../constants";
import { BaseWeapon } from "./BaseWeapon";
import Point from "../shape/Point";

export class SmallWeapon extends BaseWeapon {
    constructor(image: HTMLImageElement, name: string, damage: number, fireRate: number, range: number,weaponPositions: Point[]) {
        super(image, name, damage, fireRate, range, weaponPositions);
        this.height =  weaponHeight;
        this.width = weaponWidth;
    }
    
}