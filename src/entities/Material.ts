import { ctx, materialChoices, materialHeight, materialWidth, playerPickupRange } from "../constants";
import { player } from "../ui/characterSelection";
import { getRandomInt } from "../utils/common";

export const materialArray:Material[] = [];

export class Material{
    x:number;
    y:number;
    width:number;
    height:number;
    image:HTMLImageElement;
    collecting:boolean;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.width = materialWidth;
        this.height = materialHeight;
        this.image = materialChoices[(getRandomInt(0,3))] //3 is exclusive only generates 0-2
        this.collecting = false;
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    update(deltaTime: number) {
        // check if player is near
        const distance = Math.sqrt(
          (player.x - this.x) ** 2 + (player.y - this.y) ** 2
        );
        if (distance < playerPickupRange + 150) {
            this.collecting = true;
        }
        // animate towards player if collecting
        if (this.collecting) {
            let dx = player.x - this.x;
            let dy = player.y - this.y;
            
            console.log(dx,dy)
            // normalize the movement to ensure consistent speed in all directions
            const length = Math.sqrt(dx * dx + dy * dy);
            if (length > 0) {
                dx = (dx / length) * 0.5 * deltaTime;
                dy = (dy / length) * 0.5 * deltaTime;
            }
            this.x += dx;
            this.y += dy;
        }
    }
}