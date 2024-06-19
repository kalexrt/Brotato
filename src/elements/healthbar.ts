import { offsetX, offsetY } from "../entities/Player";

export function drawHealthBar(ctx: CanvasRenderingContext2D, currHealth: number, maxHealth: number) {
    const barWidth = 200;
    const barHeight = 20;
    const x = 20;
    const y = 36;

    // Calculate the width of the current health
    const currHealthWidth = Math.max(0, (currHealth / maxHealth) * barWidth);

    // Draw the background bar (max health)
    ctx.fillStyle = 'grey';
    ctx.fillRect(x - offsetX, y - offsetY, barWidth, barHeight);

    // Draw the current health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(x - offsetX, y - offsetY, currHealthWidth, barHeight);

    // Draw the health text
    ctx.fillStyle = 'white';
    ctx.font = '16px "Anybody"';
    ctx.fillText(`HP: ${Math.max(0,currHealth)} / ${maxHealth}`, x+10 - offsetX , y+16 - offsetY );
}