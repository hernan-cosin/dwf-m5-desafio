import { state } from "../../state";
const bg = require("url:../../media/bg.svg");

export function initGame(params) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");

  div.innerHTML = `
        <div class="computer-jugada-container">
        </div>
        <div class="empate-container">
        </div>
        <c-count class="counter"></c-count>
        <div class="jugada-container">
            <c-play class="jugada piedra" play="piedraLarge"></c-play>
            <c-play class="jugada papel" play="papelLarge"></c-play>
            <c-play class="jugada tijera" play="tijeraLarge"></c-play>
        </div>
        <div class="no-play-button-container"></div>
    `;

  const style = document.createElement("style");
  style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
        .computer-jugada-container{
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }

        .computer-play {
            animation: fadeIn 2s .75s;
            display: block;
            width: fit-content;
            transform: rotate(180deg);
            opacity: 0;
        }

        @keyframes fadeIn {
            100% {
                opacity: 1;
                transform: translate(0, 50px) scale(1.5) rotate(180deg);
            }
        }

        .container {
            height: 100vh;
            padding: 100px 0 0 0;
            background-image: url(${bg});
        }

        .counter {
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 769px;
            margin: 0 auto 70px auto;
        }

        .jugada-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 90%;
            max-width: 390px;
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 20px);
        }      

        .jugada {
            cursor: pointer;
        }

        .counter-fade-animation {
            animation: transparent 2s;
            animation-fill-mode: both;
        }

        @keyframes transparent {
            0% {
                opacity: 1;
            }
            100% {
                opacity:0;
            }
        }

        .empate {
            font-family: 'Special Elite', cursive;
        }

        .fade {
          animation: drawFade 1s;
          animation-fill-mode: both; 
        }

        @keyframes drawFade {
          100% {
            opacity: 0;
          }
        }

        .button-no-play {
          animation: no-play-fadeIn 4s;
          display: block;
          width: fit-content;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }

        @keyframes no-play-fadeIn {
          0%{
            opacity: 0;
          }
          25%{
            opacity: 0;
          }
          100%{
            opacity: 1;
          }
        }
    `;
  div.appendChild(style);

  const computerJugadaContainer = div.querySelector(
    ".computer-jugada-container"
  );
  const empateContainer = div.querySelector(".empate-container");
  const jugadasContainer = div.querySelector(".jugada-container") as any;
  const piedraEl = div.querySelector(".piedra");
  const papelEl = div.querySelector(".papel");
  const tijeraEl = div.querySelector(".tijera");
  const counter = div.querySelector(".counter");
  const noPlayButtonContainer = div.querySelector(
    ".no-play-button-container"
  ) as any;

  const jugadas = [piedraEl, papelEl, tijeraEl];
  jugadas.map((e: any) => {
    e.addEventListener("click", (e) => {
      e.target.shadow.firstChild.classList.add("select-move");

      gameAnimation();

      const move = e.target.className.split(" ")[1];
      state.setMove(move);

      state.setComputerMove();
      const computerMove = state.getState().currentGame.computerPlay;

      renderComputerPlay(computerMove, computerJugadaContainer);

      setTimeout(() => {
        handleWhoWins(move, computerMove);
      }, 3000);

      state.pushToHistory({ computerPlay: computerMove, myPlay: move });
      state.setState(state.getState());
    });
  });

  function renderComputerPlay(jugada, container) {
    const computerPlay = document.createElement("c-play");
    if (jugada == "piedra") {
      computerPlay.setAttribute("play", "piedraLarge");
    }
    if (jugada == "papel") {
      computerPlay.setAttribute("play", "papelLarge");
    }
    if (jugada == "tijera") {
      computerPlay.setAttribute("play", "tijeraLarge");
    }

    computerPlay.setAttribute("class", "computer-play");
    container.appendChild(computerPlay);
  }

  function gameAnimation() {
    const jugadasShadow = jugadas.map((j: any) => {
      return j.shadow.firstChild;
    });

    const filtrado = jugadasShadow.filter(
      (j) => !j.className.includes("select-move")
    );
    filtrado.map((j) => {
      j.classList.add("transparent");
    });

    counter.classList.add("counter-fade-animation");
  }

  function handleWhoWins(myMove, computerMove) {
    const whoWon = state.whoWins(myMove, computerMove);

    if (whoWon == 1) {
      params.goTo("/dwf-m5-desafio/result/win");
    }
    if (whoWon == 0) {
      params.goTo("/dwf-m5-desafio/result/loose");
    }
    if (whoWon == -1) {
      createDrawScene();
    }

    function createDrawScene() {
      const empateText = document.createElement("c-text");
      empateText.setAttribute("class", "empate");
      empateText.setAttribute("variant", "subtitle");
      empateText.textContent = "Empate";

      empateContainer.appendChild(empateText);

      const button = document.createElement("c-button");
      button.textContent = "Volver a Jugar";

      const style = document.createElement("style");
      style.innerHTML = `
        .empate-container {
          height: 250px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
      }
        `;
      empateContainer.appendChild(button);
      empateContainer.appendChild(style);

      button.addEventListener("click", () => {
        params.goTo("/dwf-m5-desafio/instructions");
      });
      noPlayButtonContainer.style.display = "none";
    }
  }

  counter.addEventListener("timeOut", (e) => {
    setTimeout(() => {
      const jugadasCont = jugadasContainer;
      jugadasCont.classList.add("fade");
      const noPlayButtonContainer = div.querySelector(
        ".no-play-button-container"
      );
      const button = document.createElement("c-button");
      button.setAttribute("class", "button-no-play");
      button.textContent = "Volver a Jugar";
      button.addEventListener("click", (e) => {
        e.preventDefault();
        params.goTo("/dwf-m5-desafio/instructions");
      });
      noPlayButtonContainer.appendChild(button);
    }, 500);
  });
  return div;
}
