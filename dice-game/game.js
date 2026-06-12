const diceImages = document.querySelectorAll("#gameboard img");
const checkboxes = document.querySelectorAll("#gameboard input");
//extra
const turnScoreSpan = document.getElementById("turnScore");
const totalScoreSpan = document.getElementById("totalScore");
const message = document.getElementById("message");

let turnScore =0;
let totalScore=0;

let dieValues = [1,2,3,4,5];

document.getElementById("rollButton").addEventListener("click", () => {
    scoreKeptDice();
    message.textContent = "";

    diceImages.forEach((img) => {
        const dieClass = img.className;
        const checkbox = document.querySelector(`input.${dieClass}`);

        if (!checkbox.checked) {
            img.src = "assets/die_rolling.gif";
        }
    });

    setTimeout(() => {
        diceImages.forEach((img, index) => {
            const dieClass = img.className;
            const checkbox = document.querySelector(`input.${dieClass}`);

            if (!checkbox.checked) {
                const roll = Math.floor(Math.random() * 6) + 1;
                dieValues[index] = roll;
                img.src = `assets/yellow_dice_${roll}.gif`;
            }
        });
        evaluateRoll();
    }, 500);
});

// I used copilot to help me plan and write this part
function evaluateRoll(){
    const counts = [0,0,0,0,0,0]; // index

    diceImages.forEach((img, index) => {
        const dieClass = img.className;
        const checkbox = document.querySelector(`input.${dieClass}`);

        // only allow dice that are not checked
        if (!checkbox.checked) {
            const value = dieValues[index];
            counts[value]++;
        }
    });
    let rollScore = 0;

    // 3 of a kind
    for (let face = 1; face <= 6; face++) {
        if (counts[face] >= 3) {
            rollScore += face *100;
            counts[face] -=3;
        }
    }

    //1s and 5s
    rollScore += counts[1] *100;
    rollScore += counts[5] *50;

    if (rollScore === 0) {
        // Farkle
        turnScore=0;
        turnScoreSpan.textContent = turnScore;
        message.textContent = "Farkle! Did not score any points!"
    } else {
        // add to turn score but only when dice is kept

        message.textContent = `You have ${rollScore} points available. Check dice to keep them, then roll again or bank`;

    }
}

// also had help for this
function scoreKeptDice() {
    const counts = [0,0,0,0,0,0];

    diceImages.forEach((img, index) => {
        const dieClass = img.className;
        const checkbox = document.querySelector(`input.${dieClass}`);

        if (checkbox.checked) {
            const value = dieValues[index];
            counts[value]++;
        }
    });

    let keptScore =0;
    for (let face = 1; face <=6; face++) {
        if (counts[face] >= 3) {
            keptScore += face *100;
            counts[face] -=3;
        };
    };
    keptScore += counts[1] *100;
    keptScore += counts[5] * 50;

    turnScore += keptScore;
    turnScoreSpan.textContent = turnScore;
};

// bank score

document.getElementById("bankButton").addEventListener("click", () => {
    totalScore += turnScore;
    totalScoreSpan.textContent = totalScore;

    //reset for next turn
    turnScore =0;
    turnScoreSpan.textContent =0;
    message.textContent = "Score banked. New turn!";

    //unlock all dice
    checkboxes.forEach(cb => cb.checked = false);
});