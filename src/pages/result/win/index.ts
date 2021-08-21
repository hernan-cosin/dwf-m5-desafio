import { state } from "../../../state";

export function initResultWin(params) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");

  div.innerHTML = `
          <div class="content">
              <c-star variant="win"></c-star>
              <div class="score-container"></div>
              <c-button class="button">Volver a Jugar</c-button>
          </div>
      `;
  const style = document.createElement("style");
  style.innerHTML = `
          .container {
            padding: 20px;
            background-color: var(--win-secondary);
            overflow: auto;
          }
  
          .content {
              animation: fadeIn 2s;
              animation-fill-mode: both;
              opacity: 0;
              max-width: 769px;
              height: 100vh;
              margin: 0 auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              padding: 30px 0;
          }

          @keyframes fadeIn {
              100%{
                  opacity: 1;
              }
          }
      `;

  div.appendChild(style);
  const button = div.querySelector(".button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/instructions");
  });

  const scoreContainer = div.querySelector(".score-container");

  state.suscribe(() => {
    const scoreBoard = document.createElement("c-score");
    scoreBoard.setAttribute("class", "score-board");
    scoreContainer.firstChild
      ? scoreContainer.firstChild.remove()
      : scoreContainer.appendChild(scoreBoard);
  });

  state.setState(state.getState());
  return div;
}
