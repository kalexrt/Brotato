import { ctx,canvas } from "../constants";
import { offsetX, offsetY } from "../entities/Player";

export function drawPaused() {
    ctx.font = 'bold 120px "Anybody"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSED', (canvas.width /2 )- offsetX, (canvas.height / 2) - offsetY);
}