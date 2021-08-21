import { state } from "../../state";
export function initScore() {
  class Score extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const div = document.createElement("div");
      div.setAttribute("class", "score-container");

      const history = state.getState().history;

      let computerWins = [];
      let playerWins = [];

      history.map((h) => {
        const winner = state.whoWins(h.myPlay, h.computerPlay);
        if (winner == 0) {
          computerWins.push(winner);
        }
        if (winner == 1) {
          playerWins.push(winner);
        }
      });

      const myScore = playerWins.length;
      const machineScore = computerWins.length;
      div.innerHTML = `
                <c-text class="score-title" variant="subtitle">Score</c-text>
                <c-text class="score">Vos: ${myScore}</c-text>
                <c-text class="score">Maquina: ${machineScore}</c-text>
            `;
      const style = document.createElement("style");
      style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
                .score-container {
                    width: 259px;
                    height: 217px;
                    border: 10px solid var(--black);
                    border-radius: 10px;
                    margin-bottom: 20px;
                    background-color: var(--white);
                }

                .score-title {
                    font-family: 'Odibee Sans', cursive;
                    text-align: center;
                }

                .score {
                  font-family: 'Odibee Sans', cursive;
                  text-align: right;
                  display: block;
                  padding: 0 10px 0 0;
                }
            `;
      this.shadow.appendChild(div);
      this.shadow.appendChild(style);
    }
  }
  customElements.define("c-score", Score);
}
