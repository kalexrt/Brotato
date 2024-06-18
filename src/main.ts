import './style.css'
import bgimg from '/background/large_map_image.png'
import { Player } from './entities/Player';
import { keys } from './elements/input';
import { Enemy } from './entities/Enemy';


const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d')!;
export const CANVAS_WIDTH = 1000;
export const CANVAS_HEIGHT = 563;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player = new Player('/character/Carl.png', canvas.width / 2, canvas.height / 2);
const enemy1 = new Enemy('/enemies/melee.png', 0,0);

const background =  new Image();
background.src = bgimg;


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background,0,0,canvas.width,canvas.height);
    player.update(keys, ctx, canvas);
    enemy1.update(player.x, player.y, ctx);
    requestAnimationFrame(gameLoop);
}

window.onload = () => {
    gameLoop();
}
