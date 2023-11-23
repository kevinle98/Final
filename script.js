let paladinImg, rougeImg, wizardImg, druidImg, barbarianImg;
let paladinIco, rougeIco, wizardIco, druidIco, barbarianIco;
let viewedCharacter = '';
let selectedCharacter = false;
let character;
let characters;
let portraitSize = { width: 200, height: 320 };

let D20;
let diceRoll = 10;
let rollStartTime;
let ellipsisCount = 0;
let lastUpdateTime = 0;
let canRoll = false;
let rolling = false;
let crit = false;
let displayMath = false;
let currentSkillCheck;
let lastSkillCheckIndex = -1;

let skillCheck = [
    {
        Skill: 'Intelligence',
        Action: 'Recall a potion recipe (15)',
        Difficulty: 15,
    },
    {
        Skill: 'Strength',
        Action: 'Break down a door (15)',
        Difficulty: 15,
    },
    {
        Skill: 'Finesse',
        Action: 'Pick a lock (15)',
        Difficulty: 15,
    },
    {
        Skill: 'Intelligence',
        Action: 'Identify a religious artifact (20)',
        Difficulty: 20,
    },
    {
        Skill: 'Strength',
        Action: 'Jump over a ravine (20)',
        Difficulty: 20,
    },
    {
        Skill: 'Finesse',
        Action: 'Sneak past a guard (20)',
        Difficulty: 20,
    },

    {
        Skill: 'Intelligence',
        Action: 'Decipher an ancient rune (25)',
        Difficulty: 25,
    },
    {
        Skill: 'Strength',
        Action: 'Smash a giant boulder (25)',
        Difficulty: 25,
    },
    {
        Skill: 'Finesse',
        Action: 'Persuade a city official (25)',
        Difficulty: 25,
    },
]

function preload() {
    barbarianImg = loadImage('Barbarian.png');
    paladinImg = loadImage('Paladin.png');
    rougeImg = loadImage('Rouge.png');
    druidImg = loadImage('Druid.png');
    wizardImg = loadImage('Wizard.png');

    barbarianIco = loadImage ('Barbarian_Icon.png');
    paladinIco = loadImage ('Paladin_Icon.png');
    rougeIco = loadImage ('Rouge_Icon.png');
    druidIco = loadImage ('Druid_Icon.png');
    wizardIco = loadImage ('Wizard_Icon.png');
    D20 = loadImage('D20.png');
}

function setup() {
    createCanvas(1200, 900);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    textFont('monospace');


    characters = {
        'Barbarian': {
            name: 'Barbarian',
            img: barbarianImg,
            ico: barbarianIco,
            strength: 15,
            intelligence: 8,
            finesse: 13,
            x: 150,
            y: 450
        },
        'Paladin': {
            name: 'Paladin',
            img: paladinImg,
            ico: paladinIco,
            strength: 14,
            intelligence: 12,
            finesse: 10,
            x: 375,
            y: 450
        },
        'Rogue': {
            name: 'Rogue',
            img: rougeImg,
            ico: rougeIco,
            strength: 10,
            intelligence: 11,
            finesse: 15,
            x: 600,
            y: 450
        },
        'Druid': {
            name: 'Druid',
            img: druidImg,
            ico: druidIco,
            strength: 12,
            intelligence: 14,
            finesse: 10,
            x: 825,
            y: 450
        },
        'Wizard': {
            name: 'Wizard',
            img: wizardImg,
            ico: wizardIco,
            strength: 8,
            intelligence: 15,
            finesse: 13,
            x: 1050,
            y: 450
        },
    };

    generateNewSkillCheck();

}

function draw() {
    background(15);

    if (selectedCharacter == false) {
        for (let characterName in characters) {
            let character = characters[characterName];
            let isHovered = isMouseOverPortrait(character);

            tint(isHovered ? 255 : 80);
            image(character.img, character.x, character.y, portraitSize.width, portraitSize.height);
        }
    } 

    if (selectedCharacter == true) {

        let character = characters[viewedCharacter];
        
        drawDice();
        drawRollingText();
        drawCharacterInfo(character);
        drawTextBox();
        drawCrit();
        
    } else {
        if (characters[viewedCharacter]) {
            let character = characters[viewedCharacter];
            let imgScale = 0.8
            background(15);
    
            tint(255, 255, 255);
            image(character.img, width / 2, (height / 2) - 70, character.img.width * imgScale, character.img.height * imgScale);
    
            fill(255);
            textSize(40);
            text(character.name, width / 2, height / 10);
    
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
}

function drawCharacterInfo(character) {
    let icoScale = 0.7
        image(character.ico, 20 + ((character.ico.width  * icoScale) / 2), 20 + ((character.ico.height * icoScale) / 2), character.ico.width  * icoScale, character.ico.height * icoScale)

    if (character) {
        textAlign(LEFT);
        push();
            textStyle(BOLD);
            textSize(36);
            fill(255);
            text(`${character.name}`, 180, 40);
        pop();

        textSize(20);
        fill(255, 90, 90);
        text(`Strength: ${character.strength}`, 180, 80);
        fill(85, 160, 220);
        text(`Intelligence: ${character.intelligence}`, 180, 110);
        fill(255, 210, 105);
        text(`Finesse: ${character.finesse}`, 180, 140);
        pop();
    }
}

function drawTextBox() {
    push();
    fill(0);
    stroke(255);
    strokeWeight(4);
    rectMode(CENTER);
    rect((width / 2), height - 100, (width - 60), 140, 20);
    pop();
}

function drawDice() {
    imageMode(CENTER);
    image(D20, width / 2, height / 2, 300, 300);
}

function drawRollingText() {
    textAlign(CENTER, CENTER);
    if (rolling) {
        updateRolling();
    } else {
        textStyle(NORMAL)
        textSize(28);
        fill(255);
        text(diceRoll, width - (width / 2), height / 2);
    }
}

function drawCrit() {
    if (crit) {
        let xOffset = random(-5, 5);
        let yOffset = random(-5, 5);

        fill(255);
        textStyle(BOLD);
        textSize(48);
        textAlign(CENTER, CENTER);
        fill(0, 255, 0);
        text("CRITICAL ROLL!!", (width / 2) + xOffset, (height - 100) + yOffset);
    } else {
        drawSkillCheck();
    }
}

function drawSkillCheck() {
    push();
    textSize(28);
    textAlign(CENTER, CENTER);
    if (currentSkillCheck.Skill === 'Strength') fill(255, 90, 90);
    if (currentSkillCheck.Skill === 'Intelligence') fill(85, 160, 220);
    if (currentSkillCheck.Skill === 'Finesse') fill(255, 210, 105);
    text(currentSkillCheck.Action, width / 2, height - 140);
    pop();

    if (displayMath) {
        drawMath();
    }
}

function updateRolling() {
    let ellipsis = '.'.repeat(ellipsisCount);
    textSize(20);
    fill(255);
    text(ellipsis, width - (width / 2), height / 2);

    if (millis() - rollStartTime > ellipsisCount * 500) {
        ellipsisCount++;
    }

    if (ellipsisCount > 3) {
        rolling = false;
        diceRoll = int(random(1, 21));
        crit = (diceRoll === 20);
        finishRolling();
    }
}

function drawMath() {
    let skillValue = characters[viewedCharacter][currentSkillCheck.Skill.toLowerCase()];
    let totalSkillValue = diceRoll + skillValue;
    textSize(24);
    textAlign(CENTER);
    fill(255);
    text(`${diceRoll} (Roll) + ${skillValue} (Skill) = ${totalSkillValue}`, width / 2, height - 100);
    
    let checkResult = totalSkillValue >= currentSkillCheck.Difficulty ? "Success!" : "Fail!";
    textSize(40);
    textStyle(BOLD);
    if (checkResult === "Success!") {
        fill(0, 255, 0);
    } else {
        fill(255, 0, 0);
    }
    text(checkResult, width / 2, height - 60);
}

function rollDice() {
    rolling = true;
    rollStartTime = millis();
    ellipsisCount = 0;
}

function finishRolling() {
    rolling = false;
    let skillValue = characters[viewedCharacter][currentSkillCheck.Skill];
    let totalSkillValue = diceRoll + skillValue;
    let checkResult = totalSkillValue >= currentSkillCheck.Difficulty ? "Success!" : "Fail!";
    console.log(checkResult, `Roll: ${diceRoll}, Skill: ${skillValue}, Total: ${totalSkillValue}`);
    ellipsisCount = 0;
    canRoll = false;
    displayMath = true;
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

    if (canRoll) {
        rollDice();
    }
}

function isMouseOverPortrait(character) {
    let isOver = mouseX > character.x - portraitSize.width / 2 &&
                 mouseX < character.x + portraitSize.width / 2 &&
                 mouseY > character.y - portraitSize.height / 2 &&
                 mouseY < character.y + portraitSize.height / 2;
    return isOver;
}

function resetSketch() {
    viewedCharacter = '';
    selectedCharacter = false;
}

function keyPressed() {
    if (keyCode === ESCAPE && selectedCharacter == false) {
        resetSketch();
    } else if (keyCode === 32) {
        selectedCharacter = true;
    }

    if (!canRoll) {
        if (key === ' ') {
            generateNewSkillCheck();
        }
    }
}

function generateNewSkillCheck() {
    let skillCheckIndex;
    do {
        skillCheckIndex = int(random(0, skillCheck.length));
    } while (skillCheckIndex === lastSkillCheckIndex);
    lastSkillCheckIndex = skillCheckIndex;

    currentSkillCheck = skillCheck[skillCheckIndex];
    displayMath = false;
    if (selectedCharacter == true){
        canRoll = true;
    }
    else{
        canRoll = false;
    }
    crit = false;
}
