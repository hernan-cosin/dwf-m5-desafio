export function initCountDown() {
  class CountDown extends HTMLElement {
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
      div.setAttribute("class", "container");

      div.innerHTML = `
                <div class="counter-container">
                    <p class="counter"></p>
                </div>
            `;

      let counter = 3;
      const intervalo = setInterval(() => {
        // console.log(counter);

        const num = div.querySelector(".counter");
        num.innerHTML = `${counter}`;
        counter--;
        if (counter < 0) {
          clearInterval(intervalo);
          displayNoPlayText();
          const event = new CustomEvent("timeOut");
          this.dispatchEvent(event);
        }
      }, 1000);

      function displayNoPlayText() {
        setTimeout(() => {
          const counterContainer = div.querySelector(".counter-container");
          counterContainer.firstChild.remove();
          counterContainer.innerHTML = `
                            <c-text class="time-out" variant="body">No has elegido a tiempo</c-text>
                        `;
          counterContainer.classList.add("transparent");
        }, 1000);
      }

      const style = document.createElement("style");
      style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Special+Elite&display=swap');
            
                .counter-container {
                    width: 243px;
                    height: 243px;
                    border-radius: 50%;
                    border: 23px solid;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .counter {
                    font-size: 100px;
                    font-family: 'Special Elite', cursive;
                    text-align: center;
                }

                .time-out {
                    font-family: 'Special Elite', cursive;
                    text-align: center;
                }

                .transparent {
                    border-color: rgba(0, 0, 0, 0.6);
                }
            `;
      div.appendChild(style);
      this.shadow.appendChild(div);
    }
  }
  customElements.define("c-count", CountDown);
}
