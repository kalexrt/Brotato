import { offsetX, offsetY } from "../entities/Player";
import { global } from "../global";

function drawExpBar(ctx: CanvasRenderingContext2D, currExp: number, expNeeded: number) {
    const barWidth = 200;
    const barHeight = 20;
    const x = 20;
    const y = 66;

    // calculate the width of the current health
    const currHealthWidth = Math.max(0, (currExp / expNeeded) * barWidth);

    // draw the background bar (max health)
    ctx.fillStyle = 'grey';
    ctx.fillRect(x - offsetX, y - offsetY, barWidth, barHeight);

    // draw the current health bar
    ctx.fillStyle = '#50d450';
    ctx.fillRect(x - offsetX, y - offsetY, currHealthWidth, barHeight);
    // draw the health text
    ctx.fillStyle = 'white';
    ctx.font = '16px "Anybody"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Exp : ${Math.max(0,currExp)} / ${expNeeded}`, x + 45 - offsetX , y + 12 - offsetY );
}

export function updateDrawExpBar(ctx: CanvasRenderingContext2D, currExp: number, expNeeded: number){
    if(currExp >= expNeeded){
        global.level += 1;
    }
    drawExpBar(ctx, currExp, expNeeded);
}