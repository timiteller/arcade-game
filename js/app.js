"use strict";

// Enemies our player must avoid
/*
Variables for speed and y cordinates are set.
*/
let enemySpeed = [100, 120, 150, 180, 230, 270, 350, 400];
const enemyY = [60, 140, 220];

//Enemy object, containing how cordinates and speed are set-.
let Enemy = function(x, y, speed) {
 
    this.x = -120;
    this.y = enemyY[Math.floor(Math.random()*3)];
    this.speed = enemySpeed[Math.floor(Math.random()*8)]; 
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;
//When the enemy goes out of screen the x cordinate is set to
// the starting cordinates.
    if (this.x >= 505) {
        this.x = -120;
    }
//The bugs coordinates are set into grids, so it can be checked 
// if a collision happened with the player. And if it happened,
// the player's cordinates are set to the starting position.
    if (this.x > -50 && this.x < 50) {
        this.grid = 0;
    } else if (this.x > 50 && this.x < 150){
        this.grid = 101;
    } else if (this.x > 150 && this.x < 250){
        this.grid = 202;
    } else if (this.x > 250 && this.x < 350){
        this.grid = 303;
    } else if (this.x > 350 && this.x < 450){
        this.grid = 404;
    } else if (this.x > 450) {
        this.grid = 1;
    }

    if (player.x === this.grid && player.y === this.y) {
    player.x = 202;
    player.y = 380;  
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This Player class has an update(), render() and
// a handleInput() method.
const Player = function() {
    this.backToStart();
    this.sprite = 'images/char-boy.png'; 
};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Move the player according to keys pressed and checking for a wall
Player.prototype.handleInput = function(keyPress) {
    switch(keyPress) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
        //if the player reaches water, goes back to start
            if (this.y < 101) {
                this.backToStart();
            } else {
                this.y -= 80;
            }

            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }            
            break;
        case 'down':
            if (this.y < 380) {
                this.y += 80;
            }
            break;
    }
    
};
//player being put back to the starting position
Player.prototype.backToStart = function reset() {
    this.x = 202;
    this.y = 380;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const enemy4 = new Enemy();
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
