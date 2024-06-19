import { ctx,canvas } from "../constants";

export function drawPaused() {
    ctx.font = 'bold 120px "Anybody"';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
}