const bg = require("url:../../media/bg.svg");

export function initInstructions(params) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");

  div.innerHTML = `
        <div class="content">
            <c-text class="instructions" variant="body">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 3 segundos.</c-text>
            <c-button class="button">¡Jugar!</c-button>
            <div class="jugada-container">
                <c-play class="jugada piedra" play="piedra"></c-play>
                <c-play class="jugada papel" play="papel"></c-play>
                <c-play class="jugada tijera" play="tijera"></c-play>
            </div>
        </div>
    `;

  const style = document.createElement("style");
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');

        .container {
            height: 100vh;
            padding: 100px 0 0 0;
            background-image: url(${bg});
        }

        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            max-width: 769px;
            margin: 0 auto;
            height: 100%;
        }

        .instructions {
            display: block;
            margin: 0 auto;
            font-family: 'Special Elite', cursive;
            max-width: 324px;
            text-align: center;
            margin-bottom: 45px;
        }

        .button {
            display: block;
            width: fit-content;
            margin: 0 auto;
            margin-bottom: 55px;
        }

        .jugada-container {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            width: 90%;
            max-width: 390px;
        }      
    `;
  div.appendChild(style);
  const button = div.querySelector(".button");
  button.addEventListener("click", (e) => {
    e.preventDefault();
    params.goTo("/dwf-m5-desafio/game");
  });
  return div;
}
