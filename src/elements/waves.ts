import { global } from "../global";
import { ctx, canvas } from "../constants";
import { openShop } from "./shop";

export function handleWaves(deltaTime:number){
    global.waveTimeRemaining -= deltaTime;

    if (global.waveTimeRemaining <= 0) {
        if(global.wave >= 20){
            global.gameOver = true; //win game
            global.win = true;
            return;
        } 
        global.wave++; // increment wave number
        openShop();
        global.shopActive = true;
        global.waveTimeRemaining = 60 * 1000; // reset wave timer to 60 seconds
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
    ctx.strokeText(waveNumberText,canvas.width / 2 - global.offsetX, 30 - global.offsetY);
    ctx.fillText(waveNumberText, canvas.width / 2 - global.offsetX, 30 - global.offsetY);
    ctx.font = '30px "Anybody"';
    ctx.strokeText(timeRemainingText, canvas.width / 2 - global.offsetX, 60 - global.offsetY);
    ctx.fillText(timeRemainingText, canvas.width / 2 - global.offsetX, 60 - global.offsetY)
}