import { crateHeight, crateImg, crateWidth, ctx } from "../constants";

export const crateArray:Crate[] = [];

export class Crate{
    x:number;
    y:number;
    width:number;
    height:number;
    image:HTMLImageElement;

    constructor(x:number,y:number){
        this.x = x;
        this.y = y;
        this.width = crateWidth;
        this.height = crateHeight;
        this.image = crateImg
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }
}