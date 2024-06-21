import { ctx, materialChoices, materialHeight, materialWidth } from "../constants";
import { getRandomInt } from "../utils/common";

export const materialArray:Material[] = [];

export class Material{
    x:number;
    y:number;
    width:number;
    height:number;
    image:HTMLImageElement;

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.width = materialWidth;
        this.height = materialHeight;
        this.image = materialChoices[(getRandomInt(0,3))] //3 is exclusive only generates 0-2
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

}