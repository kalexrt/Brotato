import { ctx } from "../main";

export class Player {
    image: HTMLImageElement;
    x: number;
    y: number;
    height:number;
    speed: number;
    moveAudio: HTMLAudioElement;

    constructor(imageSrc: string, x: number, y: number, height:number = 40, speed: number = 4) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.height = height;
        this.speed = speed;
        this.moveAudio = document.getElementById('char-walk') as HTMLAudioElement;
        this.moveAudio.loop = true; //for continuosly playing walk sound
        this.moveAudio.volume = 0.2;    //for low volume while walking
    
        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            this.draw(ctx);
        };
    }

    move(keys: { [key: string]: boolean }, canvas: HTMLCanvasElement) {
        let moved = false;

        if (keys['w'] || keys['ArrowUp']) { this.y -= this.speed; moved = true; } // Move up
        if (keys['a'] || keys['ArrowLeft']) { this.x -= this.speed; moved = true; } // Move left
        if (keys['s'] || keys['ArrowDown']) { this.y += this.speed; moved = true; } // Move down
        if (keys['d'] || keys['ArrowRight']) { this.x += this.speed; moved = true; } // Move right

        // Boundary checks
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        if (moved) {
            if (this.moveAudio.paused) {
                this.moveAudio.play();
            }
        } else {
            if (!this.moveAudio.paused) {
                this.moveAudio.pause();
                this.moveAudio.currentTime = 0; // Reset audio to the start
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x , this.y, this.height,this.height);
    }

    update(keys: { [key: string]: boolean }, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.move(keys, canvas);
        this.draw(ctx);
    }
}