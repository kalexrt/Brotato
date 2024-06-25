import { menuButtonClickSound, menuButtonFocusSound } from "../constants";
import { characterSelection } from "./characterSelection";

export function mainmenu() {
    const startButton: HTMLButtonElement = document.getElementById('startButton') as HTMLButtonElement;
    startButton.addEventListener('click', () => {
        menuButtonClickSound.play();
        document.getElementById('mainMenu')!.style.display = 'none';
        document.getElementById('characterSelection')!.style.display = 'flex';
        characterSelection(); //click opens character selection
    });
    startButton.addEventListener('mouseover', ()=>{
        menuButtonFocusSound.play();
    })
}