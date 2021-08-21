const bg = require("url:../../media/bg.svg");

export function initHome(params) {
  const div = document.createElement("div");
  div.setAttribute("class", "container");

  div.innerHTML = `
        <div class="content">
            <c-text class="title" variant="title"> Piedra Papel ó Tijera </c-text> 
            <c-button class="button">Empezar</c-button>
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

        body {
            font-family: 'Odibee Sans', cursive;
        }

        .container {
            height: 100vh;
            padding: 100px 0 0 0;
            background-image: url(${bg});
        }

        .content {
            max-width: 769px;
            margin: 0 auto;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
        }

        .title {
            display: block;
            width: 284px;
            height: 204px;
            margin: 0 auto;
            color: var(--principal);
            font-family: 'Special Elite', cursive;
            text-align: left;
            margin-bottom: 74px;
        }

        .button {
            display: block;
            width: fit-content;
            margin: 0 auto 75px auto;
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
    params.goTo("/dwf-m5-desafio/instructions");
  });

  return div;
}
