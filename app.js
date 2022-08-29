const choices = ["paper", "rock", "scissor"];
const buttons = document.querySelectorAll(".card > .card-btn");
const playground = document.querySelector(".playground");

const cont = document.querySelector(".picked");

const uChoice = document.getElementById("uChoice");
const uChoiceCont = document.getElementById("uChoice-cont");
const cChoice = document.getElementById("cChoice");
const cChoiceCont = document.getElementById("cChoice-cont");

const winner = document.getElementById("winner");
const score = document.getElementById("score");

const modalBtn = document.getElementById("modal-button");
const modal = document.getElementById("modal");
const ruleBtn = document.getElementById("rule");
let modalVis = true;

console.log(score);
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let state = "pendding";
    playground.classList.remove("roll-in-blurred-left");
    // playground.classList.add("roll-in-blurred-out");
    reposition(button.id)
    console.log(button.id)

    setTimeout(() => {
      playground.style.display = "none";
    }, 1500);
    let ff = button.id;
    uChoiceCont.classList.add(ff);
    uChoice.src = `./images/icon-${ff}.svg`;
    let ccc = choices[Math.floor(Math.random() * 3)];
    addCompStyle(ccc);

    setTimeout(() => {
      state = whoWin(ff, ccc);
      calcScore(parseInt(score.innerHTML), state);
      if (state === "you win") {
        document.getElementById("uWin").classList.add("win");
      } else if (state === "you lose") {
        document.getElementById("cWin").classList.add("win");
      }
      //   uChoiceCont.classList.remove(ccc);
      winner.innerHTML = state;
      cont.style.display = "flex";
      //   unfade(playground);
      setTimeout(() =>{
        unposition(button.id)
        reset(ff, ccc)}, 2000);
    }, 1500);
  });
});

const whoWin = (userChoice, compChoice) => {
  if (userChoice === "paper" && compChoice === "rock") {
    return "you win";
  } else if (userChoice === "rock" && compChoice === "paper") {
    return "You lose";
  } else if (userChoice === "scissor" && compChoice === "paper") {
    return "you win";
  } else if (userChoice === "paper" && compChoice === "scissor") {
    return "you lose";
  } else if (userChoice === "rock" && compChoice === "scissor") {
    return "you win";
  } else if (userChoice === "scissor" && compChoice === "rock") {
    return "you lose";
  } else if (userChoice === compChoice) {
    return "equal";
  }
};

function fade(element) {
  var op = 1; // initial opacity
  var timer = setInterval(function () {
    if (op <= 0.1) {
      clearInterval(timer);
      element.style.display = "none";
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op -= op * 0.1;
  }, 50);
}

function unfade(element) {
  var op = 0.1; // initial opacity
  element.style.display = "block";
  var timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = "alpha(opacity=" + op * 100 + ")";
    op += op * 0.1;
  }, 10);
}

const calcScore = (currentScore, result) => {
  if (result === "you win") {
    score.innerHTML = currentScore + 3;
  } else if (result === "you lose") {
    score.innerHTML = currentScore - 3;
  } else {
    return;
  }
};

const reset = (ff, ccc) => {

  cont.style.display = "none";
  (cChoice.src = ""), (winner.innerHTML = "");
  document.getElementById("cWin").classList.remove("win");
  document.getElementById("uWin").classList.remove("win");
  cChoice.src = ``;
  cChoiceCont.classList.remove(ccc);
  uChoiceCont.classList.remove(ff);
  playground.classList.remove("roll-in-blurred-out");
  playground.classList.add("roll-in-blurred-left");

  playground.style.display = "block";
};

const addCompStyle = (ccc) => {
  cChoice.src = `./images/icon-${ccc}.svg`;
  cChoiceCont.classList.add(ccc);
  console.log(ccc);
};

modalBtn.addEventListener("click", () => {
  if (modalVis) {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
  modalVis != modalVis;
});
ruleBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  modalVis = true;
});

const reposition = (id) => {
  switch (id) {
    case "scissor":
      document.getElementById(id).classList.add("s-win")
      break;
    case "rock":
      document.getElementById(id).classList.add("r-win")
      break;
    case "paper":
      document.getElementById(id).classList.add("p-win")
      break;
    default:
      break;
  }
};
const unposition = (id)=>{
  switch (id) {
    case "scissor":
      document.getElementById(id).classList.remove("s-win")
      break;
    case "rock":
      document.getElementById(id).classList.remove("r-win")
      break;
    case "paper":
      document.getElementById(id).classList.remove("p-win")
      break;
    default:
      break;
  }
}
