export function drawFlippedImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
    ctx.save(); // Save the current state of the context
    ctx.translate(x + width, y); // Translate the context to the right edge of the image
    ctx.scale(-1, 1); // Flip the context horizontally
    ctx.drawImage(image, 0, 0, width, height); // Draw the image on the flipped context
    ctx.restore(); // Restore the context to its original state
}