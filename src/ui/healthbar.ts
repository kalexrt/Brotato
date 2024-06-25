import { global } from "../globals/global";
export function drawHealthBar(ctx: CanvasRenderingContext2D, currHealth: number, maxHealth: number) {
    const barWidth = 200;
    const barHeight = 20;
    const x = 20;
    const y = 36;

    // calculate the width of the current health
    const currHealthWidth = Math.max(0, (currHealth / maxHealth) * barWidth);

    // draw the background bar (max health)
    ctx.fillStyle = 'grey';
    ctx.fillRect(x - global.offsetX, y - global.offsetY, barWidth, barHeight);

    // draw the current health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(x - global.offsetX, y - global.offsetY, currHealthWidth, barHeight);
    // draw the health text
    ctx.fillStyle = 'white';
    ctx.font = '16px "Anybody"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    //assign and trender text
    const text = `HP : ${Math.max(0,currHealth)} / ${maxHealth}`;
    ctx.strokeText(text, x + 60 - global.offsetX , y + 12 - global.offsetY);
    ctx.fillText(text, x + 60 - global.offsetX , y + 12 - global.offsetY );
}