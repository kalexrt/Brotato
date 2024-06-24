import { levelupSound } from "../constants";
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
    ctx.fillRect(x - global.offsetX, y - global.offsetY, barWidth, barHeight);

    // draw the current health bar
    ctx.fillStyle = '#50d450';
    ctx.fillRect(x - global.offsetX, y - global.offsetY, currHealthWidth, barHeight);
    // draw the health text
    ctx.fillStyle = 'white';
    ctx.font = '16px "Anybody"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    //text assigning and rendering
    const text = ` Level ${global.level} :   ${currExp} / ${expNeeded}`;
    ctx.strokeText(text, x + 70 - global.offsetX , y + 12 - global.offsetY);
    ctx.fillText(text, x + 70 - global.offsetX , y + 12 - global.offsetY);
}

export function updateDrawExpBar(ctx: CanvasRenderingContext2D, currExp: number, expNeeded: number){
    if(currExp >= expNeeded){
        levelupSound.play();
        global.level += 1;
        global.levelsGained += 1;
    }
    drawExpBar(ctx, currExp, expNeeded);
}
