export function drawHealthBar(ctx: CanvasRenderingContext2D, currHealth: number, maxHealth: number) {
    const barWidth = 200;
    const barHeight = 20;
    const x = 20;
    const y = 36;

    // Calculate the width of the current health
    const currHealthWidth = (currHealth / maxHealth) * barWidth;

    // Draw the background bar (max health)
    ctx.fillStyle = 'grey';
    ctx.fillRect(x, y, barWidth, barHeight);

    // Draw the current health bar
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, currHealthWidth, barHeight);

    // Draw the health text
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`HP: ${currHealth} / ${maxHealth}`, x+10 , y+16 );
}