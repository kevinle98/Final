let paladinImg, rougeImg, wizardImg;
let selectedCharacter = '';
let characters;
let portraitSize = { width: 260, height: 430 };

function preload() {
    paladinImg = loadImage('Paladin.png');
    rougeImg = loadImage('Rouge.png');
    wizardImg = loadImage('Wizard.png');
}

function setup() {
    createCanvas(1200, 900);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont('monospace');

    characters = {
        'Paladin': {
            img: paladinImg,
            tech: 80,
            combat: 30,
            magic: 10,
            x: 300,
            y: 450
        },
        'Rouge': {
            img: rougeImg,
            tech: 10,
            combat: 80,
            magic: 30,
            x: 600,
            y: 450
        },
        'Wizard': {
            img: wizardImg,
            tech: 10,
            combat: 30,
            magic: 80,
            x: 900,
            y: 450
        }
    };
}

function draw() {
    background(15);

    if (selectedCharacter && characters[selectedCharacter]) {
        let character = characters[selectedCharacter];
        let imgScale = 0.8

        tint(255, 255, 255);
        image(character.img, width / 2, height / 2, character.img.width * imgScale, character.img.height * imgScale);

        fill(255);
        textSize(40);
        text(selectedCharacter, width / 2, height / 6);

        textSize(24);
        text('Tech: ' + character.tech, width / 2, height - 150);
        text('Combat: ' + character.combat, width / 2, height - 120);
        text('Magic: ' + character.magic, width / 2, height - 90);

        textSize(14);
        text('Press "R" to reset character selection', width / 2, height - 40);
    } else {

        for (let characterName in characters) {
            let character = characters[characterName];
            let isHovered = isMouseOverPortrait(character);
            tint(isHovered ? 255 : 100);
            image(character.img, character.x, character.y, portraitSize.width, portraitSize.height);
        }
    }
}

function isMouseOverPortrait(character) {
    return mouseX > character.x - portraitSize.width / 2 &&
        mouseX < character.x + portraitSize.width / 2 &&
        mouseY > character.y - portraitSize.height / 2 &&
        mouseY < character.y + portraitSize.height / 2;
}

function mousePressed() {
    if (!selectedCharacter) {
        for (let characterName in characters) {
            let character = characters[characterName];
            if (isMouseOverPortrait(character)) {
                selectedCharacter = characterName;
                break;
            }
        }
    }
}

function resetSketch() {
    selectedCharacter = '';
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        resetSketch();
    }
}