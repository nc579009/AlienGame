// Player Clicks to attack the computer by clicking on the button
// Player STATS
// hull - 20
// firepower - 5
// accuracy - .7

// Computer StATS
// hull - between 3and 6
// firepower - between 2and 4
// accuracy - between .6and .8

// Create a check for hit accuracy
// if hit, reduce computer ship hull by player firepower


// ------ Game loop ------
// Player attacks computer (click "attack")
// generate number 
//If alien ship is destroyed, player wins
// If Alien shhip survives, it attack player
// If player ship is destroyed, player loses

class Ship {
    constructor(hull, firepower, accuracy, imageSrc) {
        this.hull = hull;
        this.firepower = firepower;
        this.accuracy = accuracy;
        this.imageSrc = imageSrc;
    }

    attack(target) {
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower;
            return true;    
        } else {
            return false;
        }
        }
    }

//Player Ship
class Player extends Ship {
    constructor() {
        super(20, 5, .7, 'player.png');
    }

}
//Alien Ship
class Alien extends Ship {
    constructor() {
        super(
            Math.floor(Math.random() * 3 + 3), 
            Math.floor(Math.random() * 2 + 2), 
            Math.random() * .4 + .6, 
            "alien1.png"
        );
    }
}

class Game {
    constructor() {
      this.player = new Player();
      this.aliens = Array.from({ length: 6 }, () => new Alien());
      this.currentAlienIndex = 0;
      this.logElement = document.getElementById("gameLog");
      this.attackButton = document.getElementById("attackBtn");
      this.retreatButton = document.getElementById("retreatBtn");
      this.alienShipElement = document.getElementById("alienShip");
      this.playerShipElement = document.getElementById("playerShip");
  
      this.playerShipElement.src = this.player.imageSrc;
      this.alienShipElement.src = this.aliens[this.currentAlienIndex].imageSrc;
  
      this.attackButton.addEventListener("click", () => this.handleAttack());
      this.retreatButton.addEventListener("click", () => this.handleRetreat());
    }
  
    // log(message) {
    //   const p = document.createElement("p");
    //   p.textContent = message;
    //   this.logElement.appendChild(p);
    //   this.logElement.scrollTop = this.logElement.scrollHeight;
    //}
  
    handleAttack() {
      const alien = this.aliens[this.currentAlienIndex];
      this.log("Player attacks!");
  
      if (this.player.attack(alien)) {
        this.log(`Player hits! Alien hull is now ${alien.hull}.`);
        if (alien.hull <= 0) {
          this.log(`Alien ship ${this.currentAlienIndex + 1} destroyed!`);
          this.currentAlienIndex++;
          if (this.currentAlienIndex === this.aliens.length) {
            this.log("All alien ships destroyed! You win!");
            this.endGame();
            return;
          }
          this.log("New Alien");
          this.alienShipElement.src = this.aliens[this.currentAlienIndex].imageSrc; 
          return;
        }
      } else {
        this.log("Player missed!");
      }
  
      this.log("Alien counterattacks!");
      if (alien.attack(this.player)) {
        this.log(`Alien hits! Player hull is now ${this.player.hull}.`);
        if (this.player.hull <= 0) {
          this.log("Your ship has been destroyed! You lose!");
          this.endGame();
          return;
        }
      } else {
        this.log("Alien missed!");
      }
    }
  
    
    }

 