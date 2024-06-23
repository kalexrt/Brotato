import { global } from "../global";
import { ctx, canvas } from "../constants";
import { offsetX, offsetY } from "../entities/Player";

export function handleWaves(deltaTime:number){
    global.waveTimeRemaining -= deltaTime;

    if (global.waveTimeRemaining <= 0) {
        global.wave++; // Increment wave number
        global.waveTimeRemaining = 60 * 1000; // Reset wave timer to 60 seconds
    }
}

export function drawWaveInfo() {
    ctx.fillStyle = 'white';
    ctx.font = '24px "Anybody"';
    ctx.textAlign = 'center';
    const timeInSeconds = Math.ceil(global.waveTimeRemaining / 1000);
    const waveNumberText = `Wave ${global.wave}`;
    const timeRemainingText = `${timeInSeconds}`;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.strokeText(waveNumberText,canvas.width / 2 - offsetX, 30 - offsetY);
    ctx.fillText(waveNumberText, canvas.width / 2 - offsetX, 30 - offsetY);
    ctx.font = '30px "Anybody"';
    ctx.strokeText(timeRemainingText, canvas.width / 2 - offsetX, 60 - offsetY);
    ctx.fillText(timeRemainingText, canvas.width / 2 - offsetX, 60 - offsetY)
}