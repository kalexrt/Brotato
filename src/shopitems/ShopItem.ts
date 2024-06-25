import { defaultImg,ctx } from "../globals/constants";

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
        const boxPadding = 10; // Padding around the box
        const boxWidth = 200; // Fixed width of the item box
        const boxHeight = 300; // Fixed height of the item box


        // Calculate the total height needed for the text
        const textWidth = boxWidth - 2 * boxPadding;
        const descriptionLines = this.wrapText(this.description, textWidth);

        ctx.strokeStyle = '#cac5c0'; // set the color of the rectangle
        ctx.lineWidth = 10; // set the width of the rectangle border
        ctx.strokeRect(x - boxPadding, y - boxPadding, boxWidth, boxHeight); // draw the rectangle

        // Draw the black box
        ctx.fillStyle = 'black';
        ctx.fillRect(x - boxPadding, y - boxPadding, boxWidth, boxHeight);

        // Draw the item image
        ctx.drawImage(this.image, x, y, imageSize, imageSize);

        // Draw the item name
        ctx.fillStyle = 'white';
        ctx.font = '16px "Anybody"';
        ctx.textAlign = 'left';
        ctx.fillText(this.name, x + imageSize + textPadding, y + 20);

        // Draw the item description
        ctx.font = '16px "Anybody"';
        let textY = y + imageSize + textPadding + 40;
        descriptionLines.forEach(line => {
            ctx.fillText(line, x, textY);
            textY += 20; // Move to the next line
        });

    }
    wrapText( text: string, maxWidth: number): string[] {
        const words = text.split(' ');
        let lines: string[] = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}