import { initRouter } from "./router";
import { initText } from "./components/text";
import { initButtom } from "./components/button";
import { initPlay } from "./components/jugada";
import { initCountDown } from "./components/count-down";
import { initStar } from "./components/star";
import { initScore } from "./components/score";
import { state } from "./state";

(function () {
  state.init();
  initText();
  initButtom();
  initPlay();
  initCountDown();
  initStar();
  initScore();
  initRouter(document.querySelector(".root"));
})();
