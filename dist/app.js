/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, playPoints; //previousRoll

document.querySelector(".btn-start").addEventListener("click", function() {
  document.querySelector(".btn-start").style.display = "none";
  init();

  //document.querySelector("#current-" + activePlayer).textContent = dice;

  document.querySelector(".btn-roll").addEventListener("click", function() {
    if (gamePlaying) {
      var dice = Math.floor(Math.random() * 6 + 1);
      var dice2 = Math.floor(Math.random() * 6 + 1);

      var diceDOM = document.querySelector(".dice");
      var diceTwoDOM = document.querySelector(".diceTwo");
      diceDOM.style.display = "block";
      diceDOM.src = "dice-" + dice + ".png";

      diceTwoDOM.style.display = "block";
      diceTwoDOM.src = "dice-" + dice2 + ".png";

      // check double 6
      if (dice === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.getElementById("score-" + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
      } else if (dice !== 1 && dice2 !== 1) {
        //add score
        roundScore += dice;
        roundScore += dice2;
        document.querySelector(
          "#current-" + activePlayer
        ).textContent = roundScore;
      } else {
        //next player and lose points
        nextPlayer();
      }
    }
  });

  document.querySelector(".btn-hold").addEventListener("click", function() {
    if (gamePlaying) {
      // Add current score to the global score
      scores[activePlayer] += roundScore;

      //Update the UI
      document.getElementById("score-" + activePlayer).textContent =
        scores[activePlayer];

      //check if player won the game
      if (scores[activePlayer] >= playPoints) {
        document.querySelector("#name-" + activePlayer).textContent =
          "WINNER!!";
        document.querySelector(".dice").style.display = "none";
        document.querySelector(".diceTwo").style.display = "none";
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.toggle("winner");
        document
          .querySelector(".player-" + activePlayer + "-panel")
          .classList.toggle("active");
        document.getElementById("current-0").textContent = "0";
        document.getElementById("current-1").textContent = "0";

        gamePlaying = false;
      } else {
        //next player and lose points
        nextPlayer();
      }
    }
  });

  document.querySelector(".btn-new").addEventListener("click", init);

  function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //previousRoll = 0;

    playPoints = prompt("How many points to play? Min: 20");

    if (playPoints < 20) {
      playPoints = 20;
    }

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".diceTwo").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
  }

  function nextPlayer() {
    //next player and lose points
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    roundScore = 0;
    //previousRoll = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
    document.querySelector(".diceTwo").style.display = "none";
  }
});
