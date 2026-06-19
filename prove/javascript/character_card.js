
const character = {
    name: "Zaryusu",
    class: "Ranger",
    level: 1,
    health: 100,
    image: "./images/snortleblat.webp",
    
    attacked: function() {
        this.health -=20;

        if (this.health <= 0) {
            this.health = 0;
            alert(`Alert!
                ${this.name} has been defeated and died!`);
        }
        else {
            console.log(`${this.name} took damage. Health is now ${this.health}.`);
        }
        this.updateUI();
    },

    levelUp: function() {
        this.level = this.level +=1;
        this.health = this.health *=2;

        console.log(`${this.name} leveled up! New level is ${this.level}! New health is ${this.health}!`);
        this.updateUI();
    },

    updateUI: function () {
        document.getElementById('name').textContent = this.name;
        document.getElementById('class').textContent = this.class;
        document.getElementById('level').textContent = this.level;
        document.getElementById('health').textContent = this.health;
    }
};

document.getElementById('attack').addEventListener('click', () => {
    character.attacked();
});

document.getElementById('levelUp').addEventListener('click', () => {
    character.levelUp();
})

character.updateUI();


