import { characterSelection } from "./characterSelection";

export function mainmenu() {
    const startButton: HTMLButtonElement = document.getElementById('startButton') as HTMLButtonElement;
    startButton.addEventListener('click', () => {
        document.getElementById('mainMenu')!.style.display = 'none';
        document.getElementById('characterSelection')!.style.display = 'flex';
        characterSelection();
    });
}