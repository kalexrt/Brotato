import { global } from "../globals/global";
import { ctx, hitImg, hitSound } from "../globals/constants";
import { Player } from "../entities/Player";
import { Enemy } from "../entities/Enemy";

let currentFrame = 0;
let numOfFrames = 4;  //this is 4 because hitEffect resets it before 4th framse is called
let lastAnimationFrame = 0;

export function handleHitEffect(entity:Player | Enemy,timestamp:number){
    hitEffect(timestamp);
    drawHitEffect(entity);
    hitSound.play();
}

function hitEffect(timestamp:number){
    if(!lastAnimationFrame){
        lastAnimationFrame = timestamp;
    }
    const animationDeltaTime = timestamp - lastAnimationFrame;
    if (animationDeltaTime > 150){
        currentFrame = (currentFrame + 1) % numOfFrames;
        lastAnimationFrame = timestamp
    }

    if (global.hitEffect && currentFrame === numOfFrames - 1) {
        global.hitEffect = false;
        currentFrame = 0; // reset the frame for the next hit effect
    }
}
function drawHitEffect(entity:Player | Enemy){
    ctx.drawImage(hitImg,256*currentFrame,0, 256, 256, entity.x - entity.width, entity.y - entity.height, entity.width*3, entity.height*3);
} 