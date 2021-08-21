type Jugada = "piedra" | "papel" | "tijera";
type Game = {
  computerPlay: Jugada;
  myPlay: Jugada;
};

const state = {
  data: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
    },
    history: [{}],
  },
  listeners: [],
  init() {
    const firstState = localStorage.getItem("saved-state");
    const firstStateParseado = JSON.parse(firstState);

    if (firstState) {
      this.setState(firstStateParseado);
    } else {
      return;
    }
  },
  getState() {
    return this.data;
  },
  setState(newState: object) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("saved-state", JSON.stringify(this.getState()));
  },
  suscribe(callback) {
    this.listeners.push(callback);
  },
  setMove(move: Jugada) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
  },
  setComputerMove() {
    const options = ["piedra", "papel", "tijera"];
    const numero = Math.floor(Math.random() * 3);

    const currentState = this.getState();
    const computerMove = options[numero];

    currentState.currentGame.computerPlay = computerMove;
  },
  pushToHistory(play: Game) {
    const currentState = this.getState();
    currentState.history.push(play);
  },
  whoWins(myPlay: Jugada, computerPlay: Jugada) {
    const ganeConPiedra = myPlay == "piedra" && computerPlay == "tijera";
    const ganeConPapel = myPlay == "papel" && computerPlay == "piedra";
    const ganeConTijera = myPlay == "tijera" && computerPlay == "papel";

    const gane = [ganeConPiedra, ganeConPapel, ganeConTijera].includes(true);

    const ganoConPiedra = computerPlay == "piedra" && myPlay == "tijera";
    const ganoConPapel = computerPlay == "papel" && myPlay == "piedra";
    const ganoConTijera = computerPlay == "tijera" && myPlay == "papel";

    const gano = [ganoConPiedra, ganoConPapel, ganoConTijera].includes(true);

    const empateConPiedra = myPlay == "piedra" && computerPlay == "piedra";
    const empateConPapel = myPlay == "papel" && computerPlay == "papel";
    const empateConTijera = myPlay == "tijera" && computerPlay == "tijera";

    const empate = [empateConPiedra, empateConPapel, empateConTijera].includes(
      true
    );

    if (gane == true && gano == false) {
      return 1;
    }
    if (gane == false && gano == true) {
      return 0;
    }
    if (empate == true) {
      return -1;
    }
  },
};

export { state };
