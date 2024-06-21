import { crossImage, ctx } from "../constants";
import { crosses } from "../entities/Enemy";


let currentFrame = 0;
let lastAnimationFrame = 0;
let numOfFrames = 2;
export function drawCross(ctx:CanvasRenderingContext2D,sx:number, x:number, y:number) {
    ctx.drawImage(crossImage,sx, 0, 80, 80, x, y,40,40);
}

export function addRemoveCross(timestamp:number){
    const currentTime = Date.now();
    for (let i = crosses.length - 1; i >= 0; i--) {
        const cross = crosses[i];
        if (currentTime < cross.expireTime) {
            animateCross(timestamp);
            drawCross(ctx, 80*currentFrame , cross.x, cross.y);
        } else {
            // remove the cross if it has expired
            crosses.splice(i, 1);
        }
    }
}

export function animateCross(timestamp:number){
    if(!lastAnimationFrame){
        lastAnimationFrame = timestamp;
    }
    const animationDeltaTime = timestamp - lastAnimationFrame;
    if (animationDeltaTime > 200){
        currentFrame = (currentFrame + 1) % numOfFrames;
        lastAnimationFrame = timestamp
    }
}