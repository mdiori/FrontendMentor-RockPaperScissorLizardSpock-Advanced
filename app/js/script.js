const modal = document.querySelector(".footer__modal");
const openModalBtn = document.querySelector("#open-modal-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const footerFadeElements = document.querySelectorAll(".footer .has-fade");
const modalOverlay = document.querySelector(".overlay");

const gameButtons = document.querySelectorAll(".game__button");
const matchResult = document.querySelector(".result");
const gamePentagon = document.querySelector(".game__pentagon");

const gameResultDiv = document.querySelector(".game__result");
const yourChoiceDiv = document.querySelector(".game__you");
const houseChoiceDiv = document.querySelector(".game__house");
const playAgainDiv = document.querySelector(".game__play-again");
const playAgainButton = document.querySelector(".play-again");

const scoreValue = document.querySelector(".score-value");

const fadeSwitch = function (element, fade) {
  if (fade === "fade-in") {
    if (element.classList.contains("fade-out")) {
      element.classList.remove("fade-out");
    }
    if (!element.classList.contains("fade-in")) {
      element.classList.add("fade-in");
    }
  } else if (fade === "fade-out") {
    if (element.classList.contains("fade-in")) {
      element.classList.remove("fade-in");
    }
    if (!element.classList.contains("fade-out")) {
      element.classList.add("fade-out");
    }
  }
};

// Rules Modal / Overlay
const fadeInRulesElements = function () {
  footerFadeElements.forEach((el) => {
    fadeSwitch(el, "fade-in");
  });
};

const fadeOutRulesElements = function () {
  footerFadeElements.forEach((el) => {
    fadeSwitch(el, "fade-out");
  });
};

const closeModalOnOverlayClick = function (event) {
  if (event.target == modalOverlay) {
    fadeOutRulesElements();
  }
};

openModalBtn.onclick = fadeInRulesElements;
closeModalBtn.onclick = fadeOutRulesElements;
window.onclick = closeModalOnOverlayClick;

// Game Logic

const shownSwitch = function (element, action) {
  if (action === "add") {
    if (!element.classList.contains("shown")) {
      element.classList.add("shown");
    }
  } else if (action === "remove") {
    if (element.classList.contains("shown")) {
      element.classList.remove("shown");
    }
  }
};

const getRandomChoice = function () {
  // 1 - Scissor, 2 - Paper, 3 - Rock, 4 - Lizard, 5 - Spock
  const randomNumber = Math.floor(Math.random() * 5) + 1;
  switch (randomNumber) {
    case 1:
      return "scissor";
    case 2:
      return "paper";
    case 3:
      return "rock";
    case 4:
      return "lizard";
    case 5:
      return "spock";
  }
};

const defineWinner = function (event) {
  const userChoice = event.currentTarget.classList[1].substring(6);
  yourChoiceDiv.classList.add(userChoice);
  const houseChoice = getRandomChoice();

  let currentScore = scoreValue.innerHTML;

  let winner = "";
  if (userChoice === houseChoice) {
    winner = "It's a tie";
  } else {
    if (
      userChoice === "scissor" &&
      (houseChoice === "paper" || houseChoice === "lizard")
    ) {
      currentScore++;
      winner = "You win";
    } else if (
      userChoice === "paper" &&
      (houseChoice === "rock" || houseChoice === "spock")
    ) {
      currentScore++;
      winner = "You win";
    } else if (
      userChoice === "rock" &&
      (houseChoice === "lizard" || houseChoice === "scissor")
    ) {
      currentScore++;
      winner = "You win";
    } else if (
      userChoice === "lizard" &&
      (houseChoice === "spock" || houseChoice === "paper")
    ) {
      currentScore++;
      winner = "You win";
    } else if (
      userChoice === "spock" &&
      (houseChoice === "scissor" || houseChoice === "rock")
    ) {
      currentScore++;
      winner = "You win";
    } else {
      currentScore--;
      winner = "You lost";
    }
  }

  matchResult.innerHTML = winner;

  fadeSwitch(gamePentagon, "fade-out");
  fadeSwitch(gameResultDiv, "fade-in");

  setTimeout(function () {
    shownSwitch(gameResultDiv, "add");
    houseChoiceDiv.classList.add(houseChoice);
    scoreValue.innerHTML = currentScore;

    if (winner === "You win") {
      yourChoiceDiv.classList.add("winner");
    } else if (winner === "You lost") {
      houseChoiceDiv.classList.add("winner");
    } else {
      houseChoiceDiv.classList.add("winner");
      yourChoiceDiv.classList.add("winner");
    }
  }, 1000);

  fadeSwitch(playAgainDiv, "fade-in");
};

gameButtons.forEach((button) => {
  button.onclick = defineWinner;
});

const playNextMatch = function () {
  yourChoiceDiv.classList = "game__you";
  houseChoiceDiv.classList = "game__house";

  fadeSwitch(gameResultDiv, "fade-out");
  shownSwitch(gameResultDiv, "remove");
  fadeSwitch(gamePentagon, "fade-in");
  fadeSwitch(playAgainDiv, "fade-out");
};

playAgainButton.onclick = playNextMatch;
