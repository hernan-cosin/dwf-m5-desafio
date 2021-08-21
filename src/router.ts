import { initHome } from "./pages/home";
import { initGame } from "./pages/game";
import { initResultLoose } from "./pages/result/loose";
import { initResultWin } from "./pages/result/win";
import { initInstructions } from "./pages/instructions";

const routes = [
  {
    path: /\/dwf-m5-desafio"/,
    page: initHome,
  },
  {
    path: /\/home/,
    page: initHome,
  },
  {
    path: /\/instructions/,
    page: initInstructions,
  },
  {
    path: /\/game/,
    page: initGame,
  },
  {
    path: /\/result\/loose/,
    page: initResultLoose,
  },
  {
    path: /\/result\/win/,
    page: initResultWin,
  },
];

export function initRouter(container: Element) {
  function goTo(path) {
    history.pushState({}, "", path);
    handleRoute(path);
  }

  function handleRoute(route) {
    for (const r of routes) {
      if (r.path.test(route)) {
        const el = r.page({ goTo: goTo });
        container.firstChild?.remove();
        container.appendChild(el);
      }
    }
  }
  location.pathname.replace("/dwf-m5-desafio", "");
  if (location.pathname == "/") {
    goTo("/home");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = function () {
    handleRoute(location.pathname);
  };
}
