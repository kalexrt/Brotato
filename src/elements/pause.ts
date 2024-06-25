import { ctx,canvas } from "../globals/constants";
import { global } from "../globals/global";
export function drawPaused() {
    ctx.font = 'bold 120px "Anybody"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSED', (canvas.width /2 )- global.offsetX, (canvas.height / 2) - global.offsetY);
}