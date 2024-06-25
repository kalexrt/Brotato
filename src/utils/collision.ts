import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";
import { Projectile } from "../weapons/Projectile";
import { Material } from "../entities/Material";
import { PickupRange } from "../interfaces/PickupRange";
import { Crate } from "../entities/Crate";

export function isColliding(obj1: Enemy | Material | Projectile | Crate, obj2: Player | Projectile | PickupRange): boolean {
    const obj1Right = obj1.x + obj1.width;
    const obj1Bottom = obj1.y + obj1.height;
    const obj2Right = obj2.x + obj2.width;
    const obj2Bottom = obj2.y + obj2.height;

    // Check if one rectangle is to the left of the other
    if (obj1.x >= obj2Right || obj2.x >= obj1Right) {
        return false;
    }

    // Check if one rectangle is above the other
    if (obj1.y >= obj2Bottom || obj2.y >= obj1Bottom) {
        return false;
    }

    return true;
}