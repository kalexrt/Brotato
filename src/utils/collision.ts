import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";

export function isColliding(obj1: Enemy, obj2: Player): boolean {
    const obj1Right = obj1.x + obj1.height;
    const obj1Bottom = obj1.y + obj1.height;
    const obj2Right = obj2.x + obj2.height;
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