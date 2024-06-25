import { ctx } from "../globals/constants";

interface DamageText {
    x: number;
    y: number;
    damage: number;
    startTime: number;
}

export let damageTexts: DamageText[] = [];

export function addToDamageTextArray(x: number, y: number, damage: number, timestamp: number) {
    damageTexts.push({ x, y, damage, startTime: timestamp });
}

export function updateDrawDamageText(timestamp: number) {
    // Filter out the damage texts that should no longer be displayed
    damageTexts = damageTexts.filter(damageText => {
        const elapsedTime = timestamp - damageText.startTime;
        return elapsedTime < 500; // 0.5 seconds in milliseconds
    });
    // Render the remaining damage texts
    for (const damageText of damageTexts) {
        const elapsedTime = timestamp - damageText.startTime;
        const alpha = 1 - (elapsedTime / 500); // Fade out effect
        ctx.globalAlpha = alpha;
        ctx.fillStyle = 'white';
        ctx.font = '20px "Anybody"';
        ctx.fillText(damageText.damage.toString(), damageText.x, damageText.y);
    }

    ctx.globalAlpha = 1; // Reset alpha
}