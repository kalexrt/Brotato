import { Carl } from "../characters/Carl";
import { Golem } from "../characters/Golem";
import { menuButtonClickSound, menuButtonFocusSound } from "../constants";
import { Player } from "../entities/Player";
import { weaponArray } from "../game";
import { startGame } from "../startgame";
import { Crossbow } from "../weapons/Crossbow";
import { Knife } from "../weapons/Knife";
import { Minigun } from "../weapons/Minigun";
import { Pistol } from "../weapons/Pistol";
import { Screwdriver } from "../weapons/Screwdriver";
import { Shotgun } from "../weapons/Shotgun";
import { Smg } from "../weapons/Smg";


let selectedCharacter: Player | null = null;
let selectedWeapon: string | null = null;

export let player = new Carl();

export function characterSelection() {
    const characters = [
        { name: "Carl" ,instance: new Carl(), src:'/character/Carl.png'},
        { name: "Golem", instance: new Golem(), src:'/character/Golem.png' }
    ];
    const weapons = [
        { name: "Smg", src:'/shop/smg_icon.png'},
        { name: "Pistol", src:'/shop/pistol_icon.png' },
        { name: "Minigun", src:'/shop/minigun_icon.png' },
        { name: "Crossbow", src:'/shop/crossbow_icon.png' },
        { name: "Shotgun", src:'/shop/shotgun_icon.png' },
        { name: "Knife", src:'/shop/knife_icon.png'},
        { name: "Screwdriver", src:'/shop/screwdriver_icon.png'}
    ];

    const characterContainer = document.getElementById('characters')!;
    const weaponContainer = document.getElementById('weapons')!;

    characters.forEach(character => {
        const charElement = document.createElement('div');
        charElement.className = 'character';
        charElement.textContent = character.name;

        const charImage = document.createElement('img') as HTMLImageElement;
        charImage.src = character.src;
        charImage.alt = character.name;
        charImage.style.width = '60px'; 
        charImage.style.height = '60px';

        charElement.appendChild(charImage);
        charElement.addEventListener('click', () => {
            menuButtonClickSound.play();
            selectedCharacter = character.instance;
            document.querySelectorAll('.character').forEach(el => el.classList.remove('selected'));
            charElement.classList.add('selected');
        });
        charElement.addEventListener('mouseover', () => {
            menuButtonFocusSound.play();
        })
        characterContainer.appendChild(charElement);
    });

    weapons.forEach(weapon => {
        const weaponElement = document.createElement('div');
        weaponElement.className = 'weapon';
        weaponElement.textContent = weapon.name;

        const weaponImage = document.createElement('img') as HTMLImageElement;
        weaponImage.src = weapon.src;
        weaponImage.alt = weapon.name;
        weaponImage.style.width = '60px'; 
        weaponImage.style.height = '60px';

        weaponElement.appendChild(weaponImage);
        weaponElement.addEventListener('click', () => {
            menuButtonClickSound.play();
            selectedWeapon = weapon.name;
            document.querySelectorAll('.weapon').forEach(el => el.classList.remove('selected'));
            weaponElement.classList.add('selected');
        });
        weaponElement.addEventListener('mouseover', () => {
            menuButtonFocusSound.play();
        })
        weaponContainer.appendChild(weaponElement);
    });
    const confirmButton = document.getElementById('confirmSelectionButton') as HTMLButtonElement;
    confirmButton.addEventListener('click', () => {
        if (selectedCharacter && selectedWeapon) {
            menuButtonClickSound.play();
            document.getElementById('characterSelection')!.style.display = 'none';
            document.getElementById('canvas')!.style.display = 'block';
            player = selectedCharacter;
            addWeapon(selectedWeapon);
            startGame(); 
 
        } else {
            alert("Please select both a character and a weapon.");
        }
    });
}

function addWeapon(name:string){
    switch(name){
        case 'Pistol':
            let weapon0 = new Pistol(player.weaponPositions);
            weaponArray.push(weapon0);
            break;

        case 'Shotgun':
            let weapon1 = new Shotgun(player.weaponPositions);
            weaponArray.push(weapon1);
            break;

        case 'Smg':
            let weapon2 = new Smg(player.weaponPositions);
            weaponArray.push(weapon2);
            break;

        case 'Crossbow':
            let weapon3 = new Crossbow(player.weaponPositions);
            weaponArray.push(weapon3);
            break;

        case 'Minigun':
            let weapon4 = new Minigun(player.weaponPositions);
            weaponArray.push(weapon4);
            break;
        case 'Screwdriver':
            let weapon5 = new Screwdriver(player.weaponPositions);
            weaponArray.push(weapon5);
            break;
        case 'Knife':
            let weapon6 = new Knife(player.weaponPositions);
            weaponArray.push(weapon6);
            break;
    }
}