let paladinImg, rougeImg, wizardImg, druidImg, barbarianImg;
let viewedCharacter = '';
let selectedCharacter;
let characters;
let portraitSize = { width: 200, height: 320 };

function preload() {
    barbarianImg = loadImage('Barbarian.png');
    paladinImg = loadImage('Paladin.png');
    rougeImg = loadImage('Rouge.png');
    druidImg = loadImage('Druid.png');
    wizardImg = loadImage('Wizard.png');
}

function setup() {
    createCanvas(1200, 900);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont('monospace');

    characters = {
        'Barbarian': {
            img: barbarianImg,
            strength: 15,
            intelligence: 8,
            finesse: 13,
            x: 150,
            y: 450
        },
        'Paladin': {
            img: paladinImg,
            strength: 14,
            intelligence: 12,
            finesse: 10,
            x: 375,
            y: 450
        },
        'Rogue': {
            img: rougeImg,
            strength: 10,
            intelligence: 11,
            finesse: 15,
            x: 600,
            y: 450
        },
        'Druid': {
            img: druidImg,
            strength: 12,
            intelligence: 14,
            finesse: 10,
            x: 825,
            y: 450
        },
        'Wizard': {
            img: wizardImg,
            strength: 8,
            intelligence: 15,
            finesse: 13,
            x: 1050,
            y: 450
        },
    };
    
    
}

function draw() {
    background(15);

    if (viewedCharacter && characters[viewedCharacter]) {
        let character = characters[viewedCharacter];
        let imgScale = 0.8

        tint(255, 255, 255);
        image(character.img, width / 2, (height / 2) - 70, character.img.width * imgScale, character.img.height * imgScale);

        fill(255);
        textSize(40);
        text(viewedCharacter, width / 2, height / 10);

        textSize(22);
        text('Strength: ' + character.strength, width / 2, height - 240);
        text('Intelligence: ' + character.intelligence, width / 2, height - 210);
        text('Finesse: ' + character.finesse, width / 2, height - 180);

        textSize(18);
        text('Press "Esc" to go back to character selection', width / 2, height - 50);
        text('Press "Space" confirm character', width / 2, height - 75);
    } else {

        for (let characterName in characters) {
            let character = characters[characterName];
            let isHovered = isMouseOverPortrait(character);
            tint(isHovered ? 255 : 80);
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
    if (!viewedCharacter) {
        for (let characterName in characters) {
            let character = characters[characterName];
            if (isMouseOverPortrait(character)) {
                viewedCharacter = characterName;
                break;
            }
        }
    }
}

function resetSketch() {
    viewedCharacter = '';
}
function keyPressed() {
    if (keyCode === ESCAPE) {
        resetSketch();
    } else if (keyCode === 32) {
        selectedCharacter = viewedCharacter;
    }
}
