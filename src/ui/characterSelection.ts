import { Carl } from "../characters/Carl";
import { Golem } from "../characters/Golem";
import { Player } from "../entities/Player";
import { startGame } from "../startgame";


let selectedCharacter: Player | null = null;
let selectedWeapon: string | null = null;

// export let player = new Carl();

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
        { name: "Shotgun", src:'/shop/shotgun_icon.png' }
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
            selectedCharacter = character.instance;
            document.querySelectorAll('.character').forEach(el => el.classList.remove('selected'));
            charElement.classList.add('selected');
        });
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
            selectedWeapon = weapon.name;
            console.log(selectedWeapon);
            document.querySelectorAll('.weapon').forEach(el => el.classList.remove('selected'));
            weaponElement.classList.add('selected');
        });
        weaponContainer.appendChild(weaponElement);
    });
    const confirmButton = document.getElementById('confirmSelectionButton') as HTMLButtonElement;
    confirmButton.addEventListener('click', () => {
        if (selectedCharacter && selectedWeapon) {
            document.getElementById('characterSelection')!.style.display = 'none';
            document.getElementById('canvas')!.style.display = 'block';
            // if(selectedCharacter === 'Carl') player = new Carl();
            // else player = new Golem();

            startGame(); 

        } else {
            alert("Please select both a character and a weapon.");
        }
    });
}