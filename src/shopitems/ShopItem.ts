import { defaultImg,ctx } from "../constants";

export class ShopItem {
    image: HTMLImageElement;
    name:string;
    description: string;

    constructor() {
        this.image = defaultImg;
        this.name = '';
        this.description = '';
    }

    draw(x:number, y:number) {
        const imageSize = 50; // Size of the item image
        const textPadding = 10; // Padding between image and text

        // Draw the item image
        ctx.drawImage(this.image, x, y, imageSize, imageSize);

        // Draw the item name
        ctx.fillStyle = 'white';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(this.name, x + imageSize + textPadding, y + 20);

        // Draw the item description
        ctx.font = '16px sans-serif';
        ctx.fillText(this.description, x + imageSize + textPadding, y + 40);
    }
}